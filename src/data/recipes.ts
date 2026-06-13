import { Recipe } from "./types";

const recipes: Recipe[] = [
  {
    id: "r01", slug: "tajine-poulet-ras-el-hanout",
    titre: "Tajine de Poulet au Ras el-Hanout",
    categorie: "epices",
    duree: "1h30", difficulte: "Moyen",
    image: "/images/recette-1.jpg",
    description: "Un tajine traditionnel où le poulet fondant s'imprègne des 22 épices du Ras el-Hanout. Accompagné de légumes confits et de fruits secs, ce plat est un voyage gustatif au cœur du Maghreb.",
    ingredients: [
      { nom: "Poulet fermier", quantite: "4 cuisses", produitId: "p03" },
      { nom: "Ras el-Hanout Maison Olakpé", quantite: "2 c. à soupe", produitId: "p03" },
      { nom: "Oignons", quantite: "3 moyens" },
      { nom: "Carottes", quantite: "4" },
      { nom: "Olives vertes", quantite: "150g" },
      { nom: "Citrons confits", quantite: "2" },
      { nom: "Abricots secs", quantite: "100g" },
      { nom: "Amandes effilées", quantite: "50g" },
      { nom: "Huile d'olive", quantite: "4 c. à soupe" },
      { nom: "Miel", quantite: "1 c. à soupe" }
    ],
    etapes: [
      "Dans un grand plat à tajine, faire chauffer l'huile d'olive à feu moyen.",
      "Faire dorer les cuisses de poulet sur toutes les faces pendant 8-10 minutes. Réserver.",
      "Dans la même huile, faire revenir les oignons émincés jusqu'à transparence.",
      "Ajouter le Ras el-Hanout et remuer 1 minute pour libérer les arômes.",
      "Remettre le poulet, ajouter les carottes en rondelles et couvrir d'eau à mi-hauteur.",
      "Porter à ébullition, puis réduire le feu, couvrir et laisser mijoter 45 minutes.",
      "Ajouter les citrons confits, les olives et les abricots secs.",
      "Poursuivre la cuisson 20 minutes à découvert pour réduire la sauce.",
      "Verser le miel, rectifier et laisser caraméliser 5 minutes.",
      "Servir parsemé d'amandes grillées avec de la semoule ou du pain."
    ],
    astuce: "Préparez ce tajine la veille : les saveurs seront encore plus intenses le lendemain."
  },
  {
    id: "r02", slug: "riz-au-safran",
    titre: "Riz Parfumé au Safran",
    categorie: "epices",
    duree: "35min", difficulte: "Facile",
    image: "/images/recette-2.jpg",
    description: "Un riz basmati délicatement parfumé au safran pur, qui sublime les plats mijotés ou se suffit à lui-même comme plat végétarien raffiné.",
    ingredients: [
      { nom: "Riz basmati", quantite: "300g", produitId: "p15" },
      { nom: "Safran en pistils", quantite: "0.2g (environ 20 pistils)", produitId: "p15" },
      { nom: "Oignon", quantite: "1" },
      { nom: "Bouillon de légumes", quantite: "600ml" },
      { nom: "Beurre", quantite: "30g" },
      { nom: "Cardamome verte", quantite: "3 gousses" },
      { nom: "Cannelle de Ceylan", quantite: "1 bâton", produitId: "p04" },
      { nom: "Amandes effilées", quantite: "30g" },
      { nom: "Raisins secs", quantite: "30g" }
    ],
    etapes: [
      "Faire infuser les pistils de safran dans 3 cuillères à soupe d'eau tiède pendant 20 minutes.",
      "Rincer le riz basmati à l'eau froide jusqu'à ce que l'eau soit claire.",
      "Faire fondre le beurre et revenir l'oignon finement émincé.",
      "Ajouter la cardamome et le bâton de cannelle, remuer 1 minute.",
      "Ajouter le riz égoutté et le faire nacrer 2 minutes en remuant.",
      "Verser le bouillon chaud et l'infusion de safran. Saler légèrement.",
      "Porter à ébullition, couvrir et réduire au minimum. Cuire 12 minutes.",
      "Éteindre le feu et laisser gonfler 5 minutes sans ouvrir.",
      "Griller les amandes à sec. Aérer le riz, incorporer raisins et amandes."
    ],
    astuce: "Remplacez la moitié du bouillon par du lait de coco pour un riz encore plus parfumé."
  },
  {
    id: "r03", slug: "lait-dore-curcuma",
    titre: "Lait Doré au Curcuma",
    categorie: "epices",
    duree: "10min", difficulte: "Facile",
    image: "/images/recette-3.jpg",
    description: "Le Golden Milk, boisson ayurvédique ancestrale, allie les vertus anti-inflammatoires du curcuma à la douceur du lait et aux épices chaudes.",
    ingredients: [
      { nom: "Curcuma en poudre", quantite: "1 c. à café", produitId: "p02" },
      { nom: "Lait (végétal ou animal)", quantite: "250ml" },
      { nom: "Poivre noir moulu", quantite: "1 pincée", produitId: "p01" },
      { nom: "Cannelle", quantite: "½ c. à café", produitId: "p04" },
      { nom: "Gingembre frais râpé", quantite: "1 cm" },
      { nom: "Miel", quantite: "1 c. à café" },
      { nom: "Huile de coco", quantite: "½ c. à café" }
    ],
    etapes: [
      "Verser le lait dans une casserole, ajouter curcuma, cannelle et gingembre.",
      "Ajouter la pincée de poivre noir (essentiel pour absorber la curcumine).",
      "Porter à frémissement à feu doux en fouettant. Ne pas faire bouillir.",
      "Laisser frémir 5 minutes pour que les épices infusent.",
      "Hors du feu, ajouter l'huile de coco et le miel. Bien mélanger.",
      "Filtrer si désiré et servir bien chaud."
    ],
    astuce: "Le lait d'amande ou d'avoine donne une version végétale délicieuse."
  },
  {
    id: "r04", slug: "gommage-corporel-cannelle",
    titre: "Gommage Corporel à la Cannelle",
    categorie: "cosmetiques",
    duree: "5min", difficulte: "Facile",
    image: "/images/recette-4.jpg",
    description: "Un gommage maison à la cannelle de Ceylan qui exfolie en douceur tout en stimulant la microcirculation. L'huile d'argan nourrit la peau en profondeur.",
    ingredients: [
      { nom: "Sucre roux", quantite: "3 c. à soupe" },
      { nom: "Cannelle de Ceylan en poudre", quantite: "1 c. à café", produitId: "p04" },
      { nom: "Huile d'Argan", quantite: "2 c. à soupe", produitId: "p08" },
      { nom: "Miel", quantite: "1 c. à soupe" },
      { nom: "Huile essentielle d'orange douce", quantite: "3 gouttes (optionnel)" }
    ],
    etapes: [
      "Mélanger le sucre roux et la cannelle en poudre dans un bol.",
      "Ajouter l'huile d'argan et le miel. Mélanger jusqu'à obtenir une pâte homogène.",
      "Ajouter l'huile essentielle d'orange douce si désiré.",
      "Sous la douche, appliquer sur peau humide en mouvements circulaires.",
      "Insister sur les zones rugueuses : coudes, genoux, talons.",
      "Rincer abondamment à l'eau tiède."
    ],
    astuce: "Conserver le reste au réfrigérateur dans un pot hermétique jusqu'à 1 semaine."
  },
  {
    id: "r05", slug: "diffuseur-huiles-essentielles",
    titre: "Synergie Bien-Être pour Diffuseur",
    categorie: "parfums",
    duree: "2min", difficulte: "Facile",
    image: "/images/recette-5.jpg",
    description: "Créez une ambiance apaisante et chaleureuse avec cette synergie d'huiles essentielles spécialement conçue pour votre diffuseur.",
    ingredients: [
      { nom: "Huile essentielle d'orange douce", quantite: "5 gouttes" },
      { nom: "Huile essentielle de cannelle", quantite: "2 gouttes" },
      { nom: "Huile essentielle de bois de santal", quantite: "3 gouttes" },
      { nom: "Huile essentielle de bergamote", quantite: "3 gouttes" },
      { nom: "Eau", quantite: "Selon votre diffuseur" }
    ],
    etapes: [
      "Remplir le réservoir du diffuseur d'eau selon les recommandations.",
      "Ajouter les huiles essentielles dans l'ordre indiqué.",
      "Pour une ambiance relaxante, diffuser 30 minutes avant le coucher.",
      "Pour une ambiance tonique, diffuser le matin pendant 20 minutes.",
      "Nettoyer le diffuseur une fois par semaine."
    ],
    astuce: "Quelques gouttes sur un galet poreux pour parfumer les armoires."
  },
  {
    id: "r06", slug: "masque-visage-curcuma",
    titre: "Masque Visage Éclat au Curcuma",
    categorie: "cosmetiques",
    duree: "15min", difficulte: "Facile",
    image: "/images/recette-6.jpg",
    description: "Masque illuminateur au curcuma et au miel qui unifie le teint, apaise les rougeurs et redonne éclat aux peaux ternes.",
    ingredients: [
      { nom: "Curcuma en poudre", quantite: "1 c. à café", produitId: "p02" },
      { nom: "Miel", quantite: "1 c. à soupe" },
      { nom: "Yaourt nature", quantite: "1 c. à soupe" },
      { nom: "Huile de Moringa", quantite: "3 gouttes", produitId: "p09" }
    ],
    etapes: [
      "Mélanger le curcuma, le miel et le yaourt jusqu'à obtenir une pâte lisse.",
      "Ajouter l'huile de Moringa et mélanger de nouveau.",
      "Appliquer le masque en couche fine sur visage propre et sec.",
      "Laisser poser 10 à 15 minutes.",
      "Rincer à l'eau tiède en mouvements circulaires doux.",
      "Terminer par un jet d'eau froide pour resserrer les pores."
    ],
    astuce: "Réalisez ce masque le soir, le curcuma peut légèrement teinter la peau."
  }
];

export default recipes;
