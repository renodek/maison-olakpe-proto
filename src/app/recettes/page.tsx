'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { recipes } from '@/data';
import { cn } from '@/lib/utils';
import { ArrowRight, Clock, ChefHat, UtensilsCrossed } from 'lucide-react';
import { RecipeGridSkeleton } from '@/components/ui/Skeletons';

const difficultyConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  Facile: { label: 'Facile', className: 'bg-vert/10 text-vert', icon: <UtensilsCrossed className="w-3 h-3" /> },
  Moyen: { label: 'Moyen', className: 'bg-sable/10 text-nuit dark:text-creme', icon: <ChefHat className="w-3 h-3" /> },
  Difficile: { label: 'Difficile', className: 'bg-bordeaux/10 text-bordeaux', icon: <ChefHat className="w-3 h-3" /> },
};

const filters = [
  { key: 'tous', label: 'Toutes' },
  { key: 'epices', label: 'Épices' },
  { key: 'cosmetiques', label: 'Cosmétiques' },
  { key: 'parfums', label: 'Parfums' },
];

function RecipesContent() {
  const [filter, setFilter] = useState('tous');
  const filtered = filter === 'tous' ? recipes : recipes.filter((r) => r.categorie === filter);

  return (
    <>
      <nav className="text-xs text-nuit/50 dark:text-creme/50 mb-6 font-sans flex items-center gap-1.5">
        <Link href="/" className="hover:text-rouge transition-colors">Accueil</Link>
        <span>/</span>
        <span className="text-nuit dark:text-creme font-medium">Recettes</span>
      </nav>

      <div className="text-center mb-12 animate-fade-in">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-nuit dark:text-creme mb-3">
          Nos Recettes Maison
        </h1>
        <p className="text-nuit/60 dark:text-creme/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Sublimez nos épices et produits à travers des recettes authentiques, créatives et accessibles.
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95',
              filter === f.key
                ? 'bg-rouge text-blanc shadow-md'
                : 'bg-ivoire dark:bg-nuit-light text-nuit/60 dark:text-creme/60 hover:bg-sable/20'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((recette) => {
          const diff = difficultyConfig[recette.difficulte] || difficultyConfig.Facile;
          return (
            <div key={recette.id} className="animate-fade-in">
              <Link
                href={`/recettes/${recette.slug}`}
                className="card card-hover block overflow-hidden group h-full"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={recette.image}
                    alt={recette.titre}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nuit/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn(
                      'text-[10px] font-display font-bold uppercase px-2 py-0.5 rounded-full inline-flex items-center gap-1',
                      diff.className
                    )}>
                      {diff.icon}
                      {diff.label}
                    </span>
                    <span className="text-xs text-nuit/40 dark:text-creme/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {recette.duree}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-nuit dark:text-creme mb-2 group-hover:text-rouge transition-colors">
                    {recette.titre}
                  </h3>
                  <p className="text-xs text-nuit/50 dark:text-creme/50 line-clamp-2 leading-relaxed">
                    {recette.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-rouge text-xs font-bold mt-3 group-hover:gap-2 transition-all">
                    Voir la recette
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function RecipesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Suspense fallback={<RecipeGridSkeleton count={6} />}>
        <RecipesContent />
      </Suspense>
    </div>
  );
}
