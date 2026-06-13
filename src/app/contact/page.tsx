'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/context/toast-provider';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useToast();
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Message envoyé avec succès ! Nous vous répondrons dans les 24h (simulation).', 'success');
    setSubmitted(true);
    setForm({ nom: '', email: '', sujet: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const coordonnees = [
    { icon: MapPin, label: 'Adresse', value: '15 Rue des Épices, 75010 Paris, France' },
    { icon: Phone, label: 'Téléphone', value: '+33 (0)1 23 45 67 89' },
    { icon: Mail, label: 'Email', value: 'contact@maisonolakpe.com' },
    { icon: Clock, label: 'Horaires', value: 'Lun-Ven : 9h-18h / Sam : 10h-16h' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-nuit/50 dark:text-creme/50 mb-6 font-sans flex items-center gap-1.5">
        <Link href="/" className="hover:text-rouge transition-colors">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-nuit dark:text-creme font-medium">Contact</span>
      </nav>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-nuit dark:text-creme mb-8 animate-fade-in">
        Contactez-nous
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="text-nuit/70 dark:text-creme/70 mb-8 leading-relaxed">
            Une question sur nos produits, une commande, un partenariat ? N&apos;hésitez pas
            à nous écrire. Notre équipe vous répondra dans les meilleurs délais.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-nuit/60 dark:text-creme/60 block mb-1.5">Nom *</label>
                <input type="text" value={form.nom} onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))} required
                  className="w-full bg-ivoire dark:bg-nuit-light border border-sable/20 rounded-lg px-3 py-2.5 text-sm text-nuit dark:text-creme placeholder:text-nuit/30 focus:outline-none focus:border-rouge focus:ring-1 focus:ring-or/30 transition-all" placeholder="Votre nom" />
              </div>
              <div>
                <label className="text-xs font-bold text-nuit/60 dark:text-creme/60 block mb-1.5">Email *</label>
                <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required
                  className="w-full bg-ivoire dark:bg-nuit-light border border-sable/20 rounded-lg px-3 py-2.5 text-sm text-nuit dark:text-creme placeholder:text-nuit/30 focus:outline-none focus:border-rouge focus:ring-1 focus:ring-or/30 transition-all" placeholder="votre@email.com" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-nuit/60 dark:text-creme/60 block mb-1.5">Sujet</label>
              <input type="text" value={form.sujet} onChange={(e) => setForm((f) => ({ ...f, sujet: e.target.value }))}
                className="w-full bg-ivoire dark:bg-nuit-light border border-sable/20 rounded-lg px-3 py-2.5 text-sm text-nuit dark:text-creme placeholder:text-nuit/30 focus:outline-none focus:border-rouge focus:ring-1 focus:ring-or/30 transition-all" placeholder="Sujet de votre message" />
            </div>
            <div>
              <label className="text-xs font-bold text-nuit/60 dark:text-creme/60 block mb-1.5">Message *</label>
              <textarea rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} required
                className="w-full bg-ivoire dark:bg-nuit-light border border-sable/20 rounded-lg px-3 py-2.5 text-sm text-nuit dark:text-creme placeholder:text-nuit/30 focus:outline-none focus:border-rouge focus:ring-1 focus:ring-or/30 transition-all resize-none" placeholder="Votre message..." />
            </div>
            <button type="submit" className="btn-primary inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.97] transition-transform">
              {submitted ? (
                <>
                  <span className="w-5 h-5 bg-creme/20 rounded-full flex items-center justify-center">✓</span>
                  Envoyé !
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Envoyer le message
                </>
              )}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-ivoire dark:bg-nuit-light/50">
            <h3 className="font-serif font-bold text-lg text-nuit dark:text-creme mb-5 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-rouge" />
              Nos coordonnées
            </h3>
            <div className="space-y-4">
              {coordonnees.map((item, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <item.icon className="w-5 h-5 text-rouge shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-nuit/50 dark:text-creme/50 mb-0.5">{item.label}</p>
                    <p className="text-nuit/70 dark:text-creme/70 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-ivoire dark:bg-nuit-light flex items-center justify-center border border-sable/10">
            <div className="text-center text-nuit/30 dark:text-creme/30">
              <MapPin className="w-10 h-10 mx-auto mb-2" />
              <p className="text-xs">Carte interactive</p>
              <p className="text-[10px]">Intégration dans la version finale</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
