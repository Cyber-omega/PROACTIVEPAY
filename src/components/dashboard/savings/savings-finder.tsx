"use client";

import { useEffect, useState } from "react";
import { findSavingsOpportunities } from "@/ai/flows/find-savings-opportunities";
import type { FindSavingsOpportunitiesOutput } from "@/ai/flows/find-savings-opportunities";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingDown } from "lucide-react";

type SavingsFinderProps = {
  transactionHistory: string;
};

export function SavingsFinder({ transactionHistory }: SavingsFinderProps) {
  const [opportunities, setOpportunities] = useState<FindSavingsOpportunitiesOutput['opportunities']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavingsOpportunities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await findSavingsOpportunities({ transactionHistory });
      setOpportunities(result.opportunities);
    } catch (err) {
      console.error("Failed to fetch savings opportunities:", err);
      setError("Could not load savings opportunities. Please try again later.");
      setOpportunities([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchSavingsOpportunities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionHistory]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={fetchSavingsOpportunities} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Find New Savings'}
        </Button>
      </div>

      {isLoading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardContent>
          </Card>
        ))
      ) : error ? (
        <Card>
            <CardHeader>
                <CardTitle className="text-destructive">An Error Occurred</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{error}</p>
            </CardContent>
        </Card>
      ) : opportunities.length === 0 ? (
        <Card>
            <CardHeader>
                <CardTitle>No Obvious Savings Found</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Your spending looks optimized right now. Check back later as your agent continues to analyze your habits.</p>
            </CardContent>
        </Card>
      ) : (
        opportunities.map((opp, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-6 w-6 text-primary" />
                {opp.title}
              </CardTitle>
              <CardDescription>
                Estimated Savings: <span className="font-bold text-green-600">{opp.estimatedSavings}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-card-foreground">{opp.description}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
