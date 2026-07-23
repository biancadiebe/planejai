import { SimulationForm } from "@/components/features/Simulation/Form";
import { SimulationHero } from "@/components/features/Simulation/Hero";

interface SimulationFormPageProps {
  isEditMode?: boolean;
}

export function SimulationFormPage({ isEditMode = false }: SimulationFormPageProps) {
  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:py-14">
      <SimulationHero isEditMode={isEditMode} />
      <SimulationForm isEditMode={isEditMode} />
    </main>
  );
}
