import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Añadimos "link" a los tipos
  variant?: "default" | "outline" | "ghost" | "link"; 
  size?: "sm" | "default" | "lg" | "icon";
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50",
        variant === "default" &&
          "bg-blue-900 text-white hover:bg-blue-800", // Estilo basado en tu diseño
        variant === "outline" &&
          "border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900",
        variant === "ghost" && "hover:bg-slate-100 text-slate-900",
        // AGREGAMOS EL ESTILO LINK AQUÍ:
        variant === "link" && "text-blue-600 underline-offset-4 hover:underline bg-transparent p-0 h-auto",
        
        size === "sm" && "h-8 px-3 text-xs",
        size === "default" && "h-10 px-4",
        size === "lg" && "h-11 px-8",
        size === "icon" && "h-10 w-10",
        className
      )}
      {...props}
    />
  );
}