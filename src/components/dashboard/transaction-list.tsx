import Image from "next/image";
import { format } from "date-fns";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  Landmark,
} from "lucide-react";
import type { Transaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TransactionListProps = {
  transactions: Transaction[];
  limit?: number;
};

const transactionIcons = {
  "p2p-sent": <ArrowUpRight className="h-5 w-5 text-red-500" />,
  "p2p-received": <ArrowDownLeft className="h-5 w-5 text-green-500" />,
  "bill-payment": <Receipt className="h-5 w-5 text-blue-500" />,
  deposit: <Landmark className="h-5 w-5 text-indigo-500" />,
};

const transactionSigns = {
  "p2p-sent": "-",
  "bill-payment": "-",
  "p2p-received": "+",
  deposit: "+",
};

export function TransactionList({ transactions, limit }: TransactionListProps) {
  const displayTransactions = limit
    ? transactions.slice(0, limit)
    : transactions;

  return (
    <Card>
      <CardContent className="p-0">
        <ul className="divide-y divide-border">
          {displayTransactions.map((tx) => (
            <li key={tx.id} className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  {tx.party.avatarUrl ? (
                     <Avatar className="h-10 w-10">
                        <AvatarImage src={tx.party.avatarUrl} alt={tx.party.name} data-ai-hint={tx.party.avatarHint} />
                        <AvatarFallback>{tx.party.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    transactionIcons[tx.type]
                  )}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{tx.party.name}</p>
                  <p className="text-sm text-muted-foreground">{tx.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    "font-bold",
                    tx.type.includes("received") || tx.type.includes("deposit")
                      ? "text-green-600"
                      : "text-foreground"
                  )}
                >
                  {transactionSigns[tx.type]}${tx.amount.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(tx.date), "MMM d")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
