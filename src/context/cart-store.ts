'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, PromoCode } from '@/data/types';

export interface CartItem {
  product: Product;
  quantite: number;
  variante?: string;
}

interface CartState {
  items: CartItem[];
  promoCode: PromoCode | null;
  isOpen: boolean;
  hydrated: boolean;
  
  setHydrated: () => void;
  addItem: (product: Product, quantite?: number, variante?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantite: number) => void;
  clearCart: () => void;
  applyPromo: (code: PromoCode) => boolean;
  removePromo: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  
  totalItems: () => number;
  subtotal: () => number;
  discount: () => number;
  total: () => number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      isOpen: false,
      hydrated: false,

      setHydrated: () => set({ hydrated: true }),

      addItem: (product, quantite = 1, variante) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.id === product.id && item.variante === variante
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id && item.variante === variante
                  ? { ...item, quantite: item.quantite + quantite }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantite, variante }] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantite) => {
        if (quantite <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantite } : item
          ),
        }));
      },

      clearCart: () => set({ items: [], promoCode: null }),

      applyPromo: (code) => {
        set({ promoCode: code });
        return true;
      },

      removePromo: () => set({ promoCode: null }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantite, 0),
      
      subtotal: () =>
        get().items.reduce((sum, item) => {
          return sum + item.product.prix * item.quantite;
        }, 0),

      discount: () => {
        const { promoCode, subtotal } = get();
        if (!promoCode || !promoCode.actif) return 0;
        if (promoCode.type === 'pourcentage') {
          return (subtotal() * promoCode.valeur) / 100;
        }
        return 0;
      },

      total: () => {
        return get().subtotal() - get().discount();
      },
    }),
    {
      name: 'maison-olakpe-cart',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
      }),
    }
  )
);

export default useCartStore;
