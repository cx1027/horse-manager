"use client";

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "gradient";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  circle?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", isLoading, disabled, circle, leftIcon, rightIcon, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "text-white shadow-button",
      secondary: "bg-background-card text-text-primary border border-border hover:bg-background-elevated",
      ghost: "bg-transparent text-text-secondary hover:bg-background-secondary",
      outline: "bg-transparent text-accent border-2 border-accent hover:bg-accent/10",
      danger: "bg-error text-white shadow-button",
      gradient: "text-white shadow-fab",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-full gap-2",
      md: "px-6 py-3 text-sm rounded-full gap-2",
      lg: "px-8 py-4 text-base rounded-full gap-2",
    };

    const circleSizes = {
      sm: "w-10 h-10 rounded-full p-0",
      md: "w-12 h-12 rounded-full p-0",
      lg: "w-14 h-14 rounded-full p-0",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${circle ? circleSizes[size] : sizes[size]} ${className}`}
        style={variant === 'primary' ? { background: 'linear-gradient(135deg, #E12E6D, #A855F7)' } : undefined}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
