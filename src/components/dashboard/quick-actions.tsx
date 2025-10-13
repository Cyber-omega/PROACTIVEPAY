import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Receipt, Bot } from "lucide-react";

const actions = [
  { href: "/dashboard/pay", icon: Send, label: "Send" },
  { href: "/dashboard/pay", icon: Receipt, label: "Pay Bill" },
  { href: "/dashboard/coach", icon: Bot, label: "AI Coach" },
];

export function QuickActions() {
  return (
    <Card className="h-full">
      <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-center">
        <p className="text-sm font-medium mb-4 text-center md:text-left">Quick Actions</p>
        <div className="flex justify-around gap-2">
          {actions.map((action) => (
            <Link href={action.href} key={action.label} className="flex-1">
              <Button
                variant="outline"
                className="w-full h-20 flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <action.icon className="h-6 w-6 text-primary" />
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
