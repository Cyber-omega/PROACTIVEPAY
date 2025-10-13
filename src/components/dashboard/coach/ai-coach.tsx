"use client";

import { useEffect, useState } from "react";
import { summarizeTransactionHistory } from "@/ai/flows/summarize-transaction-history";
import { generateBudgetSuggestions } from "@/ai/flows/generate-budget-suggestions";
import { proactiveFinancialAdvice } from "@/ai/flows/proactive-financial-advice";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot, Lightbulb, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

type AICoachProps = {
  transactionHistory: string;
};

export function AICoach({ transactionHistory }: AICoachProps) {
  const [summary, setSummary] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchAIInsights = async () => {
    setIsLoading(true);
    try {
      const [summaryRes, suggestionsRes, adviceRes] = await Promise.all([
        summarizeTransactionHistory({ transactionHistory }),
        generateBudgetSuggestions({ transactionHistory }),
        proactiveFinancialAdvice({ transactionHistory }),
      ]);
      setSummary(summaryRes.summary);
      setSuggestions(suggestionsRes.suggestions);
      setAdvice(adviceRes.advice);
    } catch (error) {
      console.error("Failed to fetch AI insights:", error);
      setSummary("Could not load spending summary. Please try again later.");
      setSuggestions("Could not load budget suggestions. Please try again later.");
      setAdvice("Could not load financial advice. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAIInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionHistory]);

  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      line = line.trim();
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return <li key={index} className="ml-4">{line.substring(2)}</li>;
      }
      if (line) {
        return <p key={index} className="mb-2">{line}</p>;
      }
      return null;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={fetchAIInsights} disabled={isLoading}>
          {isLoading ? 'Refreshing...' : 'Refresh Insights'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-6 w-6 text-primary" />
            Spending Summary
          </CardTitle>
          <CardDescription>A quick overview of your recent transaction patterns.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-card-foreground">
                <ul>{renderContent(summary)}</ul>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Budget Suggestions
          </CardTitle>
           <CardDescription>AI-powered recommendations to help you save.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-card-foreground">
                <ul>{renderContent(suggestions)}</ul>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            Proactive Advice
          </CardTitle>
          <CardDescription>Timely tips based on your spending habits.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-card-foreground">
                {renderContent(advice)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
