import { cn } from "@/lib/utils";

export function ProactivePayLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className="flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path
            d="M8.5,21 C12,23 20,23 24,17 C28,11 22,6 22,6"
            stroke="url(#logo-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path 
            d="M18 10 L24 4 L30 10"
            stroke="hsl(var(--accent))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <text
            x="8"
            y="21"
            fontFamily="sans-serif"
            fontSize="16"
            fill="hsl(var(--primary))"
            fontWeight="bold"
            dy="1"
          >
            $
          </text>
        </svg>
      </div>
      <span className="font-headline text-2xl font-bold text-foreground">
        Proactive<span className="text-cyan-500">Pay</span>
      </span>
    </div>
  );
}
