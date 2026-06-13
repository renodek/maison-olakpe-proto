'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import StarRating from '@/components/ui/StarRating';
import ProductCard from '@/components/ui/ProductCard';
import useCartStore from '@/context/cart-store';
import { useToast } from '@/context/toast-provider';
import { products, reviews } from '@/data';
import { cn } from '@/lib/utils';
import {
  ShoppingBag,
  Check,
  Minus,
  Plus,
  Leaf,
  MapPin,
  Scale,
  Lightbulb,
  ArrowLeft,
  ChevronRight,
  Flame,
  Award,
  Sparkles,
  Package,
} from 'lucide-react';

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

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = products.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariante, setSelectedVariante] = useState<string | undefined>(
    product?.variantes?.[0]?.options?.[0]
  );
  const [quantite, setQuantite] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const { addToast } = useToast();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <Package className="w-16 h-16 text-sable/30 mx-auto mb-4" />
          <h1 className="font-serif text-3xl text-nuit dark:text-creme mb-4">
            Produit introuvable
          </h1>
          <Link href="/catalogue" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const productReviews = reviews.filter((r) => r.produitId === product.id);
  const relatedProducts = products
    .filter((p) => p.categorie === product.categorie && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantite, selectedVariante);
    setAddedToCart(true);
    addToast(`${product.nom} ajouté au panier !`, 'success');
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const cat = categoryConfig[product.categorie] || categoryConfig.epices;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Fil d'Ariane */}
      <nav className="text-xs text-nuit/50 dark:text-creme/50 mb-8 font-sans flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-or transition-colors">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/catalogue" className="hover:text-or transition-colors">Catalogue</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/catalogue?categorie=${product.categorie}`} className="hover:text-or transition-colors">
          {cat.label}s
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-nuit dark:text-creme font-medium">{product.nom}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Galerie images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-ivoire dark:bg-nuit-light relative">
            <Image
              src={product.images[selectedImage]}
              alt={product.nom}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
              quality={90}
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 active:scale-95 ${
                    i === selectedImage
                      ? 'border-or shadow-md'
                      : 'border-transparent hover:border-sable opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.nom} - vue ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                    quality={75}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Infos produit */}
        <div>
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={cn(
              'text-[10px] font-display font-bold uppercase px-2.5 py-1 rounded-full',
              cat.className
            )}>
              {cat.label}
            </span>
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
                <span key={badge} className="badge badge-artisanal">Artisanal</span>
              );
              return null;
            })}
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-nuit dark:text-creme mb-3 leading-tight">
            {product.nom}
          </h1>

          <div className="flex items-center gap-3 mb-1">
            <StarRating note={product.note} />
            <span className="text-xs text-nuit/40 dark:text-creme/40">
              ({product.nbAvis} avis)
            </span>
          </div>

          {/* Prix */}
          <div className="flex items-baseline gap-3 mt-4 mb-6">
            <span className="font-display font-bold text-3xl text-or">
              {product.prix.toFixed(2)} €
            </span>
            {product.prixBarre && (
              <span className="text-lg text-nuit/30 dark:text-creme/30 line-through">
                {product.prixBarre.toFixed(2)} €
              </span>
            )}
            {product.prixBarre && (
              <span className="badge badge-promo text-xs">
                -{Math.round((1 - product.prix / product.prixBarre) * 100)}%
              </span>
            )}
          </div>

          {/* Stock bas */}
          {product.stock <= 10 && product.stock > 0 && (
            <div className="flex items-center gap-2 mb-4 text-sm text-terre font-display font-bold uppercase animate-pulse">
              <span className="w-2 h-2 bg-terre rounded-full" />
              Plus que {product.stock} en stock !
            </div>
          )}

          {/* Description */}
          <div className="prose prose-sm max-w-none text-nuit/70 dark:text-creme/70 mb-6">
            <p className="leading-relaxed">{product.description}</p>
          </div>

          {/* Variantes */}
          {product.variantes?.map((v) => (
            <div key={v.nom} className="mb-5">
              <h3 className="font-display text-xs uppercase tracking-widest text-nuit/60 dark:text-creme/60 mb-2">
                {v.nom}
              </h3>
              <div className="flex flex-wrap gap-2">
                {v.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedVariante(opt)}
                    className={`px-4 py-2 rounded-lg text-sm font-sans border transition-all hover:scale-[1.03] active:scale-[0.97] ${
                      selectedVariante === opt
                        ? 'border-or bg-or/10 text-or font-bold shadow-sm'
                        : 'border-sable/30 text-nuit/70 dark:text-creme/70 hover:border-or/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantité + Ajout panier */}
          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center border border-sable/30 rounded-lg bg-creme dark:bg-nuit">
              <button
                onClick={() => setQuantite(Math.max(1, quantite - 1))}
                className="w-10 h-10 flex items-center justify-center text-nuit/60 hover:text-or active:scale-90 transition-all"
                aria-label="Diminuer la quantité"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold text-nuit dark:text-creme tabular-nums">
                {quantite}
              </span>
              <button
                onClick={() => setQuantite(Math.min(product.stock, quantite + 1))}
                className="w-10 h-10 flex items-center justify-center text-nuit/60 hover:text-or active:scale-90 transition-all"
                aria-label="Augmenter la quantité"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={cn(
                'btn-primary flex-1 justify-center text-sm hover:scale-[1.02] active:scale-[0.97] transition-transform',
                addedToCart && '!bg-vert !from-vert !to-vert'
              )}
            >
              {addedToCart ? (
                <span className="flex items-center gap-2 animate-fade-in">
                  <Check className="w-5 h-5" /> Ajouté !
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Ajouter au panier – {(product.prix * quantite).toFixed(2)} €
                </span>
              )}
            </button>
          </div>

          {/* Infos complémentaires */}
          <div className="mt-8 space-y-3 p-5 rounded-xl bg-ivoire dark:bg-nuit-light/50 text-sm">
            <div className="flex gap-3 items-start">
              <MapPin className="w-4 h-4 text-or shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-nuit dark:text-creme">Origine : </span>
                <span className="text-nuit/70 dark:text-creme/70">{product.origine}</span>
              </div>
            </div>
            {product.poids && (
              <div className="flex gap-3 items-start">
                <Scale className="w-4 h-4 text-or shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-nuit dark:text-creme">Poids : </span>
                  <span className="text-nuit/70 dark:text-creme/70">{product.poids}</span>
                </div>
              </div>
            )}
            {product.ingredients.length > 0 && (
              <div className="flex gap-3 items-start">
                <Leaf className="w-4 h-4 text-or shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-nuit dark:text-creme">Ingrédients : </span>
                  <span className="text-nuit/70 dark:text-creme/70">
                    {product.ingredients.join(', ')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {product.conseilsUtilisation && (
            <div className="mt-3 p-4 rounded-xl bg-or/5 border border-or/20 text-sm flex gap-3 animate-fade-in">
              <Lightbulb className="w-5 h-5 text-or shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-or">Conseil d&apos;utilisation : </span>
                <span className="text-nuit/70 dark:text-creme/70">
                  {product.conseilsUtilisation}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Avis clients */}
      <ScrollReveal>
        <section className="mt-16 border-t border-sable/20 pt-10">
          <h2 className="font-serif text-2xl font-bold text-nuit dark:text-creme mb-6">
            Avis clients ({productReviews.length})
          </h2>
          {productReviews.length === 0 ? (
            <p className="text-nuit/50 text-sm italic">Aucun avis pour le moment. Soyez le premier !</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {productReviews.map((av) => (
                <div
                  key={av.id}
                  className="p-5 rounded-xl bg-ivoire dark:bg-nuit-light/50 hover:-translate-y-0.5 transition-transform"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-or to-terre flex items-center justify-center text-creme font-serif font-bold text-sm shadow-sm">
                      {av.prenom[0]}
                    </div>
                    <div>
                      <p className="font-sans font-bold text-sm text-nuit dark:text-creme">
                        {av.prenom}
                      </p>
                      <p className="text-[10px] text-nuit/40">{av.date}</p>
                    </div>
                    <StarRating note={av.note} small showCount={false} />
                  </div>
                  <p className="text-sm text-nuit/70 dark:text-creme/70 leading-relaxed">
                    {av.commentaire}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </ScrollReveal>

      {/* Produits similaires */}
      {relatedProducts.length > 0 && (
        <ScrollReveal>
          <section className="mt-16 border-t border-sable/20 pt-10">
            <h2 className="font-serif text-2xl font-bold text-nuit dark:text-creme mb-6">
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}
    </div>
  );
}
