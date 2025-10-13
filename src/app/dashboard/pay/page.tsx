import { P2PTransfer } from "@/components/dashboard/pay/p2p-transfer";
import { BillPayment } from "@/components/dashboard/pay/bill-payment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Receipt } from "lucide-react";

export default function PayPage() {
  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Send & Pay
        </h1>
        <Tabs defaultValue="p2p" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="p2p">
              <Users className="mr-2 h-4 w-4" />
              Send to Contact
            </TabsTrigger>
            <TabsTrigger value="bill">
              <Receipt className="mr-2 h-4 w-4" />
              Pay a Bill
            </TabsTrigger>
          </TabsList>
          <TabsContent value="p2p">
            <P2PTransfer />
          </TabsContent>
          <TabsContent value="bill">
            <BillPayment />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
