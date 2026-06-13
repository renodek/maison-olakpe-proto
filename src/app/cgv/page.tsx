import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'CGV', description: 'Conditions Générales de Vente' };

export default function CGVPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-xs text-nuit/50 dark:text-creme/50 mb-6 font-sans">
        <Link href="/" className="hover:text-rouge">Accueil</Link> / <span className="text-nuit dark:text-creme">CGV</span>
      </nav>
      <h1 className="font-serif text-3xl font-bold text-nuit dark:text-creme mb-8">Conditions Générales de Vente</h1>
      <div className="p-8 rounded-xl bg-ivoire dark:bg-nuit-light/50 text-center">
        <div className="text-4xl mb-4">📄</div>
        <p className="text-nuit/60 dark:text-creme/60 italic">
          Contenu à fournir par le client.
        </p>
        <p className="text-xs text-nuit/30 dark:text-creme/30 mt-2">
          Cette page sera complétée avec les CGV définitives lors du développement de la version finale v1.0.
        </p>
      </div>
    </div>
  );
}
