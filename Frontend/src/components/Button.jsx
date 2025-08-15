import React from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition " +
  "focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

const variants = {
  primary:
    "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow-md",
  outline:
    "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50",
 
  ghost:
    "text-slate-700 hover:bg-slate-100",

  // Nuestro custom sólido y contorno dependen de estilos inline para color
  customSolid:
    "border shadow-sm hover:shadow-md hover:brightness-95",
  customOutline:
    "bg-transparent border hover:brightness-95",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4",
  lg: "h-12 px-5 text-lg",
};

/**
 * Props:
 * - variant: "primary" | "outline" | "ghost" | "custom" | "customOutline"
 * - color: hex/rgb (ej: "#10b981")
 * - fg: color del texto en customSolid (por defecto "#fff")
 */
export default function Button({
  as: Comp = "button",
  variant = "primary",
  size = "md",
  color,          // ej: "#f59e0b"
  fg = "#ffffff", // texto para solid
  className = "",
  children,
  ...props
}) {
  // Estilos inline según el variant
  let style = undefined;
  if (variant === "custom") {
    // Sólido: fondo y borde del color, texto fg
    style = {
      backgroundColor: color || "#10b981",
      borderColor: color || "#10b981",
      color: fg,
      // color del focus ring:
      "--tw-ring-color": color || "#10b981",
    };
  } else if (variant === "customOutline") {
    // Contorno: texto y borde del color, fondo transparente
    style = {
      backgroundColor: "#10b981",
      borderColor: color || "#10b981",
      color: color || "#10b981",
      "--tw-ring-color": color || "#10b981",
    };
  }

  const variantClass =
    variant === "custom"
      ? variants.customSolid
      : variant === "customOutline"
      ? variants.customOutline
      : variants[variant] ?? variants.primary;

  return (
    <Comp
      style={style}
      className={`${base} ${variantClass} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}