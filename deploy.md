# Maison Olakpé – Prototype Front-End

## Résumé du projet

Prototype Next.js 14 / React pour la refonte du site maisonolakpe.com, développé selon le cahier des charges v0.1 (Juin 2026).

**Stack :** Next.js 14 (App Router) + TypeScript + Tailwind CSS 3 + Zustand  
**Node.js :** v24.16.0  
**Build :** ✅ Réussi – 14 routes compilées, 87.3 KB first load JS partagé

---

## Pages implémentées

| Page | Route | Type | Statut |
|------|-------|------|--------|
| Accueil | `/` | Statique | ✅ |
| 404 | `/_not-found` | Statique | ✅ |
| Catalogue | `/catalogue` | Statique | ✅ Filtres, tri, recherche |
| Fiche produit | `/catalogue/[slug]` | Dynamique SSR | ✅ |
| Panier | `/panier` | Statique | ✅ |
| Commande | `/commande` | Statique | ✅ 3 étapes mockées |
| Recettes | `/recettes` | Statique | ✅ |
| Fiche recette | `/recettes/[slug]` | Dynamique SSR | ✅ |
| À propos | `/a-propos` | Statique | ✅ |
| Contact | `/contact` | Statique | ✅ |
| FAQ | `/faq` | Statique | ✅ 10 accordéons |
| CGV | `/cgv` | Statique | ✅ Placeholder |
| Mentions légales | `/mentions-legales` | Statique | ✅ Placeholder |

---

## Corrections post-build initial

### 1. Event handler dans un Server Component (Footer)
**Erreur :** `Event handlers cannot be passed to Client Component props`
**Cause :** Le composant Footer n'avait pas la directive `'use client'` mais contenait `<form onSubmit={...}>`
**Correction :** Ajout de `'use client'` en tête du fichier Footer.tsx

### 2. useSearchParams sans Suspense (Catalogue)
**Erreur :** `useSearchParams() should be wrapped in a suspense boundary`
**Cause :** Le hook `useSearchParams()` nécessite un `<Suspense>` parent dans Next.js 14 App Router
**Correction :** Extraction du contenu dans un composant `CatalogueContent` wrappé dans `<Suspense>`

### 3. Persistence du panier localStorage
**Amélioration :** Ajout du middleware Zustand `persist` pour sauvegarder automatiquement le panier dans localStorage

### 4. Problème d'hydration SSR (Home page)
**Correction :** Ajout d'un état `mounted` avec fallback loader pendant l'hydration SSR, évitant le mismatch serveur/client

---

## Décisions autonomes documentées

### Choix Tailwind CSS
Utilisation de Tailwind CSS avec classes utilitaires dans le JSX + globals.css pour les composants réutilisables (btn-primary, card, badge...).

### Images libres de droits
Toutes les images proviennent de Unsplash. Pour la version finale, remplacer par les photos fournies par la cliente.

### Google Fonts via `<link>`
Polices chargées via balises `<link>` dans `<head>` pour éviter des problèmes avec le plugin font-stylesheet-gathering de Next.js 14.

### Configuration Tailwind en .js
La config TypeScript causait des erreurs de typage. Migrée vers tailwind.config.js.

### Gestion du mode sombre
ThemeProvider React Context + classe `dark` sur `<html>` + localStorage.

---

## Commandes

```bash
npm install        # Installation des dépendances
npm run dev        # Développement (localhost:3000)
npm run build      # Build production
npm run start      # Démarrage production
```

---

## Déploiement recommandé

- **Vercel** : Déploiement gratuit, support Next.js natif
- **Netlify** : Alternative avec `@netlify/plugin-nextjs`

---

## Points d'attention pour la v1.0

1. Remplacer les images Unsplash par les photos de la cliente
2. Implémenter le back-end (API, base de données, auth)
3. Connecter Stripe/PayPal
4. Ajouter les CGV et Mentions légales réelles
5. Implémenter la recherche avec fuse.js ou Algolia
6. Ajouter PWA/Service Worker
7. Tests unitaires et E2E
8. Multi-devises dynamique
9. Newsletter fonctionnelle (Mailchimp/Brevo)
10. Analytics (GA4/Plausible)
