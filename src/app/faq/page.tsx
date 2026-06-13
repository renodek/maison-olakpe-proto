'use client';

import { useState } from 'react';
import Link from 'next/link';
import { faqItems } from '@/data';
import { ChevronDown, HelpCircle, MessageCircle, ChevronRight } from 'lucide-react';

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-nuit/50 dark:text-creme/50 mb-6 font-sans flex items-center gap-1.5">
        <Link href="/" className="hover:text-rouge transition-colors">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-nuit dark:text-creme font-medium">FAQ</span>
      </nav>

      <div className="animate-fade-in">
        <h1 className="font-serif text-3xl font-bold text-nuit dark:text-creme mb-2 flex items-center gap-2">
          <HelpCircle className="w-7 h-7 text-rouge" />
          Foire aux Questions
        </h1>
        <p className="text-nuit/60 dark:text-creme/60 mb-10">
          Tout ce que vous devez savoir sur Maison Olakpé.
        </p>
      </div>

      <div className="space-y-3">
        {faqItems.map((item) => (
          <div key={item.id} className="border border-sable/20 rounded-xl overflow-hidden bg-creme dark:bg-nuit">
            <button
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-ivoire dark:hover:bg-nuit-light/50 transition-colors active:scale-[0.995]"
              aria-expanded={openId === item.id}
            >
              <span className="font-sans font-bold text-sm text-nuit dark:text-creme pr-4">
                {item.question}
              </span>
              <span className={`text-rouge shrink-0 transition-transform duration-200 ${openId === item.id ? 'rotate-180' : ''}`}>
                <ChevronDown className="w-5 h-5" />
              </span>
            </button>
            {openId === item.id && (
              <div className="px-5 pb-5 animate-slide-down">
                <div className="pt-1 border-t border-sable/10">
                  <p className="text-sm text-nuit/70 dark:text-creme/70 leading-relaxed pt-4">
                    {item.reponse}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-xl bg-ivoire dark:bg-nuit-light/50 text-center">
        <MessageCircle className="w-8 h-8 text-rouge/40 mx-auto mb-3" />
        <p className="text-nuit/70 dark:text-creme/70 text-sm mb-4">
          Vous n&apos;avez pas trouvé votre réponse ?
        </p>
        <Link href="/contact" className="btn-primary text-sm inline-flex items-center gap-2">
          Contactez-nous
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
