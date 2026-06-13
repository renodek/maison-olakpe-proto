import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Globe, HandHeart, Leaf, ArrowRight, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'À propos',
  description: "L'histoire et les valeurs de Maison Olakpé.",
};

const valeurs = [
  {
    icon: Globe,
    title: 'Authenticité',
    desc: 'Des produits purs, sans additifs, fidèles aux savoir-faire traditionnels transmis de génération en génération.',
  },
  {
    icon: HandHeart,
    title: 'Éthique',
    desc: 'Partenariats directs et durables avec les producteurs, prix justes, respect des conditions de travail.',
  },
  {
    icon: Leaf,
    title: 'Naturalité',
    desc: 'Ingrédients 100% naturels, agriculture biologique, aucun test sur les animaux, emballages éco-conçus.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Fil d'Ariane */}
      <nav className="text-xs text-nuit/50 dark:text-creme/50 mb-6 font-sans flex items-center gap-1.5">
        <Link href="/" className="hover:text-or transition-colors">Accueil</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-nuit dark:text-creme font-medium">À propos</span>
      </nav>

      <ScrollReveal>
        <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-10 relative">
          <Image
            src="/images/about-hero.jpg"
            alt="Maison Olakpé – Notre histoire"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
            quality={90}
          />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-nuit dark:text-creme mb-6">
          Notre Histoire
        </h1>
        <div className="prose prose-olakpe prose-lg max-w-none text-nuit/70 dark:text-creme/70 space-y-4">
          <p className="text-lg leading-relaxed">
            Maison Olakpé est née d&apos;une passion profonde pour les trésors naturels que nous
            offre la terre. Fondée en 2020, notre maison puise son inspiration dans les traditions
            ancestrales d&apos;Afrique, d&apos;Orient et d&apos;Asie pour vous offrir des épices
            d&apos;exception, des parfums envoûtants et des cosmétiques authentiques.
          </p>
          <p>
            Chaque produit de notre catalogue est le fruit d&apos;une sélection rigoureuse auprès
            de producteurs locaux qui partagent nos valeurs de respect de l&apos;environnement et
            de commerce équitable. Nous parcourons le monde à la recherche des meilleures matières
            premières : poivre de Penja au Cameroun, safran de Taliouine au Maroc, curcuma du
            Kerala en Inde, huile d&apos;argan des coopératives berbères, beurre de karité du
            Burkina Faso.
          </p>
          <p>
            Notre nom, Olakpé, signifie &ldquo;la maison qui accueille&rdquo; en langue Fon, en
            hommage aux racines béninoises de notre fondatrice. Une invitation au voyage sensoriel,
            à la découverte de saveurs oubliées et de traditions préservées.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <h2 className="font-serif text-2xl font-bold text-nuit dark:text-creme mt-12 mb-6">
          Nos Valeurs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {valeurs.map((v, i) => (
            <div key={i} className="card p-6 text-center group hover:border-or/30">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-or/10 flex items-center justify-center group-hover:bg-or/20 transition-colors">
                <v.icon className="w-7 h-7 text-or" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif font-bold text-lg text-nuit dark:text-creme mb-2">
                {v.title}
              </h3>
              <p className="text-sm text-nuit/60 dark:text-creme/60 leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-or to-terre text-creme text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-20" />
          <div className="relative">
            <h2 className="font-serif text-2xl font-bold mb-3">
              Rejoignez l&apos;aventure
            </h2>
            <p className="text-creme/80 mb-6 max-w-md mx-auto">
              Découvrez nos collections et laissez-vous transporter par des senteurs et saveurs
              d&apos;ailleurs.
            </p>
            <Link
              href="/catalogue"
              className="btn-primary bg-creme text-terre hover:bg-ivoire hover:text-terre-dark inline-flex items-center gap-2"
            >
              Explorer le catalogue
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
