import piggybank from "@/assets/images/piggybank.png";

interface SimulationHeroProps {
  isEditMode?: boolean;
}

export function SimulationHero({ isEditMode = false }: SimulationHeroProps) {
  return (
    <div className="mb-8 text-center">
      <div className="flex flex-col items-center sm:flex-row">
        <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">
          {isEditMode ? "Editar sua simulação" : "Vamos planejar seu futuro"}
        </h1>
        <img src={piggybank} alt="" aria-hidden="true" className="h-16 w-16 sm:-ml-3 sm:-mt-2" />
      </div>
      <p className="text-muted-foreground text-sm">
        {isEditMode
          ? "Atualize os dados da sua simulação e mantenha o plano alinhado com sua meta."
          : "Responda algumas questões para ter insights financeiros personalizados."}
      </p>
    </div>
  );
}
