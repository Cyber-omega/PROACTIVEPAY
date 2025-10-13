import { BalanceCard } from "@/components/dashboard/balance-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { TransactionList } from "@/components/dashboard/transaction-list";
import { mockUser, mockTransactions } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome back, {mockUser.name}!
        </h1>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <BalanceCard balance={mockUser.balance} />
          </div>
          <div className="md:col-span-1">
            <QuickActions />
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
            Recent Activity
          </h2>
          <TransactionList transactions={mockTransactions} limit={4} />
        </div>
      </div>
    </div>
  );
}
