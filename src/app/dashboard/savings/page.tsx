import { SavingsFinder } from "@/components/dashboard/savings/savings-finder";
import { mockTransactions } from "@/lib/data";

export default function SavingsPage() {
  const transactionHistoryString = JSON.stringify(mockTransactions, null, 2);

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Savings Opportunities
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your AI agent is looking for ways to save you money.
          </p>
        </div>
        <SavingsFinder transactionHistory={transactionHistoryString} />
      </div>
    </div>
  );
}
