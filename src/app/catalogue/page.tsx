'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { products, categories } from '@/data';
import { Search, SlidersHorizontal, X, ChevronDown, Package } from 'lucide-react';
import { ProductGridSkeleton } from '@/components/ui/Skeletons';

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('categorie') || 'tous';

  const [categorieActive, setCategorieActive] = useState(initialCat);
  const [tri, setTri] = useState('default');
  const [prixRange, setPrixRange] = useState<[number, number]>([0, 150]);
  const [search, setSearch] = useState('');
  const [mobileFilter, setMobileFilter] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];
    if (categorieActive !== 'tous') {
      result = result.filter((p) => p.categorie === categorieActive);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.nom.toLowerCase().includes(q) ||
          p.descriptionCourte.toLowerCase().includes(q)
      );
    }
    result = result.filter((p) => p.prix >= prixRange[0] && p.prix <= prixRange[1]);
    switch (tri) {
      case 'prix-asc':
        result.sort((a, b) => a.prix - b.prix);
        break;
      case 'prix-desc':
        result.sort((a, b) => b.prix - a.prix);
        break;
      case 'note':
        result.sort((a, b) => b.note - a.note);
        break;
      case 'nouveau':
        result.sort(
          (a, b) =>
            (b.badges.includes('nouveau') ? 1 : 0) -
            (a.badges.includes('nouveau') ? 1 : 0)
        );
        break;
    }
    return result;
  }, [categorieActive, tri, prixRange, search]);

  const filterCategories = [
    { slug: 'tous', nom: 'Tous' },
    ...categories.map((c) => ({ slug: c.slug, nom: c.nom })),
  ];

  return (
    <>
      {/* Fil d'Ariane */}
      <nav className="text-xs text-nuit/50 dark:text-creme/50 mb-6 font-sans flex items-center gap-1.5">
        <Link href="/" className="hover:text-rouge transition-colors">Accueil</Link>
        <span>/</span>
        <span className="text-nuit dark:text-creme font-medium">Catalogue</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28 space-y-6">
            {/* Recherche */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nuit/40" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-ivoire dark:bg-nuit-light border border-sable/20 rounded-lg pl-10 pr-4 py-2.5 text-sm text-nuit dark:text-creme placeholder:text-nuit/30 focus:outline-none focus:border-rouge focus:ring-1 focus:ring-or/30 transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-nuit/30 hover:text-nuit/60"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Catégories */}
            <div>
              <h3 className="font-display text-xs uppercase tracking-widest text-nuit/60 dark:text-creme/60 mb-3">
                Catégories
              </h3>
              <div className="space-y-1">
                {filterCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setCategorieActive(cat.slug)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all active:scale-[0.98] ${
                      categorieActive === cat.slug
                        ? 'bg-rouge/10 text-rouge font-bold'
                        : 'text-nuit/70 dark:text-creme/70 hover:bg-ivoire dark:hover:bg-nuit-light'
                    }`}
                  >
                    {cat.nom}
                  </button>
                ))}
              </div>
            </div>

            {/* Prix */}
            <div>
              <h3 className="font-display text-xs uppercase tracking-widest text-nuit/60 dark:text-creme/60 mb-3">
                Prix max
              </h3>
              <input
                type="range"
                min={0}
                max={150}
                step={5}
                value={prixRange[1]}
                onChange={(e) => setPrixRange([0, Number(e.target.value)])}
                className="w-full accent-rouge"
              />
              <div className="flex justify-between text-xs text-nuit/50 dark:text-creme/50 mt-1">
                <span>0 €</span>
                <span className="font-bold text-jaune">{prixRange[1]} €</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Zone principale */}
        <div className="flex-1 min-w-0">
          {/* En-tête */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="font-serif text-3xl font-bold text-nuit dark:text-creme">
                Catalogue
              </h1>
              <p className="text-sm text-nuit/50 dark:text-creme/50 mt-1">
                {filtered.length} produit{filtered.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilter(!mobileFilter)}
                className="lg:hidden btn-ghost text-rouge border border-sable/20 inline-flex items-center gap-1.5 active:scale-95 transition-transform"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtrer
              </button>
              <div className="relative">
                <select
                  value={tri}
                  onChange={(e) => setTri(e.target.value)}
                  className="appearance-none bg-ivoire dark:bg-nuit-light border border-sable/20 rounded-lg pl-3 pr-8 py-2 text-sm text-nuit dark:text-creme focus:outline-none focus:border-rouge cursor-pointer"
                >
                  <option value="default">Tri par défaut</option>
                  <option value="prix-asc">Prix croissant</option>
                  <option value="prix-desc">Prix décroissant</option>
                  <option value="note">Meilleures notes</option>
                  <option value="nouveau">Nouveautés</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-nuit/40 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filtres mobile */}
          {mobileFilter && (
            <div className="lg:hidden mb-6 p-4 rounded-xl bg-ivoire dark:bg-nuit-light space-y-4 animate-slide-down">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nuit/40" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-creme dark:bg-nuit border border-sable/20 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-rouge"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {filterCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setCategorieActive(cat.slug);
                      setMobileFilter(false);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95 ${
                      categorieActive === cat.slug
                        ? 'bg-rouge text-blanc'
                        : 'bg-creme dark:bg-nuit text-nuit/70 border border-sable/20'
                    }`}
                  >
                    {cat.nom}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pills catégories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filterCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setCategorieActive(cat.slug)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 ${
                  categorieActive === cat.slug
                    ? 'bg-rouge text-blanc shadow-md'
                    : 'bg-ivoire dark:bg-nuit-light text-nuit/60 dark:text-creme/60 hover:bg-sable/20'
                }`}
              >
                {cat.nom}
              </button>
            ))}
          </div>

          {/* Résultats */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <Package className="w-16 h-16 text-sable/30 mx-auto mb-4" />
              <h3 className="font-serif text-xl text-nuit dark:text-creme mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-nuit/50 dark:text-creme/50 text-sm">
                Essayez de modifier vos filtres ou votre recherche.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => (
                <div key={product.id} className="animate-fade-in">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function CataloguePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Suspense
        fallback={
          <div className="space-y-8">
            <div className="h-4 w-48 skeleton" />
            <div className="flex justify-between">
              <div className="h-8 w-40 skeleton" />
              <div className="h-10 w-32 skeleton rounded-lg" />
            </div>
            <ProductGridSkeleton count={6} />
          </div>
        }
      >
        <CatalogueContent />
      </Suspense>
    </div>
  );
}
