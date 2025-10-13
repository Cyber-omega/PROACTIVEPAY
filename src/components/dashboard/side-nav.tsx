"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, Send, Bot, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProactivePayLogo } from "../shared/logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/dashboard/history", icon: History, label: "History" },
  { href: "/dashboard/pay", icon: Send, label: "Pay" },
  { href: "/dashboard/savings", icon: PiggyBank, label: "Savings" },
  { href: "/dashboard/coach", icon: Bot, label: "Coach" },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex md:flex-col md:w-64 md:border-r bg-background">
      <div className="flex h-16 items-center justify-center border-b px-6">
        <Link href="/dashboard">
          <ProactivePayLogo className="h-8 w-auto" />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    isActive && "bg-primary/10 text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
