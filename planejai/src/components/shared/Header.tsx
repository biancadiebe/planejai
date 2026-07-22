import { Clock, Moon, Sun, TrendingUp, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { useTheme } from "../../hooks/useTheme";
import { Divider } from "./Divider";

const headerButtonClasses =
  "flex cursor-pointer items-center justify-center font-medium text-sm gap-2 px-4 py-3 transition-opacity hover:opacity-80 rounded-3xl text-foreground";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="border-(--border) border-b px-6 py-3">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
              <Wallet size={20} className="text-primary-foreground" />
            </div>
            <span className="text-lg">
              <span className="text-muted-foreground font-medium">Planej</span>
              <span className="font-extrabold">.ai</span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Link
              to="/"
              className={`${headerButtonClasses} bg-primary text-primary-foreground font-semibold`}
            >
              <TrendingUp size={20} />
              <span className="hidden sm:inline">Nova simulação</span>
            </Link>
            <Link to="/historico" className={headerButtonClasses}>
              <Clock size={20} />
              <span className="hidden sm:inline">Histórico</span>
            </Link>
            <Divider orientation="vertical" />
            <Button
              aria-label={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
              variant="ghost"
              icon={theme === "light" ? Moon : Sun}
              onClick={toggleTheme}
            ></Button>
          </div>
        </nav>
      </header>
    </>
  );
}
