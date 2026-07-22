interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "warning";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({ children, variant = "default", size = "sm", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-background-primary text-text-secondary",
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary/10 text-secondary",
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-600",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}
