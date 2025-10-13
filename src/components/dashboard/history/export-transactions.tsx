"use client";

import { useState } from "react";
import { exportTransactionsToCsv } from "@/ai/flows/export-transactions-to-csv";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sheet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type ExportTransactionsProps = {
  transactionHistory: string;
};

export function ExportTransactions({ transactionHistory }: ExportTransactionsProps) {
  const [csvData, setCsvData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsLoading(true);
    setIsDialogOpen(true);
    try {
      const result = await exportTransactionsToCsv({ transactionHistory });
      setCsvData(result.csvData);
    } catch (error) {
      console.error("Failed to export transactions:", error);
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Could not generate CSV data. Please try again.",
      });
      setIsDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(csvData);
    toast({
      title: "Copied to Clipboard",
      description: "You can now paste the data into your spreadsheet.",
    });
  };

  return (
    <>
      <Button onClick={handleExport} disabled={isLoading}>
        <Sheet className="mr-2 h-4 w-4" />
        {isLoading && !isDialogOpen ? "Generating..." : "Export to Sheets"}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Export to Spreadsheet</DialogTitle>
            <DialogDescription>
              Copy the CSV data below and paste it into Google Sheets, Excel, or any other spreadsheet software.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-32 w-full" />
                </div>
            ) : (
                <Textarea
                readOnly
                value={csvData}
                className="h-64 font-mono text-xs"
                placeholder="Generating CSV data..."
                />
            )}
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Close</Button>
            <Button onClick={handleCopy} disabled={isLoading || !csvData}>
              Copy Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
