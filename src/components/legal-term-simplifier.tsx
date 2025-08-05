"use client";

import { useFormState, useFormStatus } from "react-dom";
import { simplifyLegalTerm } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Bot, Scale, Loader2 } from "lucide-react";

const initialState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
      Simplify Term
    </Button>
  );
}

export function LegalTermSimplifier() {
  const [state, formAction] = useFormState(simplifyLegalTerm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary p-3 rounded-full">
            <Scale className="w-8 h-8" />
          </div>
          <div>
            <CardTitle className="font-headline text-2xl">Legal Term Simplifier</CardTitle>
            <CardDescription>Enter a complex legal term, and our AI will explain it in simple language.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="legalTerm">Legal Term or Concept</Label>
            <Textarea
              id="legalTerm"
              name="legalTerm"
              placeholder="e.g., 'Res ipsa loquitur', 'Habeas corpus', 'Statute of limitations'"
              rows={4}
              required
            />
          </div>
          <SubmitButton />
        </form>

        {state?.result && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-xl font-bold font-headline text-primary mb-2">Simplified Explanation</h3>
            <div className="bg-primary/5 p-4 rounded-md space-y-3">
              <p className="text-foreground whitespace-pre-wrap">{state.result.simplifiedExplanation}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
