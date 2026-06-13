'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useCartStore from '@/context/cart-store';
import { useToast } from '@/context/toast-provider';
import { carriers } from '@/data';
import { cn } from '@/lib/utils';
import {
  ShoppingBag,
  Check,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  MapPin,
  Truck,
  CreditCard,
  ShieldCheck,
  User,
  Mail,
  Phone,
  Home,
  Hash,
  Building2,
  Globe,
  Lock,
  BadgeCheck,
  PartyPopper,
} from 'lucide-react';

type Step = 'adresse' | 'livraison' | 'paiement';
type FormErrors = Partial<Record<keyof FormData, string>>;

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  pays: string;
}

const initialForm: FormData = {
  nom: '', prenom: '', email: '', telephone: '',
  adresse: '', codePostal: '', ville: '', pays: 'France',
};

const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
  { key: 'adresse', label: 'Adresse', icon: <MapPin className="w-4 h-4" /> },
  { key: 'livraison', label: 'Livraison', icon: <Truck className="w-4 h-4" /> },
  { key: 'paiement', label: 'Paiement', icon: <CreditCard className="w-4 h-4" /> },
];

function validateForm(form: FormData, step: Step): FormErrors {
  const errors: FormErrors = {};
  if (step === 'adresse') {
    if (!form.nom.trim()) errors.nom = 'Le nom est requis';
    if (!form.prenom.trim()) errors.prenom = 'Le prénom est requis';
    if (!form.email.trim()) errors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Email invalide';
    if (!form.adresse.trim()) errors.adresse = "L'adresse est requise";
    if (!form.codePostal.trim()) errors.codePostal = 'Le code postal est requis';
    else if (!/^\d{5}$/.test(form.codePostal)) errors.codePostal = 'Code postal invalide (5 chiffres)';
    if (!form.ville.trim()) errors.ville = 'La ville est requise';
  }
  return errors;
}

export default function CommandePage() {
  const { items, subtotal, discount, total, totalItems, promoCode, clearCart } = useCartStore();
  const { addToast } = useToast();
  const [step, setStep] = useState<Step>('adresse');
  const [delivery, setDelivery] = useState(5.9);
  const [mounted, setMounted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (touched.size > 0) setErrors(validateForm(form, step));
  }, [form, step, touched]);

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 flex justify-center">
        <div className="loader-pepper" />
      </div>
    );
  }

  if (items.length === 0 && !completed) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <ShoppingBag className="w-20 h-20 text-sable/20 mx-auto mb-4" />
          <h1 className="font-serif text-3xl text-nuit dark:text-creme mb-4">Panier vide</h1>
          <p className="text-nuit/50 dark:text-creme/50 mb-6">Ajoutez des produits avant de passer commande.</p>
          <Link href="/catalogue" className="btn-primary inline-flex items-center gap-2">
            Parcourir le catalogue
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (completed) {
    const orderNumber = `MO-${Date.now().toString(36).toUpperCase()}`;
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="animate-scale-in">
          <div className="w-24 h-24 bg-vert/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <BadgeCheck className="w-12 h-12 text-vert" />
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-nuit dark:text-creme mb-4">
            Commande confirmée !
          </h1>

          <p className="text-nuit/60 dark:text-creme/60 mb-2 text-lg">
            Merci <strong>{form.prenom}</strong> ! Votre commande a bien été enregistrée.
          </p>

          <p className="text-sm text-nuit/40 dark:text-creme/40 mb-8">
            Un email de confirmation sera envoyé à {form.email} (simulation).
          </p>

          <div className="p-6 rounded-xl bg-ivoire dark:bg-nuit-light/50 inline-block mb-8">
            <p className="text-xs text-nuit/50 dark:text-creme/50 mb-1">N° de commande</p>
            <p className="font-display font-bold text-2xl text-or tracking-wider">{orderNumber}</p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-nuit/40 dark:text-creme/40 mb-8">
            <PartyPopper className="w-4 h-4 text-or" />
            L&apos;équipe Maison Olakpé vous remercie pour votre confiance
          </div>

          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  const finalTotal = total() + (promoCode?.type === 'livraison' ? 0 : delivery);

  const updateForm = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setTouched((prev) => new Set(prev).add(field));
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => new Set(prev).add(field));
  };

  const canNext = () => {
    if (step === 'adresse') {
      const errs = validateForm(form, 'adresse');
      setTouched(new Set(['nom', 'prenom', 'email', 'adresse', 'codePostal', 'ville']));
      setErrors(errs);
      return Object.keys(errs).length === 0;
    }
    return true;
  };

  const handleNext = () => {
    if (canNext()) {
      setStep(step === 'adresse' ? 'livraison' : 'paiement');
      setErrors({});
    }
  };

  const handleBack = () => {
    setStep(step === 'livraison' ? 'adresse' : 'livraison');
    setErrors({});
  };

  const handlePay = () => {
    setCompleted(true);
    clearCart();
    addToast('Commande confirmée avec succès ! (simulation)', 'success');
  };

  const stepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-nuit/50 dark:text-creme/50 mb-6 font-sans flex items-center gap-1.5">
        <Link href="/" className="hover:text-or transition-colors">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/panier" className="hover:text-or transition-colors">Panier</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-nuit dark:text-creme font-medium">Commande</span>
      </nav>

      <h1 className="font-serif text-3xl font-bold text-nuit dark:text-creme mb-10 animate-fade-in">
        Finaliser la commande
      </h1>

      {/* Indicateur d'étapes */}
      <div className="flex items-center justify-center mb-10">
        {steps.map((s, i) => {
          const isActive = step === s.key;
          const isCompleted = i < stepIndex;
          return (
            <div key={s.key} className="flex items-center">
              <button
                onClick={() => { if (isCompleted) { setStep(s.key); setErrors({}); } }}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all',
                  isActive && 'bg-or text-creme shadow-lg scale-105',
                  isCompleted && 'bg-vert/10 text-vert cursor-pointer hover:bg-vert/20',
                  !isActive && !isCompleted && 'bg-ivoire dark:bg-nuit-light text-nuit/40 dark:text-creme/40'
                )}
              >
                <span className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs',
                  isActive && 'bg-creme/20',
                  isCompleted && 'bg-vert/20',
                  !isActive && !isCompleted && 'bg-sable/20'
                )}>
                  {isCompleted ? <Check className="w-3 h-3" /> : i + 1}
                </span>
                {s.icon}
                {s.label}
              </button>
              {i < steps.length - 1 && (
                <div className={cn('w-8 h-px mx-2', i < stepIndex ? 'bg-vert/40' : 'bg-sable/30')} />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Étape 1 : Adresse */}
          {step === 'adresse' && (
            <div className="space-y-4 p-6 rounded-xl bg-ivoire dark:bg-nuit-light/50 animate-fade-in">
              <h2 className="font-serif text-xl font-bold text-nuit dark:text-creme mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-or" />
                Adresse de livraison
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Nom *', field: 'nom' as const, type: 'text', icon: User, placeholder: 'Dupont' },
                  { label: 'Prénom *', field: 'prenom' as const, type: 'text', icon: User, placeholder: 'Jean' },
                  { label: 'Email *', field: 'email' as const, type: 'email', icon: Mail, placeholder: 'jean@email.com' },
                  { label: 'Téléphone', field: 'telephone' as const, type: 'tel', icon: Phone, placeholder: '06 12 34 56 78' },
                ].map((f) => (
                  <div key={f.field}>
                    <label className="text-xs font-bold text-nuit/60 dark:text-creme/60 block mb-1.5">{f.label}</label>
                    <div className="relative">
                      <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nuit/30" />
                      <input
                        type={f.type}
                        value={form[f.field]}
                        onChange={(e) => updateForm(f.field, e.target.value)}
                        onBlur={() => handleBlur(f.field)}
                        className={cn(
                          'w-full bg-creme dark:bg-nuit border rounded-lg pl-10 pr-4 py-2.5 text-sm text-nuit dark:text-creme placeholder:text-nuit/30 focus:outline-none focus:ring-1 transition-all',
                          errors[f.field] && touched.has(f.field)
                            ? 'border-bordeaux focus:border-bordeaux focus:ring-bordeaux/30'
                            : 'border-sable/20 focus:border-or focus:ring-or/30'
                        )}
                        placeholder={f.placeholder}
                      />
                    </div>
                    {errors[f.field] && touched.has(f.field) && (
                      <p className="text-[11px] text-bordeaux mt-1 animate-fade-in">{errors[f.field]}</p>
                    )}
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-nuit/60 dark:text-creme/60 block mb-1.5">Adresse *</label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nuit/30" />
                    <input type="text" value={form.adresse} onChange={(e) => updateForm('adresse', e.target.value)} onBlur={() => handleBlur('adresse')}
                      className={cn(
                        'w-full bg-creme dark:bg-nuit border rounded-lg pl-10 pr-4 py-2.5 text-sm text-nuit dark:text-creme placeholder:text-nuit/30 focus:outline-none focus:ring-1 transition-all',
                        errors.adresse && touched.has('adresse') ? 'border-bordeaux focus:border-bordeaux focus:ring-bordeaux/30' : 'border-sable/20 focus:border-or focus:ring-or/30'
                      )} placeholder="15 Rue des Épices" />
                  </div>
                  {errors.adresse && touched.has('adresse') && (
                    <p className="text-[11px] text-bordeaux mt-1 animate-fade-in">{errors.adresse}</p>
                  )}
                </div>

                {[
                  { label: 'Code postal *', field: 'codePostal' as const, icon: Hash, placeholder: '75010' },
                  { label: 'Ville *', field: 'ville' as const, icon: Building2, placeholder: 'Paris' },
                  { label: 'Pays *', field: 'pays' as const, icon: Globe, placeholder: 'France' },
                ].map((f) => (
                  <div key={f.field}>
                    <label className="text-xs font-bold text-nuit/60 dark:text-creme/60 block mb-1.5">{f.label}</label>
                    <div className="relative">
                      <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nuit/30" />
                      <input type="text" value={form[f.field]} onChange={(e) => updateForm(f.field, e.target.value)} onBlur={() => handleBlur(f.field)}
                        className={cn(
                          'w-full bg-creme dark:bg-nuit border rounded-lg pl-10 pr-4 py-2.5 text-sm text-nuit dark:text-creme placeholder:text-nuit/30 focus:outline-none focus:ring-1 transition-all',
                          errors[f.field] && touched.has(f.field) ? 'border-bordeaux focus:border-bordeaux focus:ring-bordeaux/30' : 'border-sable/20 focus:border-or focus:ring-or/30'
                        )} placeholder={f.placeholder} />
                    </div>
                    {errors[f.field] && touched.has(f.field) && (
                      <p className="text-[11px] text-bordeaux mt-1 animate-fade-in">{errors[f.field]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Étape 2 : Livraison */}
          {step === 'livraison' && (
            <div className="space-y-4 p-6 rounded-xl bg-ivoire dark:bg-nuit-light/50 animate-fade-in">
              <h2 className="font-serif text-xl font-bold text-nuit dark:text-creme mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-or" />
                Mode de livraison
              </h2>
              <div className="space-y-3">
                {carriers.map((c) => {
                  const isFree = c.gratuitAuDessusDe && subtotal() >= c.gratuitAuDessusDe;
                  return (
                    <label
                      key={c.id}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]',
                        delivery === c.tarif ? 'border-or bg-or/5 shadow-sm' : 'border-sable/20 hover:border-sable/60'
                      )}
                    >
                      <input type="radio" name="carrier" checked={delivery === c.tarif} onChange={() => setDelivery(c.tarif)} className="accent-or w-4 h-4" />
                      <div className="flex-1">
                        <p className="font-sans font-bold text-nuit dark:text-creme">{c.nom}</p>
                        <p className="text-xs text-nuit/50 dark:text-creme/50">{c.delai}</p>
                      </div>
                      <span className="font-display font-bold text-or">
                        {isFree ? (
                          <span className="text-vert flex items-center gap-1">
                            Gratuit
                            <span className="text-xs line-through text-nuit/30 font-normal">{c.tarif.toFixed(2)} €</span>
                          </span>
                        ) : `${c.tarif.toFixed(2)} €`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Étape 3 : Paiement */}
          {step === 'paiement' && (
            <div className="space-y-4 p-6 rounded-xl bg-ivoire dark:bg-nuit-light/50 animate-fade-in">
              <h2 className="font-serif text-xl font-bold text-nuit dark:text-creme mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-or" />
                Paiement sécurisé
              </h2>

              <div className="p-4 rounded-lg bg-or/5 border border-or/20 text-sm text-nuit/70 dark:text-creme/70 mb-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-or shrink-0 mt-0.5" />
                <div>
                  <strong className="text-or">Simulation :</strong> Aucun paiement réel ne sera effectué. Cette étape est une démonstration du tunnel de commande.
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-nuit/60 dark:text-creme/60 block mb-1.5">Numéro de carte</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nuit/30" />
                    <input type="text" defaultValue="4242 4242 4242 4242"
                      className="w-full bg-creme dark:bg-nuit border border-sable/20 rounded-lg pl-10 pr-4 py-2.5 text-sm font-mono tracking-wider focus:outline-none focus:border-or focus:ring-1 focus:ring-or/30 transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-nuit/60 dark:text-creme/60 block mb-1.5">Expiration</label>
                    <input type="text" defaultValue="12/28"
                      className="w-full bg-creme dark:bg-nuit border border-sable/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-or focus:ring-1 focus:ring-or/30 transition-all" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-nuit/60 dark:text-creme/60 block mb-1.5">CVC</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nuit/30" />
                      <input type="text" defaultValue="123"
                        className="w-full bg-creme dark:bg-nuit border border-sable/20 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-or focus:ring-1 focus:ring-or/30 transition-all" />
                    </div>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs text-nuit/60 dark:text-creme/60 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-or rounded" />
                  Enregistrer cette carte pour vos prochains achats (simulé)
                </label>
              </div>

              <button onClick={handlePay}
                className="btn-primary w-full text-center mt-6 text-base flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.98] transition-transform">
                <Lock className="w-4 h-4" />
                Payer {finalTotal.toFixed(2)} €
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            {step !== 'adresse' ? (
              <button onClick={handleBack} className="btn-ghost inline-flex items-center gap-1 hover:-translate-x-1 active:scale-95 transition-transform">
                <ArrowLeft className="w-4 h-4" />
                Retour
              </button>
            ) : <div />}
            {step !== 'paiement' && (
              <button onClick={handleNext} className="btn-primary inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.97] transition-transform">
                Continuer
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Résumé commande */}
        <div>
          <div className="sticky top-28 p-6 rounded-xl bg-ivoire dark:bg-nuit-light/50 border border-sable/10">
            <h3 className="font-serif font-bold text-nuit dark:text-creme mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-or" />
              Votre commande
            </h3>
            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.variante}`} className="flex gap-2 text-sm">
                  <Image src={item.product.images[0]} alt="" width={40} height={40} className="object-cover rounded shrink-0" quality={60} />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-nuit dark:text-creme text-xs font-medium">{item.product.nom}</p>
                    <p className="text-nuit/50 text-[10px]">x{item.quantite}</p>
                    <p className="text-or font-bold text-xs">{(item.product.prix * item.quantite).toFixed(2)} €</p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="border-sable/20 mb-3" />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-nuit/60 dark:text-creme/60">Sous-total</span><span className="font-bold">{subtotal().toFixed(2)} €</span></div>
              {discount() > 0 && <div className="flex justify-between text-vert"><span>Réduction</span><span>-{discount().toFixed(2)} €</span></div>}
              <div className="flex justify-between"><span className="text-nuit/60 dark:text-creme/60">Livraison</span><span className="font-bold">{promoCode?.type === 'livraison' ? <span className="text-vert">Offerte</span> : `${delivery.toFixed(2)} €`}</span></div>
              <hr className="border-sable/20" />
              <div className="flex justify-between text-base"><span className="font-bold">Total</span><span className="font-display font-bold text-or">{finalTotal.toFixed(2)} €</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
