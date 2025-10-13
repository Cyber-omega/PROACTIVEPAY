import { BottomNav } from "@/components/dashboard/bottom-nav";
import { Header } from "@/components/dashboard/header";
import { SideNav } from "@/components/dashboard/side-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col bg-background md:flex-row">
      <SideNav />
      <div className="flex h-full flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto pb-24 md:pb-8">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
