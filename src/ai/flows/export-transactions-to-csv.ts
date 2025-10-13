'use server';

/**
 * @fileOverview A Genkit flow for exporting transaction history to a CSV format.
 *
 * This flow takes a user's transaction history and converts it into a CSV (Comma-Separated Values)
 * string, which can be easily copied and pasted into spreadsheet applications like Google Sheets.
 *
 * @exported exportTransactionsToCsv - An async function that takes transaction history and returns it in CSV format.
 * @exported ExportTransactionsToCsvInput - The input type for the exportTransactionsToCsv function.
 * @exported ExportTransactionsToCsvOutput - The output type for the exportTransactionsToCsv function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExportTransactionsToCsvInputSchema = z.object({
  transactionHistory: z.string().describe("A JSON string of the user's transaction history."),
});
export type ExportTransactionsToCsvInput = z.infer<typeof ExportTransactionsToCsvInputSchema>;

const ExportTransactionsToCsvOutputSchema = z.object({
  csvData: z.string().describe('The transaction history formatted as a CSV string. The headers should be "ID", "Date", "Description", "Party", "Amount", "Type".'),
});
export type ExportTransactionsToCsvOutput = z.infer<typeof ExportTransactionsToCsvOutputSchema>;

export async function exportTransactionsToCsv(input: ExportTransactionsToCsvInput): Promise<ExportTransactionsToCsvOutput> {
  return exportTransactionsToCsvFlow(input);
}

const prompt = ai.definePrompt({
  name: 'exportTransactionsToCsvPrompt',
  input: {schema: ExportTransactionsToCsvInputSchema},
  output: {schema: ExportTransactionsToCsvOutputSchema},
  prompt: `You are a data processing expert. Your task is to convert a JSON object representing a user's transaction history into a CSV (Comma-Separated Values) string.

The JSON will have the following structure for each transaction:
{
  "id": "string",
  "type": "'p2p-sent' | 'p2p-received' | 'bill-payment' | 'deposit'",
  "amount": number,
  "date": "string (ISO 8601)",
  "description": "string",
  "party": {
    "name": "string"
  }
}

The output CSV string must have the following headers in the first line:
"ID","Date","Description","Party","Amount","Type"

Each subsequent line should represent a transaction, with the values corresponding to the headers. Ensure that the date is formatted as YYYY-MM-DD.

Transaction History (JSON):
{{{transactionHistory}}}

Generate only the CSV data. Do not include any other text or explanations.
`,
});


const exportTransactionsToCsvFlow = ai.defineFlow(
  {
    name: 'exportTransactionsToCsvFlow',
    inputSchema: ExportTransactionsToCsvInputSchema,
    outputSchema: ExportTransactionsToCsvOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
