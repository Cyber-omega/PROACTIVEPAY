'use server';

/**
 * @fileOverview This file defines a Genkit flow for finding savings opportunities based on user transaction history.
 *
 * The flow analyzes transaction data to identify recurring payments, subscriptions, and bills, then suggests
 * potential areas for the user to save money.
 *
 * @exported findSavingsOpportunities - An async function that takes transaction history and returns savings suggestions.
 * @exported FindSavingsOpportunitiesInput - The input type for the findSavingsOpportunities function.
 * @exported FindSavingsOpportunitiesOutput - The output type for the findSavingsOpportunities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindSavingsOpportunitiesInputSchema = z.object({
  transactionHistory: z.string().describe("A detailed history of the user's transactions, including amounts, dates, and descriptions."),
});
export type FindSavingsOpportunitiesInput = z.infer<typeof FindSavingsOpportunitiesInputSchema>;

const OpportunitySchema = z.object({
    title: z.string().describe("A catchy title for the savings opportunity."),
    description: z.string().describe("A detailed description of the potential saving, including the merchant, amount, and suggestion."),
    estimatedSavings: z.string().describe("The estimated monthly or annual savings, formatted as a string (e.g., '$15/month' or '$180/year').")
});

const FindSavingsOpportunitiesOutputSchema = z.object({
  opportunities: z.array(OpportunitySchema).describe('A list of potential savings opportunities identified from the transaction history.'),
});
export type FindSavingsOpportunitiesOutput = z.infer<typeof FindSavingsOpportunitiesOutputSchema>;

export async function findSavingsOpportunities(input: FindSavingsOpportunitiesInput): Promise<FindSavingsOpportunitiesOutput> {
  return findSavingsOpportunitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'findSavingsOpportunitiesPrompt',
  input: {schema: FindSavingsOpportunitiesInputSchema},
  output: {schema: FindSavingsOpportunitiesOutputSchema},
  prompt: `You are an expert financial analyst. Your job is to find concrete savings opportunities for the user based on their transaction history. Analyze the provided transactions to identify recurring bills, subscriptions, and frequent purchases.

For each opportunity you find, provide a clear title, a description of the saving, and an estimated savings amount.

Focus on actionable advice. For example:
- Identify subscriptions the user might have forgotten about.
- Suggest negotiating a better rate for recurring bills like internet or phone.
- Spot patterns of frequent small purchases that add up.

Transaction History:
{{{transactionHistory}}}

Generate a list of savings opportunities based on this data.
`,
});

const findSavingsOpportunitiesFlow = ai.defineFlow(
  {
    name: 'findSavingsOpportunitiesFlow',
    inputSchema: FindSavingsOpportunitiesInputSchema,
    outputSchema: FindSavingsOpportunitiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
