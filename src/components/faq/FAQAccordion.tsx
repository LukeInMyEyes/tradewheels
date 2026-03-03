'use client';

import { useState } from 'react';

interface FAQAccordionProps {
  question: string;
  answer: string;
}

export default function FAQAccordion({ question, answer }: FAQAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-card rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-surface/50 transition-colors"
      >
        <span className="font-semibold text-text-primary text-sm md:text-base pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-text-muted text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
