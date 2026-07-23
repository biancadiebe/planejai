import {
  CalendarClock,
  CreditCardIcon,
  Goal,
  Landmark,
  MessageCircle,
  Pencil,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Card } from "@/components/features/SimulationResults/Card";
import { ProgressCard } from "@/components/features/SimulationResults/ProgressCard";
import { UpdateSavedAmountModal } from "@/components/features/SimulationResults/UpdateSavedAmountModal";
import { AIInsightCard } from "@/components/features/AIInsightCardProps";
import { AIInsightChat } from "@/components/features/AIInsightChat";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/shared/Button";
import { PageHero } from "@/components/shared/PageHero";
import type { SimulationRecord } from "@/data/simulation";
import { useSimulationStorage } from "@/hooks/useSimulationStorage";
import { calcMonthlySavingsNeeded } from "@/utils/simulation";

export function SimulationResultsPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isUpdateSavedAmountOpen, setIsUpdateSavedAmountOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getFormData, getLatestFormData } = useSimulationStorage();

  const [simulationData, setSimulationData] = useState<SimulationRecord | null>(() => {
    if (id) {
      return getFormData(id);
    }

    return getLatestFormData();
  });

  const data = useMemo(() => simulationData, [simulationData]);

  if (!data) {
    return <p>Simulação não encontrada.</p>;
  }

  const monthlySavingsNeeded = calcMonthlySavingsNeeded(data);

  return (
    <main className="mx-auto w-full max-w-full px-4 py-10 text-3xl sm:px-6 sm:py-14 lg:px-10 xl:max-w-[1700px]">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <PageHero
            title="Resultado da sua simulação"
            subtitle="Com base no seu perfil financeiro e objetivos."
          />
        </div>
        <div className="flex w-full flex-col gap-3 lg:w-auto lg:flex-row">
          <Button
            variant="secondary"
            className="bg-primary w-full text-base font-semibold lg:w-auto"
            onClick={() => navigate(`/simulacao/${data.id}/editar`)}
            icon={Pencil}
          >
            Editar simulação
          </Button>
          <Button
            variant="secondary"
            className="bg-primary w-full text-base font-semibold lg:w-auto"
            onClick={() => setIsChatOpen(true)}
            icon={MessageCircle}
          >
            Conversar com a IA
          </Button>
        </div>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card icon={Goal} label="Custo da Meta" value={data.goalAmount} subtitle={data.goalName} />
        <Card
          icon={CalendarClock}
          label="Prazo"
          value={`${data.goalDeadline} meses`}
          subtitle={"Prazo para atingir a meta"}
        />
        <Card
          variant="primary"
          icon={PiggyBank}
          label="Economia mensal"
          value={`R$ ${monthlySavingsNeeded.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subtitle={"Economia mensal necessária"}
        />
      </div>
      <div className="mb-6">
        <ProgressCard
          savedAmount={data.savedAmount ?? "0"}
          goalAmount={data.goalAmount}
          onUpdateClick={() => setIsUpdateSavedAmountOpen(true)}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-3 ">
        <div className="lg:col-span-2">
          <AIInsightCard simulationId={data.id} />
        </div>
        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <h1 className="items-right flex justify-center px-10 text-2xl font-medium">
            Resumo geral de suas Finanças
          </h1>
          <Card
            icon={Wallet}
            label="Renda mensal"
            value={data.income}
            subtitle={"Renda total bruta por mês"}
          />
          <Card
            icon={CreditCardIcon}
            label="Custos Fixos de Vida"
            value={data.expenses}
            subtitle={"Gastos essenciais por mês"}
          />
          <Card
            icon={Landmark}
            label="Dívidas / Parcelas"
            value={data.debts}
            subtitle={"Valor comprometido em parcelas/depósito"}
          />
        </div>
      </div>
      <Modal open={isChatOpen} title="Converse com a IA" onClose={() => setIsChatOpen(false)}>
        {data ? (
          <AIInsightChat simulationId={data.id} />
        ) : (
          <div className="text-muted-foreground p-6 text-sm">
            Não foi possível carregar a simulação para o chat.
          </div>
        )}
      </Modal>
      <UpdateSavedAmountModal
        id={data.id}
        currentValue={data.savedAmount ?? "0"}
        open={isUpdateSavedAmountOpen}
        onClose={() => setIsUpdateSavedAmountOpen(false)}
        onUpdated={(value) => {
          setSimulationData((currentData) => {
            if (!currentData) {
              return currentData;
            }

            return {
              ...currentData,
              savedAmount: value,
            } as SimulationRecord;
          });
        }}
      />
    </main>
  );
}
