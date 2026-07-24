"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "micrographics";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, type = "text", variant = "default", ...props }, ref) => {
    
    // Micrographics variant - dashed border style
    if (variant === "micrographics") {
      return (
        <div className="space-y-1.5">
          {label && (
            <label 
              className="block mg-label"
            >
              {label}
            </label>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              "w-full border border-dashed px-4 py-3 rounded-lg",
              "text-sm font-light",
              "placeholder:text-mg-placeholder",
              "transition-all duration-200",
              "focus:border-solid focus:border-mg-border-emphasis focus:outline-none focus:ring-2 focus:ring-black/5",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-black/20" : "",
              className
            )}
            style={{ 
              background: 'transparent', 
              borderColor: error ? 'var(--color-error)' : 'var(--mg-border)',
              color: 'var(--mg-text-primary)',
            }}
            {...props}
          />
          {error && (
            <p className="mg-helper" style={{ color: 'var(--color-error)' }}>{error}</p>
          )}
        </div>
      );
    }

    // Default variant
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`
            w-full border rounded-full px-4 py-3 
            text-sm text-text-primary placeholder:text-text-muted
            transition-all duration-200
            focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? "border-accent" : ""}
            ${className}
          `}
          style={{ background: 'var(--color-background-card)', borderColor: 'var(--color-border)' }}
          {...props}
        />
        {error && (
          <p className="text-xs text-primary">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
