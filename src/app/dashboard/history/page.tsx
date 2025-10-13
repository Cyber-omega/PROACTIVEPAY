import { TransactionList } from "@/components/dashboard/transaction-list";
import { mockTransactions } from "@/lib/data";

export default function HistoryPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Transaction History
        </h1>
        <TransactionList transactions={mockTransactions} />
      </div>
    </div>
  );
}
