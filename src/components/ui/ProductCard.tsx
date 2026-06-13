'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/types';
import useCartStore from '@/context/cart-store';
import { useToast } from '@/context/toast-provider';
import { cn } from '@/lib/utils';
import StarRating from './StarRating';
import { Plus, Leaf, Flame, Award, Sparkles } from 'lucide-react';

const categoryConfig: Record<string, { label: string; className: string }> = {
  epices: { label: 'Épice', className: 'bg-vert/10 text-vert' },
  parfums: { label: 'Parfum', className: 'bg-violet/10 text-violet' },
  cosmetiques: { label: 'Cosmétique', className: 'bg-bordeaux/10 text-bordeaux' },
  huiles: { label: 'Huile', className: 'bg-terre/10 text-terre' },
  cremes: { label: 'Crème', className: 'bg-sable/10 text-nuit' },
};

const badgeIcons: Record<string, React.ReactNode> = {
  nouveau: <Sparkles className="w-3 h-3" />,
  promo: <Flame className="w-3 h-3" />,
  'best-seller': <Award className="w-3 h-3" />,
  bio: <Leaf className="w-3 h-3" />,
};

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const { addToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.variantes?.[0]?.options?.[0]);
    addToast(`${product.nom} ajouté au panier !`, 'success');
  };

  const cat = categoryConfig[product.categorie] || categoryConfig.epices;
  const isLowStock = product.stock <= 10 && product.stock > 0;

  return (
    <Link href={`/catalogue/${product.slug}`} className="block group">
      <div className="card card-hover overflow-hidden h-full flex flex-col group-hover:-translate-y-1 transition-transform">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-ivoire dark:bg-nuit-light">
          <Image
            src={product.images[0]}
            alt={product.nom}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            quality={85}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badges.map((badge) => {
              if (badge === 'nouveau') return (
                <span key={badge} className="badge badge-new flex items-center gap-1">
                  {badgeIcons[badge]} Nouveau
                </span>
              );
              if (badge === 'promo') return (
                <span key={badge} className="badge badge-promo flex items-center gap-1">
                  {badgeIcons[badge]} Promo
                </span>
              );
              if (badge === 'best-seller') return (
                <span key={badge} className="badge badge-best-seller flex items-center gap-1">
                  {badgeIcons[badge]} Best-seller
                </span>
              );
              if (badge === 'bio') return (
                <span key={badge} className="badge badge-bio flex items-center gap-1">
                  {badgeIcons[badge]} Bio
                </span>
              );
              if (badge === 'artisanal') return (
                <span key={badge} className="badge badge-artisanal flex items-center gap-1">
                  Artisanal
                </span>
              );
              return null;
            })}
          </div>

          {/* Bouton ajout panier */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 w-10 h-10 bg-creme/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-or hover:text-creme hover:scale-110 active:scale-90 text-or"
            aria-label={`Ajouter ${product.nom} au panier`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-4 flex flex-col flex-1">
          {/* Catégorie */}
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              'text-[10px] font-display font-bold uppercase px-2 py-0.5 rounded-full',
              cat.className
            )}>
              {cat.label}
            </span>
          </div>

          {/* Nom */}
          <h3 className="font-sans font-bold text-nuit dark:text-creme text-sm mb-1 line-clamp-2 group-hover:text-or transition-colors">
            {product.nom}
          </h3>

          {/* Description courte */}
          <p className="text-xs text-nuit/50 dark:text-creme/50 line-clamp-2 mb-3 flex-1">
            {product.descriptionCourte}
          </p>

          {/* Note */}
          <StarRating note={product.note} small />

          {/* Prix + stock */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-sable/10">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-lg text-or">
                {product.prix.toFixed(2)} €
              </span>
              {product.prixBarre && (
                <span className="text-xs text-nuit/40 dark:text-creme/40 line-through">
                  {product.prixBarre.toFixed(2)} €
                </span>
              )}
            </div>
            {isLowStock && (
              <span className="text-[10px] font-display font-bold text-terre uppercase animate-pulse">
                + que {product.stock} !
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
