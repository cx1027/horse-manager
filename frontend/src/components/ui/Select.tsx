"use client";

import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, options, error, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full border rounded-full px-4 py-3 
            text-sm text-text-primary
            transition-all duration-200
            focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20
            disabled:cursor-not-allowed disabled:opacity-50
            cursor-pointer
            ${error ? "border-accent" : ""}
            ${className}
          `}
          style={{ background: 'var(--color-background-card)', borderColor: 'var(--color-border)' }}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-accent">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
