import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

type BalanceCardProps = {
  balance: number;
};

export function BalanceCard({ balance }: BalanceCardProps) {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
        <Button variant="outline" size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Money
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-extrabold text-primary">
          {formattedBalance}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Ready for your next move
        </p>
      </CardContent>
    </Card>
  );
}
