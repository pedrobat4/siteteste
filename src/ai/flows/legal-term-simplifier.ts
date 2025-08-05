'use server';
/**
 * @fileOverview A legal term simplifier AI agent.
 *
 * - simplifyLegalTerm - A function that simplifies legal terms or concepts.
 * - SimplifyLegalTermInput - The input type for the simplifyLegalTerm function.
 * - SimplifyLegalTermOutput - The return type for the simplifyLegalTerm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimplifyLegalTermInputSchema = z.object({
  legalTerm: z.string().describe('The legal term or concept to simplify.'),
});
export type SimplifyLegalTermInput = z.infer<typeof SimplifyLegalTermInputSchema>;

const SimplifyLegalTermOutputSchema = z.object({
  simplifiedExplanation: z.string().describe('A simplified explanation of the legal term or concept in plain language.'),
});
export type SimplifyLegalTermOutput = z.infer<typeof SimplifyLegalTermOutputSchema>;

export async function simplifyLegalTerm(input: SimplifyLegalTermInput): Promise<SimplifyLegalTermOutput> {
  return simplifyLegalTermFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simplifyLegalTermPrompt',
  input: {schema: SimplifyLegalTermInputSchema},
  output: {schema: SimplifyLegalTermOutputSchema},
  prompt: `You are an expert legal professional skilled at simplifying complex legal terms and concepts for a general audience.

  Please provide a simplified explanation of the following legal term or concept in plain language:

  {{legalTerm}}`,
});

const simplifyLegalTermFlow = ai.defineFlow(
  {
    name: 'simplifyLegalTermFlow',
    inputSchema: SimplifyLegalTermInputSchema,
    outputSchema: SimplifyLegalTermOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
