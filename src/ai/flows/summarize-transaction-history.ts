'use server';

/**
 * @fileOverview Summarizes the transaction history of a user using AI.
 *
 * - summarizeTransactionHistory - A function that handles the transaction history summarization process.
 * - SummarizeTransactionHistoryInput - The input type for the summarizeTransactionHistory function.
 * - SummarizeTransactionHistoryOutput - The return type for the summarizeTransactionHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTransactionHistoryInputSchema = z.object({
  transactionHistory: z
    .string()
    .describe('The transaction history of the user in JSON format.'),
});
export type SummarizeTransactionHistoryInput = z.infer<typeof SummarizeTransactionHistoryInputSchema>;

const SummarizeTransactionHistoryOutputSchema = z.object({
  summary: z.string().describe('The summary of the transaction history.'),
});
export type SummarizeTransactionHistoryOutput = z.infer<typeof SummarizeTransactionHistoryOutputSchema>;

export async function summarizeTransactionHistory(
  input: SummarizeTransactionHistoryInput
): Promise<SummarizeTransactionHistoryOutput> {
  return summarizeTransactionHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTransactionHistoryPrompt',
  input: {schema: SummarizeTransactionHistoryInputSchema},
  output: {schema: SummarizeTransactionHistoryOutputSchema},
  prompt: `You are a financial advisor. Please summarize the following transaction history to help the user understand their spending patterns.\n\nTransaction History: {{{transactionHistory}}}`,
});

const summarizeTransactionHistoryFlow = ai.defineFlow(
  {
    name: 'summarizeTransactionHistoryFlow',
    inputSchema: SummarizeTransactionHistoryInputSchema,
    outputSchema: SummarizeTransactionHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
