'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/theme-provider';
import useCartStore from '@/context/cart-store';
import { cn } from '@/lib/utils';
import {
  Sun,
  Moon,
  ShoppingBag,
  Menu,
  X,
} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/recettes', label: 'Recettes' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);
  const toggleCart = useCartStore((s) => s.toggleCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const itemCount = totalItems();

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-creme/95 dark:bg-nuit/95 backdrop-blur-md shadow-lg'
          : 'bg-creme/80 dark:bg-nuit/80 backdrop-blur-sm'
      )}
    >
      {/* Barre d'annonce */}
      <div className="bg-violet text-creme text-xs font-display text-center py-1.5 px-4 uppercase tracking-widest">
        Livraison offerte dès 50€ • Paiement sécurisé • 🇫🇷
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-rouge to-jaune rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
              <span className="font-serif font-bold text-blanc text-xl">MO</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-serif font-bold text-nuit dark:text-creme text-lg leading-tight">
                Maison Olakpé
              </div>
              <div className="font-display text-[10px] uppercase tracking-[0.2em] text-jaune">
                Épices • Parfums • Cosmétiques
              </div>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-3 py-2 text-sm font-sans rounded-lg transition-colors duration-200',
                    isActive
                      ? 'text-rouge font-bold'
                      : 'text-nuit/70 dark:text-creme/70 hover:text-rouge hover:bg-rouge/5'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-rouge rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-2">
            {/* Devise */}
            <select
              className="hidden sm:block bg-transparent text-xs font-sans text-nuit/60 dark:text-creme/60 border border-sable/30 rounded px-2 py-1 cursor-pointer focus:outline-none focus:border-rouge"
              defaultValue="EUR"
            >
              <option value="EUR">€ EUR</option>
              <option value="USD">$ USD</option>
              <option value="GBP">£ GBP</option>
            </select>

            {/* Thème */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-nuit/60 dark:text-creme/60 hover:text-rouge hover:bg-rouge/5 hover:scale-110 active:scale-90 transition-all"
              aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Panier */}
            <button
              onClick={toggleCart}
              className="relative p-2 rounded-lg text-nuit/60 dark:text-creme/60 hover:text-rouge hover:bg-rouge/5 hover:scale-110 active:scale-90 transition-all"
              aria-label={`Panier – ${itemCount} article${itemCount > 1 ? 's' : ''}`}
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-rouge text-blanc text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-small">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Menu mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-nuit/60 dark:text-creme/60 hover:text-rouge active:scale-90 transition-all"
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation mobile */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-sable/20 bg-creme dark:bg-nuit animate-slide-down">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-4 py-3 text-sm font-sans rounded-lg transition-colors',
                  pathname === link.href
                    ? 'text-rouge font-bold bg-rouge/10'
                    : 'text-nuit/70 dark:text-creme/70 hover:text-rouge hover:bg-rouge/5'
                )}
              >
                {link.label}
              </Link>
            ))}
            <select
              className="bg-transparent text-xs font-sans text-nuit/60 dark:text-creme/60 border border-sable/30 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-rouge"
              defaultValue="EUR"
            >
              <option value="EUR">€ EUR</option>
              <option value="USD">$ USD</option>
              <option value="GBP">£ GBP</option>
            </select>
          </div>
        </nav>
      )}
    </header>
  );
}
