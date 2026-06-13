'use client';

import Link from 'next/link';
import Image from 'next/image';
import useCartStore from '@/context/cart-store';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, subtotal } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] bg-nuit/50 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-creme dark:bg-nuit shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sable/20">
          <h2 className="font-serif text-xl font-bold text-nuit dark:text-creme flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rouge" />
            Mon Panier ({totalItems()})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-ivoire dark:hover:bg-nuit-light hover:scale-110 active:scale-90 transition-all text-nuit/60 dark:text-creme/60"
            aria-label="Fermer le panier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-sable/30 mb-4" />
              <p className="text-nuit/60 dark:text-creme/60 font-sans mb-4">Votre panier est vide</p>
              <button onClick={closeCart} className="btn-primary text-xs">
                Découvrir nos produits
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.variante || 'def'}`}
                  className="flex gap-3 p-3 rounded-lg bg-ivoire/50 dark:bg-nuit-light/50 border border-sable/10"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.nom}
                    width={80}
                    height={80}
                    className="object-cover rounded-lg shrink-0"
                    quality={80}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans font-bold text-sm text-nuit dark:text-creme truncate">
                      {item.product.nom}
                    </h3>
                    {item.variante && (
                      <p className="text-xs text-nuit/50 dark:text-creme/50">{item.variante}</p>
                    )}
                    <p className="text-rouge font-bold text-sm mt-1">
                      {item.product.prix.toFixed(2)} €
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantite - 1)}
                        className="w-7 h-7 rounded border border-sable/30 flex items-center justify-center text-sm hover:bg-rouge hover:text-creme hover:border-rouge hover:scale-110 active:scale-90 transition-all"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold tabular-nums">
                        {item.quantite}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantite + 1)}
                        className="w-7 h-7 rounded border border-sable/30 flex items-center justify-center text-sm hover:bg-rouge hover:text-creme hover:border-rouge hover:scale-110 active:scale-90 transition-all"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto p-1 text-nuit/30 dark:text-creme/30 hover:text-bordeaux hover:scale-110 active:scale-90 transition-all"
                        aria-label={`Supprimer ${item.product.nom}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sable/20 p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-nuit/60 dark:text-creme/60">Sous-total</span>
              <span className="font-bold text-nuit dark:text-creme">
                {subtotal().toFixed(2)} €
              </span>
            </div>
            <p className="text-xs text-nuit/40 dark:text-creme/40">
              Livraison calculée à la prochaine étape
            </p>
            <Link
              href="/panier"
              onClick={closeCart}
              className="btn-primary w-full text-center text-sm"
            >
              Voir le panier
            </Link>
            <Link
              href="/commande"
              onClick={closeCart}
              className="btn-secondary w-full text-center text-sm"
            >
              Commander
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
