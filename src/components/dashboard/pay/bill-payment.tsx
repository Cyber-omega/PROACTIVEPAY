"use client";

import { useState, useEffect } from "react";
import { mockBillers, mockUser } from "@/lib/data";
import type { Biller } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

type BillWithAmount = Biller & { amount: number };

export function BillPayment() {
  const { toast } = useToast();
  const [bills, setBills] = useState<BillWithAmount[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial server render.
    // It safely generates random amounts for the bills without causing a hydration mismatch.
    setIsClient(true);
    setBills(mockBillers.map(biller => ({
      ...biller,
      amount: Math.random() * 100 + 20,
    })));
  }, []);

  const handlePayBill = (biller: Biller, amount: number) => {
    if (amount > mockUser.balance) {
      toast({
        variant: "destructive",
        title: "Insufficient Funds",
        description: "You do not have enough balance to pay this bill.",
      });
      return;
    }

    toast({
      title: "Bill Paid!",
      description: `You paid $${amount.toFixed(2)} to ${biller.name}.`,
    });
  };

  if (!isClient) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pay a Bill</CardTitle>
                <CardDescription>Select a biller to make a payment.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                        </div>
                        <div className="text-right flex items-center gap-4">
                        <Skeleton className="h-5 w-12" />
                        <Skeleton className="h-8 w-12" />
                        </div>
                    </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">Add New Biller</Button>
            </CardFooter>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay a Bill</CardTitle>
        <CardDescription>Select a biller to make a payment.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
            {bills.map((biller) => (
              <li key={biller.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <biller.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{biller.name}</p>
                    <p className="text-sm text-muted-foreground">{biller.category}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <p className="font-semibold">${biller.amount.toFixed(2)}</p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm">Pay</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to pay ${biller.amount.toFixed(2)} to {biller.name}?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handlePayBill(biller, biller.amount)}>
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </li>
            ))
          }
        </ul>
      </CardContent>
      <CardFooter>
          <Button variant="outline" className="w-full">Add New Biller</Button>
      </CardFooter>
    </Card>
  );
}
