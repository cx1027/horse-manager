"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, type = "text", ...props }, ref) => {
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
