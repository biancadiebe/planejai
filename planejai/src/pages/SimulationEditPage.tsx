import { useParams } from "react-router-dom";

import { SimulationForm } from "@/components/features/Simulation/Form";
import { SimulationHero } from "@/components/features/Simulation/Hero";
import { useSimulationStorage } from "@/hooks/useSimulationStorage";

export function SimulationEditPage() {
  const { id } = useParams<{ id: string }>();
  const { getFormData } = useSimulationStorage();

  if (!id) {
    return <p className="p-6">Simulação não encontrada.</p>;
  }

  const data = getFormData(id);

  if (!data) {
    return <p className="p-6">Simulação não encontrada.</p>;
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:py-14">
      <SimulationHero isEditMode />
      <SimulationForm initialData={data} simulationId={id} isEditMode />
    </main>
  );
}
