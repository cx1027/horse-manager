import { ReactNode } from "react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  backHref?: string;
  transparent?: boolean;
}

export default function PageHeader({ title, subtitle, action, backHref, transparent }: PageHeaderProps) {
  return (
    <header className={`${transparent ? "bg-transparent" : "bg-background-primary"} sticky top-0 z-40`}>
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {backHref && (
              <Link
                href={backHref}
                className="p-2 -ml-2 rounded-full hover:bg-surface transition-colors"
              >
                <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            )}
            <div>
              <h1 className="text-xl font-medium text-text-primary">{title}</h1>
              {subtitle && (
                <p className="text-sm text-text-secondary mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      </div>
    </header>
  );
}
