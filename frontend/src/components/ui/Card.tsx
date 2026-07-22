import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({ children, className = "", onClick, padding = "md" }: CardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  };

  const Component = onClick ? "button" : "div";
  
  return (
    <Component
      className={`bg-surface rounded-3xl shadow-card ${paddingStyles[padding]} ${onClick ? "cursor-pointer hover:shadow-elevated transition-shadow w-full text-left" : ""} ${className}`}
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
  return <div className={`mt-5 pt-5 border-t border-border ${className}`}>{children}</div>;
}
