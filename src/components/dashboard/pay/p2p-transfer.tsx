"use client";

import { useState } from "react";
import Image from "next/image";
import { mockContacts, mockUser } from "@/lib/data";
import type { Contact } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function P2PTransfer() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handleSendMoney = () => {
    if (!selectedContact || !amount || parseFloat(amount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Transfer",
        description: "Please select a contact and enter a valid amount.",
      });
      return;
    }
    if (parseFloat(amount) > mockUser.balance) {
      toast({
        variant: "destructive",
        title: "Insufficient Funds",
        description: "You do not have enough balance to make this transfer.",
      });
      return;
    }
    
    toast({
      title: "Transfer Sent!",
      description: `You sent $${amount} to ${selectedContact.name}.`,
    });
    setSelectedContact(null);
    setAmount("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Money</CardTitle>
        <CardDescription>Select a contact to start a transfer.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <p className="text-sm font-medium">Your Contacts</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {mockContacts.map((contact) => (
                <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                    selectedContact?.id === contact.id
                    ? "border-primary bg-primary/10"
                    : "border-transparent hover:bg-secondary"
                )}
                >
                <Avatar className="h-12 w-12">
                    <AvatarImage src={contact.avatarUrl} alt={contact.name} data-ai-hint={contact.avatarHint} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-center truncate w-full">{contact.name}</span>
                </button>
            ))}
            </div>
        </div>
        {selectedContact && (
          <div className="space-y-4 rounded-lg border bg-secondary/50 p-4">
            <p className="font-medium">Amount to send to {selectedContact.name}</p>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl font-semibold text-muted-foreground">$</span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="h-14 pl-8 text-3xl font-bold"
              />
            </div>
          </div>
        )}
      </CardContent>
      {selectedContact && (
        <CardFooter>
          <Button onClick={handleSendMoney} className="w-full" size="lg">
            Send ${amount || '0.00'} to {selectedContact.name}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
