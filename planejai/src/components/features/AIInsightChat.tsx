import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Send, Loader2 } from "lucide-react";
import { getChatResponse } from "@/services/aiService";
import { useSimulationStorage } from "@/hooks/useSimulationStorage";
import type { SimulationRecord } from "@/data/simulation";
import { calcMonthlySavingsNeeded } from "@/utils/simulation";
import { Button } from "@/components/shared/Button";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

interface AIInsightChatProps {
  simulationId: string;
}

const STORAGE_KEY = "planejai-chat-history";

function getChatStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Record<string, ChatMessage[]>) : {};
}

function saveChatStorage(chatState: Record<string, ChatMessage[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chatState));
}

export function AIInsightChat({ simulationId }: AIInsightChatProps) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const { getFormData } = useSimulationStorage();
  const simulation = getFormData(simulationId) as SimulationRecord | null;

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const storage = getChatStorage();
    return storage[simulationId] ?? [];
  });
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const assistantPrompt = useMemo(() => {
    if (!simulation) {
      return "";
    }

    return `Você é um educador financeiro amigável e objetivo. Responda às perguntas do usuário sobre a simulação abaixo com clareza e concisão. Use linguagem em português, cite valores quando relevante e seja útil. Não invente dados. Simulação:\n- Renda mensal: ${simulation.income}\n- Custos fixos: ${simulation.expenses}\n- Dívidas: ${simulation.debts}\n- Meta: ${simulation.goalName}\n- Custo da meta: ${simulation.goalAmount}\n- Prazo: ${simulation.goalDeadline} meses\n- Economia mensal necessária: ${calcMonthlySavingsNeeded(simulation)} reais\n`;
  }, [simulation]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveMessages = (nextMessages: ChatMessage[]) => {
    setMessages(nextMessages);
    const stored = getChatStorage();
    stored[simulationId] = nextMessages;
    saveChatStorage(stored);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!inputValue.trim()) {
      return;
    }

    const userMessage: ChatMessage = { role: "user", text: inputValue.trim() };
    const nextMessages = [...messages, userMessage];
    saveMessages(nextMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const prompt = `${assistantPrompt}\n\nPergunta: ${userMessage.text}\nResposta:`;
      const responseText = await getChatResponse(prompt);
      const assistantMessage: ChatMessage = {
        role: "assistant",
        text: responseText.trim(),
      };
      const updatedMessages = [...nextMessages, assistantMessage];
      saveMessages(updatedMessages);
    } catch {
      setError("Não foi possível enviar a pergunta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-4 px-6 py-5">
      <div className="border-border bg-surface text-muted-foreground rounded-3xl border p-4 text-sm">
        Pergunte qualquer coisa sobre sua simulação e receba dicas financeiras personalizadas.
      </div>

      <div className="border-border bg-card rounded-3xl border p-4">
        <div className="flex max-h-[55vh] flex-col gap-4 overflow-y-auto pr-2">
          {messages.length === 0 && (
            <div className="text-muted-foreground">
              Faça sua primeira pergunta para começar a conversa.
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`rounded-3xl p-4 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground self-end dark:text-black"
                  : "bg-surface text-foreground self-start"
              } max-w-[90%] md:max-w-[75%]`}
            >
              <p className="whitespace-pre-line text-sm leading-relaxed">{message.text}</p>
            </div>
          ))}

          <div ref={chatEndRef} />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          className="border-border bg-background text-foreground focus:border-primary focus:ring-primary/20 min-h-[52px] flex-1 rounded-3xl border px-4 py-3 text-sm outline-none focus:ring-2"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Faça uma pergunta sobre sua simulação"
          disabled={isLoading}
        />
        <Button
          variant="primary"
          type="submit"
          className="inline-flex items-center gap-2 px-4 dark:text-black"
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          Enviar
        </Button>
      </form>
    </div>
  );
}
