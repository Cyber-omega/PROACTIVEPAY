import { AICoach } from "@/components/dashboard/coach/ai-coach";
import { mockTransactions } from "@/lib/data";

export default function CoachPage() {
  const transactionHistoryString = JSON.stringify(mockTransactions, null, 2);

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Your AI Financial Coach
            </h1>
            <p className="mt-2 text-muted-foreground">
                Personalized insights to help you manage your money better.
            </p>
        </div>
        <AICoach transactionHistory={transactionHistoryString} />
      </div>
    </div>
  );
}
