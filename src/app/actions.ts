"use server";

import { simplifyLegalTerm as simplifyLegalTermFlow, SimplifyLegalTermOutput } from "@/ai/flows/legal-term-simplifier";
import { z } from "zod";

const schema = z.object({
  legalTerm: z.string().min(3, "Please enter a legal term with at least 3 characters.").max(200, "Term must be 200 characters or less."),
});

type SimplifierState = {
  result?: SimplifyLegalTermOutput;
  error?: string;
}

export async function simplifyLegalTerm(prevState: SimplifierState, formData: FormData): Promise<SimplifierState> {
  const validatedFields = schema.safeParse({
    legalTerm: formData.get("legalTerm"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.legalTerm?.join(", "),
    };
  }
  
  try {
    const result = await simplifyLegalTermFlow({
      legalTerm: validatedFields.data.legalTerm,
    });
    return { result };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
    return { error: `An error occurred while simplifying the term: ${errorMessage}. Please try again.` };
  }
}
