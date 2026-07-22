import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { type LucideIcon } from "lucide-react";

type SharedButtonProps = {
  variant: "primary" | "secondary" | "ghost" | "icon";
  icon?: LucideIcon;
  children?: ReactNode;
  className?: string;
};

type LinkButtonProps = SharedButtonProps & {
  to: LinkProps["to"];
} & Omit<LinkProps, "to" | "className">;

type RegularButtonProps = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

const baseClasses =
  "flex cursor-pointer items-center justify-center font-medium text-sm gap-2 px-4 py-3 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80";

const variantClasses = {
  primary: "bg-primary text-primary-foreground font-semibold rounded-xl",
  secondary: "bd-secondary-button border-border rounded-3xl",
  ghost: "rounded-lg text-foreground",
  icon: "rounded-lg text-foreground",
};

export function Button(props: LinkButtonProps | RegularButtonProps) {
  const classes = [baseClasses, variantClasses[props.variant], props.className].join(" ");

  if ("to" in props && props.to !== undefined) {
    const { variant, icon: Icon, children, className, to, ...linkProps } = props;

    return (
      <Link to={to} className={classes} {...linkProps}>
        {Icon && <Icon size={20} />}
        {children}
      </Link>
    );
  }

  const {
    variant,
    icon: Icon,
    children,
    className,
    type = "button",
    disabled,
    to,
    ...buttonProps
  } = props as RegularButtonProps;

  return (
    <button type={type} disabled={disabled} {...buttonProps} className={classes}>
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
}
