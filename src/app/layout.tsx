import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/theme-provider';
import { ToastProvider } from '@/context/toast-provider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/panier/CartDrawer';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Maison Olakpé – Épices, Parfums & Cosmétiques Artisanaux',
    template: '%s | Maison Olakpé',
  },
  description:
    "Découvrez nos épices artisanales, parfums d'exception et cosmétiques naturels.",
  openGraph: {
    title: 'Maison Olakpé – Épices, Parfums & Cosmétiques Artisanaux',
    description:
      "Découvrez nos épices artisanales, parfums d'exception et cosmétiques naturels.",
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Maison Olakpé',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&family=Montserrat:wght@0,400;0,500;0,600;0,700;0,800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-creme dark:bg-nuit text-nuit dark:text-creme">
        <ThemeProvider>
          <ToastProvider>
            <Header />
            <CartDrawer />
            <main className="flex-1 pt-[88px] md:pt-[104px]">{children}</main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
