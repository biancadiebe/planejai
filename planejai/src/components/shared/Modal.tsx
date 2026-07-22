import { type ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-card w-full max-w-4xl overflow-hidden rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
        <div className="border-border flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-foreground text-lg font-semibold">{title}</h2>
          </div>
          <Button variant="ghost" icon={X} onClick={onClose} aria-label="Fechar chat" />
        </div>
        <div className="max-h-[80vh] overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
