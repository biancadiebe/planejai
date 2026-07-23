import { TrendingUp } from "lucide-react";

interface ProgressCardProps {
  savedAmount: string;
  goalAmount: string;
  onUpdateClick: () => void;
}

function parseValue(value: string) {
  if (!value) {
    return 0;
  }

  const normalized = value.replace(/R\$/g, "").replace(/\./g, "").replace(",", ".").trim();
  return Number.parseFloat(normalized) || 0;
}

export function ProgressCard({ savedAmount, goalAmount, onUpdateClick }: ProgressCardProps) {
  const savedValue = parseValue(savedAmount);
  const goalValue = parseValue(goalAmount);
  const progressPercentage = goalValue > 0 ? Math.min(100, (savedValue / goalValue) * 100) : 0;

  return (
    <div className="bg-card flex w-full flex-col gap-4 rounded-2xl p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:flex-row sm:items-center">
      <div className="flex items-center gap-3 sm:min-w-[200px]">
        <TrendingUp size={16} className="text-primary" />
        <div>
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">
            Progresso da meta
          </span>
          <p className="text-foreground text-lg font-semibold">
            R${" "}
            {savedValue.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <span className="text-muted-foreground text-sm font-normal">
              {" "}
              / R${" "}
              {goalValue.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-muted h-2 overflow-hidden rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-muted-foreground mt-1 text-center text-sm">
          {progressPercentage.toFixed(0)}% da meta acumulada
        </p>
      </div>

      <button
        type="button"
        onClick={onUpdateClick}
        className="border-border text-foreground shrink-0 rounded-xl border px-3 py-2 text-sm font-medium transition-opacity hover:opacity-80"
      >
        Atualizar valor
      </button>
    </div>
  );
}
