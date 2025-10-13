import { TransactionList } from "@/components/dashboard/transaction-list";
import { ExportTransactions } from "@/components/dashboard/history/export-transactions";
import { mockTransactions } from "@/lib/data";

export default function HistoryPage() {
  const transactionHistoryString = JSON.stringify(mockTransactions, null, 2);

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Transaction History
          </h1>
          <ExportTransactions transactionHistory={transactionHistoryString} />
        </div>
        <TransactionList transactions={mockTransactions} />
      </div>
    </div>
  );
}
