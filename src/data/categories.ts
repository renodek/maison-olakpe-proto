import { Category } from "./types";

const categories: Category[] = [
  {
    id: "cat1", nom: "Épices", slug: "epices",
    description: "Épices rares et artisanales du monde entier, sélectionnées pour leur qualité exceptionnelle.",
    image: "/images/epices-cat.jpg",
    couleur: "#2D6A4F", icone: "spice"
  },
  {
    id: "cat2", nom: "Parfums & Encens", slug: "parfums",
    description: "Fragrances orientales, eaux de parfum et encens naturels pour éveiller les sens.",
    image: "/images/parfums-cat.jpg",
    couleur: "#5C275E", icone: "perfume"
  },
  {
    id: "cat3", nom: "Cosmétiques", slug: "cosmetiques",
    description: "Soins naturels au beurre de karité, huiles précieuses et ingrédients bio.",
    image: "/images/cosmetiques-hero.jpg",
    couleur: "#8B1A2F", icone: "cosmetic"
  },
  {
    id: "sub1", nom: "Huiles Précieuses", slug: "huiles",
    description: "Huiles végétales pures, pressées à froid : argan, moringa et autres trésors.",
    image: "/images/huiles-cat.jpg",
    couleur: "#A03B1F", icone: "oil", parentId: "cat3"
  },
  {
    id: "sub2", nom: "Crèmes & Baumes", slug: "cremes",
    description: "Crèmes visage, baumes corporels et soins apaisants aux ingrédients naturels.",
    image: "/images/cremes-cat.jpg",
    couleur: "#D4A96A", icone: "cream", parentId: "cat3"
  }
];

export default categories;
