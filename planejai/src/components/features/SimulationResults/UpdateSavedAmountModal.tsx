import { useState, type FormEvent } from "react";
import { useSimulationStorage } from "@/hooks/useSimulationStorage";
import { Modal } from "@/components/shared/Modal";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/Button";
import { formatCurrencyMask } from "@/utils/currency";

interface UpdateSavedAmountModalProps {
  id: string;
  currentValue?: string;
  open: boolean;
  onClose: () => void;
  onUpdated: (value: string) => void;
}

export function UpdateSavedAmountModal({
  id,
  currentValue = "",
  open,
  onClose,
  onUpdated,
}: UpdateSavedAmountModalProps) {
  const { updateSavedAmount } = useSimulationStorage();
  const [value, setValue] = useState(currentValue);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedValue = updateSavedAmount(id, value);
    if (updatedValue) {
      onUpdated(updatedValue.savedAmount ?? "0");
    }

    onClose();
  };

  return (
    <Modal open={open} title="Atualizar valor guardado" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
        <p className="text-muted-foreground text-sm">
          Informe quanto você já acumulou para essa meta.
        </p>
        <Input
          autoFocus
          prefix="R$"
          placeholder="ex: 2.500,00"
          maxLength={12}
          value={value}
          onChange={(event) => setValue(formatCurrencyMask(event.target.value))}
        />
        <div className="flex justify-end gap-3">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
