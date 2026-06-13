'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useCartStore from '@/context/cart-store';
import { promoCodes, carriers } from '@/data';
import { cn } from '@/lib/utils';
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Truck,
  ArrowRight,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    total,
    totalItems,
    applyPromo,
    removePromo,
    promoCode,
  } = useCartStore();

  const [codeInput, setCodeInput] = useState('');
  const [codeMsg, setCodeMsg] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [delivery, setDelivery] = useState(5.9);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 flex justify-center">
        <div className="loader-pepper" />
      </div>
    );
  }

  const handleApplyCode = () => {
    const found = promoCodes.find((p) => p.code === codeInput.toUpperCase().trim());
    if (found && found.actif) {
      applyPromo(found);
      setCodeMsg(`Code "${found.code}" appliqué : ${found.labelAffiché}`);
      setCodeError(false);
    } else {
      removePromo();
      setCodeMsg('Code invalide ou expiré.');
      setCodeError(true);
    }
  };

  const finalTotal = total() + (promoCode?.type === 'livraison' ? 0 : delivery);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-nuit/50 dark:text-creme/50 mb-6 font-sans flex items-center gap-1.5">
        <Link href="/" className="hover:text-or transition-colors">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-nuit dark:text-creme font-medium">Panier</span>
      </nav>

      <h1 className="font-serif text-3xl font-bold text-nuit dark:text-creme mb-8 flex items-center gap-2 animate-fade-in">
        <ShoppingBag className="w-7 h-7 text-or" />
        Mon Panier
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <ShoppingBag className="w-20 h-20 text-sable/20 mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-nuit dark:text-creme mb-3">
            Votre panier est vide
          </h2>
          <p className="text-nuit/50 dark:text-creme/50 mb-6">
            Découvrez nos épices, parfums et cosmétiques artisanaux.
          </p>
          <Link href="/catalogue" className="btn-primary inline-flex items-center gap-2">
            Parcourir le catalogue
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.variante || ''}`}
                className="flex gap-4 p-4 rounded-xl bg-ivoire dark:bg-nuit-light/50 border border-sable/10 animate-fade-in"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.nom}
                  width={96}
                  height={96}
                  className="object-cover rounded-lg shrink-0"
                  quality={80}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-sans font-bold text-nuit dark:text-creme">
                        {item.product.nom}
                      </h3>
                      {item.variante && (
                        <p className="text-xs text-nuit/50 dark:text-creme/50">{item.variante}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1.5 text-nuit/30 hover:text-bordeaux transition-colors shrink-0 rounded-lg hover:bg-bordeaux/5 hover:scale-110 active:scale-90"
                      aria-label={`Supprimer ${item.product.nom}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-sable/30 rounded-lg bg-creme dark:bg-nuit">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantite - 1)}
                        className="w-8 h-8 flex items-center justify-center text-sm hover:text-or active:scale-90 transition-all"
                        aria-label="Diminuer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold tabular-nums">
                        {item.quantite}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantite + 1)}
                        className="w-8 h-8 flex items-center justify-center text-sm hover:text-or active:scale-90 transition-all"
                        aria-label="Augmenter"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-display font-bold text-or">
                      {(item.product.prix * item.quantite).toFixed(2)} €
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/catalogue"
              className="inline-flex items-center gap-1 text-sm text-nuit/50 dark:text-creme/50 hover:text-or transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Continuer mes achats
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4 p-6 rounded-xl bg-ivoire dark:bg-nuit-light/50 border border-sable/10">
              <h2 className="font-serif text-xl font-bold text-nuit dark:text-creme">
                Récapitulatif
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-nuit/60 dark:text-creme/60">
                    Articles ({totalItems()})
                  </span>
                  <span className="font-bold">{subtotal().toFixed(2)} €</span>
                </div>
                {discount() > 0 && (
                  <div className="flex justify-between text-vert">
                    <span>Réduction</span>
                    <span>-{discount().toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-nuit/60 dark:text-creme/60 flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    Livraison
                  </span>
                  <span className="font-bold">
                    {promoCode?.type === 'livraison' ? (
                      <span className="text-vert">
                        Offerte
                        <span className="text-xs line-through text-nuit/40 ml-1">
                          {delivery.toFixed(2)} €
                        </span>
                      </span>
                    ) : (
                      `${delivery.toFixed(2)} €`
                    )}
                  </span>
                </div>
                <hr className="border-sable/20" />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-display font-bold text-or">
                    {finalTotal.toFixed(2)} €
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-nuit/60 dark:text-creme/60 block mb-1.5 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Code promo
                </label>
                <div className="flex gap-2">
                  <input
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    placeholder="ex: BIENVENUE10"
                    className="flex-1 bg-creme dark:bg-nuit border border-sable/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-or focus:ring-1 focus:ring-or/30 transition-all"
                  />
                  <button
                    onClick={handleApplyCode}
                    className="px-3 py-2 bg-sable text-nuit rounded-lg text-xs font-bold hover:bg-or hover:text-creme hover:scale-105 active:scale-95 transition-all"
                  >
                    Appliquer
                  </button>
                </div>
                {codeMsg && (
                  <p className={cn('text-xs mt-1.5', codeError ? 'text-bordeaux' : 'text-vert')}>
                    {codeMsg}
                  </p>
                )}
                {promoCode && (
                  <button
                    onClick={() => { removePromo(); setCodeInput(''); setCodeMsg(''); }}
                    className="text-xs text-nuit/50 hover:text-bordeaux mt-1 underline transition-colors"
                  >
                    Retirer le code
                  </button>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-nuit/60 dark:text-creme/60 block mb-1.5">
                  Mode de livraison
                </label>
                <select
                  value={delivery}
                  onChange={(e) => setDelivery(Number(e.target.value))}
                  className="w-full bg-creme dark:bg-nuit border border-sable/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-or cursor-pointer"
                >
                  {carriers.map((c) => (
                    <option key={c.id} value={c.tarif}>
                      {c.nom} – {c.delai} ({c.tarif.toFixed(2)} €)
                    </option>
                  ))}
                </select>
              </div>

              <Link
                href="/commande"
                className="btn-primary w-full text-center flex items-center justify-center gap-2"
              >
                Passer la commande
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
