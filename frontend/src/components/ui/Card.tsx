import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
  style?: React.CSSProperties;
  variant?: "default" | "micrographics";
}

export default function Card({ children, className = "", onClick, padding = "md", style, variant = "default" }: CardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-5",
  };

  const Component = onClick ? "button" : "div";

  // Micrographics variant - transparent, minimal
  if (variant === 'micrographics') {
    return (
      <Component
        className={cn(
          "rounded-lg transition-all",
          paddingStyles[padding],
          onClick ? "cursor-pointer hover:bg-white/50 w-full text-left" : "",
          className
        )}
        style={{
          background: 'transparent',
          border: '1px solid var(--mg-border-subtle)',
          ...style,
        }}
        onClick={onClick}
      >
        {children}
      </Component>
    );
  }

  // Default variant
  return (
    <Component
      className={`bg-background-card rounded-xl border border-border ${paddingStyles[padding]} ${onClick ? "cursor-pointer hover:shadow-elevated transition-shadow w-full text-left" : ""} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h3 className={`text-lg font-medium text-text-primary ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm text-text-secondary mt-2 leading-relaxed ${className}`}>{children}</p>;
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mt-5 pt-5 border-t ${className}`} style={{ borderColor: 'var(--color-border)' }}>{children}</div>;
}
