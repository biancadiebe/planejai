import { Button } from "@/components/shared/Button";
import { Input, type InputProps } from "@/components/shared/input";
import { formatCurrencyMask } from "@/utils/currency";
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";

export interface FormStepProps {
  id?: string;
  Icon: LucideIcon;
  title: string;
  question: string;
  inputProps: InputProps;
  submitButtonProps?: {
    label: string;
    emojiIcon?: string;
  };
}

interface ActionsButtonsProps {
  onBack: () => void;
  onNext: (value: string) => void;
  hideBackButton?: boolean;
}

export function FormStep({
  Icon,
  title,
  question,
  inputProps,
  submitButtonProps,
  onBack,
  onNext,
  hideBackButton,
}: FormStepProps & ActionsButtonsProps) {
  const [inputValue, setInputValue] = useState("");
  const isCurrencyInput = inputProps.prefix === "R$";
  const isNumericInput = inputProps.type === "number";

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputValue) {
      return;
    }
    onNext(inputValue);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const nextValue = e.target.value;

    if (isCurrencyInput) {
      setInputValue(formatCurrencyMask(nextValue));
      return;
    }

    if (isNumericInput) {
      setInputValue(nextValue.replace(/\D/g, ""));
      return;
    }

    setInputValue(nextValue);
  }

  return (
    <>
      <div className="bg-card rounded-2x1 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
        <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-4xl">
          <Icon size={32} className="text-primary-foreground" />
        </div>
        <h2 className="text-primary mb-1 text-xs font-semibold uppercase tracking-widest">
          {title}
        </h2>
        <h3 className="text-foreground sm:text-2x1 mb-6 text-xl font-semibold leading-snug">
          {question}
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input {...inputProps} value={inputValue} onChange={handleInputChange} />

          <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
            {!hideBackButton && (
              <Button
                onClick={onBack}
                type="button"
                variant="ghost"
                className="rounded-x1 order-2 flex-1 justify-center py-3 sm:order-1"
              >
                <ArrowLeft size={16} />
                Voltar
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              className="order-1 flex-1 sm:order-2"
              disabled={!inputValue}
            >
              {submitButtonProps?.label ?? "Próximo"}
              {submitButtonProps?.emojiIcon ?? <ArrowRight size={16} />}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
