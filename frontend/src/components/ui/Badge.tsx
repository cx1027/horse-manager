interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info" | "micrographics";
  size?: "sm" | "md";
  className?: string;
  style?: React.CSSProperties;
}

export default function Badge({ children, variant = "default", size = "sm", className = "", style }: BadgeProps) {
  // Micrographics variant - minimal dot style
  if (variant === 'micrographics') {
    return (
      <span 
        className={`inline-flex items-center gap-1.5 ${className}`}
        style={style}
      >
        <span 
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: 'var(--mg-text-muted)' }}
        />
        <span 
          className="text-[10px] font-light tracking-wide"
          style={{ 
            fontFamily: 'var(--mg-font-sans)',
            color: 'var(--mg-text-muted)'
          }}
        >
          {children}
        </span>
      </span>
    );
  }

  const variants = {
    default: "bg-background-secondary text-text-secondary",
    primary: "bg-primary-soft text-primary",
    secondary: "bg-secondary/20 text-secondary",
    success: "bg-success-soft text-success",
    warning: "bg-warning-soft text-warning",
    error: "bg-error-soft text-error",
    info: "bg-info-soft text-info",
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
