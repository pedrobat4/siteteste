import { LegalTermSimplifier } from "@/components/legal-term-simplifier";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Legal Term Simplifier - LexPro',
  description: 'Understand complex legal terms with our AI-powered simplifier tool. Get plain language explanations instantly.',
};

export default function SimplifierPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">AI-Powered Legal Simplifier</h1>
        <p className="text-lg text-muted-foreground">Demystifying legal jargon, one term at a time.</p>
      </div>
      <LegalTermSimplifier />
    </div>
  );
}
