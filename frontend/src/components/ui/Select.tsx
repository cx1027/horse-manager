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
            w-full rounded-full border border-border bg-surface px-4 py-3 
            text-sm text-text-primary
            transition-all duration-200
            focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
            disabled:cursor-not-allowed disabled:opacity-50
            cursor-pointer
            ${error ? "border-primary" : ""}
            ${className}
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-primary">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
