'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { recipes, products } from '@/data';
import { cn } from '@/lib/utils';
import {
  Clock,
  ChefHat,
  UtensilsCrossed,
  Lightbulb,
  ArrowLeft,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';

const difficultyConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  Facile: { label: 'Facile', className: 'badge-new', icon: <UtensilsCrossed className="w-3 h-3" /> },
  Moyen: { label: 'Moyen', className: 'bg-sable text-nuit', icon: <ChefHat className="w-3 h-3" /> },
  Difficile: { label: 'Difficile', className: 'badge-promo', icon: <ChefHat className="w-3 h-3" /> },
};

export default function RecipeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const recette = recipes.find((r) => r.slug === slug);

  if (!recette) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="animate-fade-in">
          <h1 className="font-serif text-3xl text-nuit dark:text-creme mb-4">Recette introuvable</h1>
          <Link href="/recettes" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voir toutes les recettes
          </Link>
        </div>
      </div>
    );
  }

  const linkedProducts = recette.ingredients
    .filter((ing) => ing.produitId)
    .map((ing) => products.find((p) => p.id === ing.produitId))
    .filter(Boolean);

  const diff = difficultyConfig[recette.difficulte] || difficultyConfig.Facile;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-nuit/50 dark:text-creme/50 mb-6 font-sans flex items-center gap-1.5">
        <Link href="/" className="hover:text-rouge transition-colors">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/recettes" className="hover:text-rouge transition-colors">Recettes</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-nuit dark:text-creme font-medium">{recette.titre}</span>
      </nav>

      <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-8 relative animate-fade-in">
        <Image
          src={recette.image}
          alt={recette.titre}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <span className={cn('badge inline-flex items-center gap-1', diff.className)}>
          {diff.icon}
          {diff.label}
        </span>
        <span className="text-sm text-nuit/50 dark:text-creme/50 flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          {recette.duree}
        </span>
      </div>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-nuit dark:text-creme mb-4">
        {recette.titre}
      </h1>

      <p className="text-nuit/70 dark:text-creme/70 text-lg mb-10 leading-relaxed">
        {recette.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="p-6 rounded-xl bg-ivoire dark:bg-nuit-light/50 sticky top-28">
            <h2 className="font-serif font-bold text-xl text-nuit dark:text-creme mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rouge" />
              Ingrédients
            </h2>
            <ul className="space-y-3">
              {recette.ingredients.map((ing, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-nuit/70 dark:text-creme/70">{ing.nom}</span>
                  <span className="font-bold text-nuit dark:text-creme text-right ml-2">
                    {ing.quantite}
                  </span>
                </li>
              ))}
            </ul>

            {linkedProducts.length > 0 && (
              <div className="mt-6 pt-6 border-t border-sable/20">
                <h3 className="font-display text-xs uppercase tracking-widest text-nuit/50 dark:text-creme/50 mb-3">
                  Produits associés
                </h3>
                <div className="space-y-2">
                  {linkedProducts.map((p) =>
                    p ? (
                      <Link
                        key={p.id}
                        href={`/catalogue/${p.slug}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-rouge/5 transition-colors group"
                      >
                        <Image
                          src={p.images[0]}
                          alt={p.nom}
                          width={40}
                          height={40}
                          className="object-cover rounded"
                          quality={70}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-nuit dark:text-creme truncate group-hover:text-rouge transition-colors">
                            {p.nom}
                          </p>
                          <p className="text-xs text-rouge font-bold">
                            {p.prix.toFixed(2)} €
                          </p>
                        </div>
                      </Link>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-serif font-bold text-2xl text-nuit dark:text-creme mb-6">
            Étapes
          </h2>
          <ol className="space-y-6">
            {recette.etapes.map((etape, i) => (
              <li key={i} className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-rouge to-jaune text-creme flex items-center justify-center font-display font-bold text-sm shrink-0 mt-0.5 shadow-sm">
                  {i + 1}
                </span>
                <p className="text-nuit/70 dark:text-creme/70 leading-relaxed pt-1">
                  {etape}
                </p>
              </li>
            ))}
          </ol>

          {recette.astuce && (
            <div className="mt-10 p-6 rounded-xl bg-rouge/5 border border-rouge/20 flex gap-3">
              <Lightbulb className="w-6 h-6 text-rouge shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif font-bold text-lg text-rouge mb-2">
                  Astuce du chef
                </h3>
                <p className="text-nuit/70 dark:text-creme/70 leading-relaxed">
                  {recette.astuce}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
