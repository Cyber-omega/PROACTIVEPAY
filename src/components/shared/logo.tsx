import { cn } from "@/lib/utils";

export function ProactivePayLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)}>
      <div className="bg-primary rounded-xl p-2 flex items-center justify-center shadow-md">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary-foreground"
        >
          <path
            d="M13 22C17.9706 22 22 17.9706 22 13C22 8.02944 17.9706 4 13 4C8.02944 4 4 8.02944 4 13C4 17.9706 8.02944 22 13 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.3241 13.0001L10.3801 17.9531V8.04711L16.3241 13.0001Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span className="font-headline text-2xl font-bold text-foreground">
        ProactivePay
      </span>
    </div>
  );
}
