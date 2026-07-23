import { useSimulationStorage } from "@/hooks/useSimulationStorage";
import { FormStep } from "./FormStep";
import { StepProgress } from "./Progress";
import {
  type SimulationFormData,
  type SimulationRecord,
  simulationFormSteps,
} from "@/data/simulation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SimulationFormProps {
  initialData?: SimulationRecord;
  simulationId?: string;
  isEditMode?: boolean;
}

export const SimulationForm = ({
  initialData,
  simulationId,
  isEditMode = false,
}: SimulationFormProps) => {
  const { saveFormData, updateSimulation, getFormData } = useSimulationStorage();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<SimulationFormData>(() => {
    if (!initialData) {
      return {} as SimulationFormData;
    }

    return simulationFormSteps.reduce<SimulationFormData>((accumulator, step) => {
      accumulator[step.id] =
        (initialData[step.id as keyof SimulationRecord] as string | undefined) ?? "";
      return accumulator;
    }, {} as SimulationFormData);
  });
  const totalSteps = simulationFormSteps.length;
  const currentStep = simulationFormSteps[currentStepIndex];
  const currentValue =
    formData[currentStep.id] ?? initialData?.[currentStep.id as keyof SimulationRecord] ?? "";

  const handleNextStep = (value: string) => {
    const updatedFormData = { ...formData, [currentStep.id]: value };
    setFormData(updatedFormData);

    if (currentStepIndex + 1 > totalSteps - 1) {
      const existingRecord = initialData ?? (simulationId ? getFormData(simulationId) : null);
      const id = simulationId ?? saveFormData(updatedFormData);

      if (simulationId) {
        updateSimulation(simulationId, {
          ...(existingRecord ?? {}),
          ...updatedFormData,
          id: simulationId,
          createdAt: existingRecord?.createdAt ?? new Date().toISOString(),
        } as SimulationRecord);
      }

      void navigate(`/resultado/${id}`);
      return;
    }
    setCurrentStepIndex((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    if (currentStepIndex === 0) {
      return;
    }
    setCurrentStepIndex((prev) => prev - 1);
  };

  return (
    <>
      <StepProgress currentStep={currentStepIndex + 1} totalSteps={totalSteps} />
      <FormStep
        key={currentStep.id}
        {...currentStep}
        initialValue={currentValue}
        onBack={handlePreviousStep}
        onNext={handleNextStep}
        hideBackButton={currentStepIndex === 0}
        submitButtonLabelOverride={isEditMode ? "Salvar alterações" : undefined}
      />
    </>
  );
};
