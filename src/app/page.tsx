'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import ProductCard from '@/components/ui/ProductCard';
import StarRating from '@/components/ui/StarRating';
import { products, testimonials, categories } from '@/data';
import {
  ArrowRight,
  Sparkles,
  Leaf,
  HandHeart,
  Truck,
  Quote,
} from 'lucide-react';

const heroSlides = [
  {
    image: '/images/epices-hero.jpg',
    title: "L'Excellence des Épices",
    subtitle: 'Des trésors gustatifs sélectionnés aux quatre coins du monde',
    cta: 'Découvrir nos épices',
    link: '/catalogue?categorie=epices',
    accent: 'from-vert/40',
  },
  {
    image: '/images/parfums-hero.jpg',
    title: "Parfums d'Exception",
    subtitle: 'Des fragrances orientales qui racontent une histoire',
    cta: 'Voir les parfums',
    link: '/catalogue?categorie=parfums',
    accent: 'from-violet/40',
  },
  {
    image: '/images/cosmetiques-hero.jpg',
    title: 'Cosmétiques au Naturel',
    subtitle: "L'alliance des traditions ancestrales et de la science moderne",
    cta: 'Voir les cosmétiques',
    link: '/catalogue?categorie=cosmetiques',
    accent: 'from-terre/40',
  },
];

const features = [
  { icon: Leaf, title: '100% Naturel', desc: 'Sans additifs ni conservateurs artificiels, des produits purs et authentiques.' },
  { icon: HandHeart, title: 'Commerce Équitable', desc: 'Partenariats directs avec les producteurs locaux, rémunération juste.' },
  { icon: Truck, title: 'Livraison Offerte', desc: "Dès 50€ d'achat en France métropolitaine, expédition sous 48h." },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [mounted, nextSlide]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="loader-pepper" />
      </div>
    );
  }

  const featuredProducts = products.filter((p) => p.badges.includes('best-seller')).slice(0, 4);
  const newProducts = products.filter((p) => p.badges.includes('nouveau')).slice(0, 4);

  return (
    <>
      {/* ============ HERO SLIDER ============ */}
      <section className="relative h-[75vh] min-h-[550px] max-h-[850px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ${
              i === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
              quality={90}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent} to-nuit/70`} />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-creme mb-4 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-creme/80 text-base sm:text-lg mb-8 leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Link
                href={heroSlides[currentSlide].link}
                className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2 group"
              >
                {heroSlides[currentSlide].cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`relative h-2 rounded-full transition-all duration-500 ${
                i === currentSlide ? 'w-10 bg-or' : 'w-2 bg-creme/40 hover:bg-creme/70'
              }`}
              aria-label={`Diapositive ${i + 1}`}
              aria-current={i === currentSlide ? 'true' : 'false'}
            />
          ))}
        </div>
      </section>

      {/* ============ COLLECTIONS ============ */}
      <ScrollReveal>
        <section className="py-20 bg-ivoire dark:bg-nuit-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="section-title">Nos Collections</h2>
              <p className="section-subtitle">Trois univers, une même exigence de qualité</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {categories
                .filter((c) => !c.parentId)
                .map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/catalogue?categorie=${cat.slug}`}
                    className="group relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.nom}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-nuit/95 via-nuit/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-creme mb-2">
                        {cat.nom}
                      </h3>
                      <p className="text-creme/70 text-sm mb-4 max-w-xs">{cat.description}</p>
                      <span className="inline-flex items-center gap-1 text-or font-display text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                        Explorer
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ BEST-SELLERS ============ */}
      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="section-title">Nos Best-Sellers</h2>
                <p className="section-subtitle mb-0">Les incontournables plébiscités par nos clients</p>
              </div>
              <Link
                href="/catalogue"
                className="hidden sm:inline-flex items-center gap-1 btn-ghost text-or font-display font-bold uppercase text-sm tracking-wider group"
              >
                Tout le catalogue
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ PROMO BANNER ============ */}
      <ScrollReveal>
        <section className="py-16 bg-gradient-to-r from-or via-or-dark to-terre relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-20" />
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-creme/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-creme/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-creme text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                  -10% sur votre première commande
                </h2>
                <p className="text-creme/80 text-lg">
                  Code{' '}
                  <strong className="font-display bg-creme/20 px-3 py-1 rounded-lg tracking-wider">
                    BIENVENUE10
                  </strong>{' '}
                  – valable sur tout le catalogue
                </p>
              </div>
              <Link
                href="/catalogue"
                className="btn-primary bg-creme text-terre hover:bg-ivoire hover:text-terre-dark text-lg px-10 py-4 shadow-xl inline-flex items-center gap-2"
              >
                J&apos;en profite
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ NOUVEAUTÉS ============ */}
      <ScrollReveal>
        <section className="py-20 bg-ivoire dark:bg-nuit-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title inline-flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-or" />
                Nouveautés
              </h2>
              <p className="section-subtitle">Les dernières pépites de nos artisans</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ TÉMOIGNAGES ============ */}
      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="section-title">Ce qu&apos;ils disent de nous</h2>
              <p className="section-subtitle">La satisfaction de nos clients est notre plus belle récompense</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="card p-6 relative hover:-translate-y-1 transition-transform">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-or/15" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-or to-terre flex items-center justify-center text-creme font-serif font-bold text-lg shadow-md">
                      {t.prenom[0]}
                    </div>
                    <div>
                      <p className="font-sans font-bold text-nuit dark:text-creme">{t.prenom}</p>
                      <p className="text-xs text-nuit/50 dark:text-creme/50">{t.ville}</p>
                    </div>
                    <StarRating note={t.note} small showCount={false} />
                  </div>
                  <p className="text-sm text-nuit/70 dark:text-creme/70 italic leading-relaxed">
                    &ldquo;{t.commentaire}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ RECETTES CTA ============ */}
      <ScrollReveal>
        <section className="py-20 bg-nuit text-creme relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-or/5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4">
              Nos Recettes Maison
            </h2>
            <p className="text-creme/60 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Découvrez comment sublimer nos épices et produits à travers des recettes authentiques et créatives.
            </p>
            <Link
              href="/recettes"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2"
            >
              Voir les recettes
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* ============ VALEURS ============ */}
      <ScrollReveal>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
              {features.map((item, i) => (
                <div key={i} className="text-center p-6 hover:-translate-y-1 transition-transform">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-or/10 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-or" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-nuit dark:text-creme mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-nuit/60 dark:text-creme/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
