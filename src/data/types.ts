export interface Product {
  id: string;
  slug: string;
  nom: string;
  categorie: "epices" | "parfums" | "cosmetiques" | "huiles" | "cremes";
  sousCategorie?: string;
  prix: number;
  prixBarre?: number;
  images: string[];
  description: string;
  descriptionCourte: string;
  ingredients: string[];
  note: number;
  nbAvis: number;
  stock: number;
  variantes?: { nom: string; options: string[] }[];
  badges: ("nouveau" | "promo" | "best-seller" | "bio" | "artisanal")[];
  recetteAssociee?: string;
  origine: string;
  poids?: string;
  conseilsUtilisation?: string;
}

export interface Category {
  id: string;
  nom: string;
  slug: string;
  description: string;
  image: string;
  couleur: string;
  icone: string;
  parentId?: string;
}

export interface Recipe {
  id: string;
  slug: string;
  titre: string;
  categorie: "epices" | "parfums" | "cosmetiques";
  duree: string;
  difficulte: "Facile" | "Moyen" | "Difficile";
  image: string;
  description: string;
  ingredients: { nom: string; quantite: string; produitId?: string }[];
  etapes: string[];
  astuce?: string;
}

export interface Review {
  id: string;
  produitId: string;
  prenom: string;
  note: number;
  commentaire: string;
  date: string;
}

export interface Testimonial {
  id: string;
  prenom: string;
  ville: string;
  note: number;
  commentaire: string;
  avatar?: string;
}

export interface PromoCode {
  code: string;
  type: "pourcentage" | "livraison";
  valeur: number;
  labelAffiché: string;
  actif: boolean;
}

export interface Carrier {
  id: string;
  nom: string;
  delai: string;
  tarif: number;
  gratuitAuDessusDe: number;
  icone: string;
}

export interface FAQItem {
  id: string;
  question: string;
  reponse: string;
}
