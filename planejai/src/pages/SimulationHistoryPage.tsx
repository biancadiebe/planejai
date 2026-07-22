import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiggyBank, Trash2 } from "lucide-react";

import { calcMonthlySavingsNeeded } from "@/utils/simulation";
import type { SimulationRecord } from "@/data/simulation";
import { useSimulationStorage } from "@/hooks/useSimulationStorage";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/shared/Button";

function formatDate(dateString?: string) {
  const date = dateString ? new Date(dateString) : null;

  if (!date || Number.isNaN(date.getTime())) {
    return "Data não disponível";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export default function SimulationHistoryPage() {
  const { getAllSimulations, deleteSimulation } = useSimulationStorage();
  const [simulations, setSimulations] = useState<SimulationRecord[]>([]);

  useEffect(() => {
    setSimulations(getAllSimulations());
  }, []);

  const handleDelete = (id: string) => {
    deleteSimulation(id);
    setSimulations(getAllSimulations());
  };

  if (simulations.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <PageHero
          title="Histórico de simulações"
          subtitle="Acompanhe suas simulações anteriores e visualize os resultados já gerados."
        />
        <div className="border-border bg-card text-muted-foreground rounded-3xl border p-8 text-center">
          Nenhuma simulação encontrada ainda. Crie uma nova simulação para ver o histórico aqui.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Histórico de simulações"
        subtitle="Acompanhe suas simulações anteriores e visualize os resultados já gerados."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {simulations.map((simulation) => (
          <article
            key={simulation.id}
            className="border-border bg-card rounded-3xl border p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-3xl">
                  <PiggyBank size={20} />
                </div>
                <div>
                  <p className="text-foreground text-sm font-semibold">{simulation.goalName}</p>
                  <p className="text-muted-foreground text-xs">
                    {formatDate(simulation.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  to={`/resultado/${simulation.id}`}
                  className="border-border text-foreground rounded-2xl border px-3 py-2 text-xs transition-opacity hover:opacity-80"
                >
                  Ver detalhes
                </Link>
                <Button
                  variant="secondary"
                  icon={Trash2}
                  className="rounded-2xl px-3 py-2 text-xs"
                  onClick={() => handleDelete(simulation.id)}
                >
                  Excluir
                </Button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="bg-muted rounded-3xl p-4">
                <p className="text-muted-foreground text-[10px] uppercase tracking-widest">
                  Custo da meta
                </p>
                <p className="text-foreground mt-2 text-sm font-semibold">
                  {simulation.goalAmount}
                </p>
              </div>
              <div className="bg-muted rounded-3xl p-4">
                <p className="text-muted-foreground text-[10px] uppercase tracking-widest">Prazo</p>
                <p className="text-foreground mt-2 text-sm font-semibold">
                  {simulation.goalDeadline} meses
                </p>
              </div>
              <div className="bg-muted rounded-3xl p-4">
                <p className="text-muted-foreground text-[10px] uppercase tracking-widest">
                  Economia mensal
                </p>
                <p className="text-foreground mt-2 text-sm font-semibold">
                  R${" "}
                  {calcMonthlySavingsNeeded(simulation).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <div className="bg-muted rounded-3xl p-4">
                <p className="text-muted-foreground text-[10px] uppercase tracking-widest">
                  Renda mensal
                </p>
                <p className="text-foreground mt-2 text-sm font-semibold">{simulation.income}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
