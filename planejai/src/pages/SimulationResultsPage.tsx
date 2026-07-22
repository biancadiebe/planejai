import { CalendarClock, CreditCardIcon, Goal, Landmark, PiggyBank, Wallet } from "lucide-react";
import { useParams } from "react-router-dom";

import { Card } from "@/components/features/SimulationResults/Card";
import { PageHero } from "@/components/shared/PageHero";
import { useSimulationStorage } from "@/hooks/useSimulationStorage";
import { calcMonthlySavingsNeeded } from "@/utils/simulation";
import { AIInsightCard } from "@/components/features/AIInsightCardProps";

export function SimulationResultsPage() {
  const { id } = useParams<{ id: string }>();
  const { getFormData, getLatestFormData } = useSimulationStorage();

  const data = id ? getFormData(id) : getLatestFormData();

  if (!data) {
    return <p>Simulação não encontrada.</p>;
  }

  const monthlySavingsNeeded = calcMonthlySavingsNeeded(data);

  return (
    <main className="mx-auto w-full max-w-full px-4 py-10 sm:px-6 sm:py-14 lg:px-10 xl:max-w-[1700px] text-3xl">
      <PageHero
        title="Resultado da sua simulação"
        subtitle="Com base no seu perfil financeiro e objetivos."
      />
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
    </main>
  );
}
