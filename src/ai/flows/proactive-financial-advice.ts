'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing proactive financial advice to users based on their transaction history.
 *
 * The flow analyzes the user's transaction history to identify potential savings opportunities or warn about overspending.
 *
 * @exported proactiveFinancialAdvice - An async function that takes transaction history as input and returns financial advice.
 * @exported ProactiveFinancialAdviceInput - The input type for the proactiveFinancialAdvice function.
 * @exported ProactiveFinancialAdviceOutput - The output type for the proactiveFinancialAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProactiveFinancialAdviceInputSchema = z.object({
  transactionHistory: z.string().describe('The transaction history of the user.'),
});
export type ProactiveFinancialAdviceInput = z.infer<typeof ProactiveFinancialAdviceInputSchema>;

const ProactiveFinancialAdviceOutputSchema = z.object({
  advice: z.string().describe('The personalized financial advice for the user.'),
});
export type ProactiveFinancialAdviceOutput = z.infer<typeof ProactiveFinancialAdviceOutputSchema>;

export async function proactiveFinancialAdvice(input: ProactiveFinancialAdviceInput): Promise<ProactiveFinancialAdviceOutput> {
  return proactiveFinancialAdviceFlow(input);
}

const proactiveFinancialAdvicePrompt = ai.definePrompt({
  name: 'proactiveFinancialAdvicePrompt',
  input: {schema: ProactiveFinancialAdviceInputSchema},
  output: {schema: ProactiveFinancialAdviceOutputSchema},
  prompt: `You are a personal financial advisor. Analyze the user's transaction history and provide personalized financial advice, such as identifying potential savings opportunities or warning about overspending.\n\nTransaction History: {{{transactionHistory}}}`,
});

const proactiveFinancialAdviceFlow = ai.defineFlow(
  {
    name: 'proactiveFinancialAdviceFlow',
    inputSchema: ProactiveFinancialAdviceInputSchema,
    outputSchema: ProactiveFinancialAdviceOutputSchema,
  },
  async input => {
    const {output} = await proactiveFinancialAdvicePrompt(input);
    return output!;
  }
);
