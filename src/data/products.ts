import { Product } from "./types";

/* ============================================
   IMAGES PRODUITS – Photos libres de droit
   Chaque produit a ses propres visuels
   ============================================ */

const products: Product[] = [
  /* ── ÉPICES ── */
  {
    id: "p01", slug: "poivre-noir-de-penja", nom: "Poivre Noir de Penja",
    categorie: "epices", sousCategorie: "Poivres",
    prix: 12.90, prixBarre: 15.90,
    images: ["/images/epice-poivre.jpg", "/images/epice-poivre.jpg"],
    description: "Notre poivre noir de Penja est récolté à la main dans les plantations camerounaises. Ses grains denses et aromatiques libèrent des notes boisées, légèrement mentholées, qui subliment viandes grillées, sauces et plats mijotés.",
    descriptionCourte: "Poivre noir d'exception de Penja, Cameroun – notes boisées et mentholées.",
    ingredients: ["100% Poivre noir de Penja (Piper nigrum)"],
    note: 4.8, nbAvis: 47, stock: 25,
    variantes: [{ nom: "Format", options: ["50g", "100g", "250g"] }],
    badges: ["best-seller", "bio"],
    origine: "Cameroun", poids: "50g",
    conseilsUtilisation: "À moudre au dernier moment sur vos plats pour préserver tous ses arômes."
  },
  {
    id: "p02", slug: "curcuma-bio", nom: "Curcuma Bio en Poudre",
    categorie: "epices", sousCategorie: "Poudres",
    prix: 8.50,
    images: ["/images/epice-curcuma.jpg", "/images/epice-curcuma.jpg"],
    description: "Curcuma biologique cultivé sans pesticides, réduit en poudre fine pour une utilisation quotidienne. Sa couleur jaune-orangé intense témoigne de sa richesse en curcumine, puissant antioxydant naturel.",
    descriptionCourte: "Curcuma bio en poudre fine – riche en curcumine, idéal pour currys et boissons bien-être.",
    ingredients: ["100% Curcuma longa biologique en poudre"],
    note: 4.6, nbAvis: 32, stock: 50,
    variantes: [{ nom: "Format", options: ["100g", "200g", "500g"] }],
    badges: ["bio"],
    origine: "Inde (Kerala)", poids: "100g",
    conseilsUtilisation: "Associer avec du poivre noir pour une meilleure absorption de la curcumine."
  },
  {
    id: "p03", slug: "melange-ras-el-hanout", nom: "Mélange Ras el-Hanout",
    categorie: "epices", sousCategorie: "Mélanges",
    prix: 11.50, prixBarre: 14.50,
    images: ["/images/epices-cat.jpg", "/images/epices-cat.jpg"],
    description: "Notre Ras el-Hanout est un assemblage artisanal de 22 épices soigneusement torréfiées et moulues. Cannelle, cardamome, cumin, coriandre, gingembre et pétales de rose se marient pour créer ce mélange emblématique.",
    descriptionCourte: "Mélange 22 épices artisanal – cannelle, cardamome, rose – pour tajines et couscous.",
    ingredients: ["Cannelle", "Cardamome", "Cumin", "Coriandre", "Gingembre", "Pétales de rose", "Noix de muscade", "Clou de girofle", "Poivre", "Curcuma", "et 12 autres épices"],
    note: 4.9, nbAvis: 63, stock: 18,
    variantes: [{ nom: "Format", options: ["60g", "120g", "250g"] }],
    badges: ["best-seller", "artisanal"],
    recetteAssociee: "r01",
    origine: "Maroc", poids: "60g",
    conseilsUtilisation: "Faire revenir 1 cuillère à café dans l'huile chaude avant d'ajouter vos ingrédients."
  },
  {
    id: "p04", slug: "cannelle-de-ceylan", nom: "Cannelle de Ceylan",
    categorie: "epices", sousCategorie: "Écorces",
    prix: 9.90,
    images: ["/images/epice-cannelle.jpg", "/images/epice-cannelle.jpg"],
    description: "Véritable cannelle de Ceylan (Cinnamomum verum), reconnaissable à ses bâtons fins et friables. Plus douce et subtile que la casse, elle offre des notes chaudes et sucrées.",
    descriptionCourte: "Véritable cannelle de Ceylan en bâtons – douce, subtile et friable.",
    ingredients: ["100% Écorce de Cinnamomum verum (Ceylan)"],
    note: 4.7, nbAvis: 38, stock: 30,
    variantes: [{ nom: "Format", options: ["3 bâtons", "6 bâtons", "12 bâtons"] }],
    badges: ["bio"],
    origine: "Sri Lanka", poids: "3 bâtons (~15g)",
    conseilsUtilisation: "Infuser un bâton dans du lait chaud avec du miel pour une boisson réconfortante."
  },
  {
    id: "p13", slug: "poivre-blanc-sarawak", nom: "Poivre Blanc de Sarawak",
    categorie: "epices", sousCategorie: "Poivres",
    prix: 14.50,
    images: ["/images/epice-poivre.jpg", "/images/epice-poivre.jpg"],
    description: "Le poivre blanc de Sarawak est récolté à pleine maturité puis trempé dans l'eau pour retirer son enveloppe. Il en résulte un poivre doux, légèrement fermenté.",
    descriptionCourte: "Poivre blanc doux de Sarawak – notes de sous-bois – sauces et poissons.",
    ingredients: ["100% Poivre blanc de Sarawak (Piper nigrum)"],
    note: 4.4, nbAvis: 18, stock: 15,
    variantes: [{ nom: "Format", options: ["50g", "100g"] }],
    badges: [],
    origine: "Malaisie (Sarawak)", poids: "50g",
    conseilsUtilisation: "Parfait dans les plats où l'on ne souhaite pas voir les points noirs du poivre."
  },
  {
    id: "p15", slug: "safran-pur", nom: "Safran Pur en Pistils",
    categorie: "epices", sousCategorie: "Poudres",
    prix: 19.90, prixBarre: 24.90,
    images: ["/images/epice-safran.jpg", "/images/epice-safran.jpg"],
    description: "Safran pur en pistils, récolté à la main dans les champs de Taliouine au Maroc. Chaque pistil est sélectionné pour sa couleur rouge profond et son arôme puissant.",
    descriptionCourte: "Safran pur en pistils de Taliouine – récolte manuelle – arôme intense.",
    ingredients: ["100% Pistils de Crocus sativus"],
    note: 4.9, nbAvis: 25, stock: 7,
    variantes: [{ nom: "Format", options: ["0.5g", "1g", "2g"] }],
    badges: ["best-seller", "artisanal"],
    recetteAssociee: "r02",
    origine: "Maroc (Taliouine)", poids: "1g",
    conseilsUtilisation: "Faire infuser 10-15 pistils dans 2 cuillères à soupe d'eau tiède pendant 20 minutes avant utilisation."
  },
  {
    id: "p16", slug: "coffret-decouverte-epices", nom: "Coffret Découverte Épices",
    categorie: "epices", sousCategorie: "Mélanges",
    prix: 39.90, prixBarre: 49.90,
    images: ["/images/epice-coffret.jpg", "/images/epice-coffret.jpg"],
    description: "Coffret cadeau regroupant 6 de nos épices emblématiques dans un élégant coffret en bois gravé : Poivre de Penja, Curcuma Bio, Ras el-Hanout, Cannelle de Ceylan, Safran et notre Mélange Secret Maison.",
    descriptionCourte: "Coffret 6 épices emblématiques dans coffret bois gravé – cadeau gastronomique.",
    ingredients: ["Poivre de Penja 50g", "Curcuma Bio 100g", "Ras el-Hanout 60g", "Cannelle de Ceylan 3 bâtons", "Safran 0.5g", "Mélange Secret 50g"],
    note: 5.0, nbAvis: 9, stock: 10,
    badges: ["nouveau", "artisanal"],
    origine: "Assemblage", poids: "Coffret",
    conseilsUtilisation: "Chaque épice est présentée dans un tube en verre hermétique pour une conservation optimale."
  },

  /* ── PARFUMS ── */
  {
    id: "p05", slug: "parfum-ambre-royal", nom: "Parfum Ambre Royal",
    categorie: "parfums",
    prix: 89.00, prixBarre: 110.00,
    images: ["/images/parfum-ambre.jpg", "/images/parfum-ambre.jpg"],
    description: "Ambre Royal est une fragrance envoûtante qui marie la chaleur de l'ambre gris à la douceur de la vanille bourbon et aux notes épicées du safran. Un parfum de caractère.",
    descriptionCourte: "Fragrance orientale boisée – ambre gris, vanille bourbon, safran.",
    ingredients: ["Ambre gris", "Vanille Bourbon", "Safran", "Bois de santal", "Patchouli", "Bergamote"],
    note: 4.5, nbAvis: 21, stock: 8,
    variantes: [{ nom: "Format", options: ["30ml", "50ml", "100ml"] }],
    badges: ["nouveau"],
    origine: "France", poids: "50ml",
    conseilsUtilisation: "Vaporiser sur les points de pulsation : poignets, cou, derrière les oreilles."
  },
  {
    id: "p06", slug: "parfum-fleur-d-oranger", nom: "Eau de Parfum Fleur d'Oranger",
    categorie: "parfums",
    prix: 76.00,
    images: ["/images/parfum-oranger.jpg", "/images/parfum-oranger.jpg"],
    description: "Une eau de parfum lumineuse qui capture l'essence des fleurs d'oranger méditerranéennes. Des notes de néroli éclatantes se mêlent à la douceur du miel et à la fraîcheur de la bergamote.",
    descriptionCourte: "Eau de parfum solaire – néroli, miel, bergamote – fraîche et élégante.",
    ingredients: ["Néroli", "Fleur d'oranger", "Miel", "Bergamote", "Musc blanc", "Petit grain"],
    note: 4.4, nbAvis: 15, stock: 12,
    variantes: [{ nom: "Format", options: ["30ml", "50ml", "100ml"] }],
    badges: ["best-seller"],
    origine: "France", poids: "50ml",
    conseilsUtilisation: "Parfait pour le printemps et l'été, tient 6 à 8 heures sur peau."
  },
  {
    id: "p07", slug: "parfum-oud-mystique", nom: "Parfum Oud Mystique",
    categorie: "parfums",
    prix: 120.00, prixBarre: 145.00,
    images: ["/images/parfums-cat.jpg", "/images/parfums-cat.jpg"],
    description: "Oud Mystique est notre fragrance la plus intense. Un oud cambodgien d'exception, fumé et cuiré, adouci par des notes de rose de Damas et de cuir blanc.",
    descriptionCourte: "Fragrance intense – oud cambodgien, rose de Damas, cuir blanc.",
    ingredients: ["Oud cambodgien", "Rose de Damas", "Cuir blanc", "Safran", "Fève tonka", "Cèdre"],
    note: 4.9, nbAvis: 12, stock: 5,
    variantes: [{ nom: "Format", options: ["30ml", "50ml"] }],
    badges: ["nouveau", "artisanal"],
    origine: "France", poids: "50ml",
    conseilsUtilisation: "Une seule vaporisation suffit. Pour les soirées et occasions spéciales."
  },
  {
    id: "p18", slug: "encens-naturel", nom: "Encens Naturel aux Résines",
    categorie: "parfums",
    prix: 15.00,
    images: ["/images/parfum-encens.jpg", "/images/parfum-encens.jpg"],
    description: "Encens naturel composé de résines pures d'oliban et de myrrhe, récoltées de manière traditionnelle. Présenté dans un élégant coffret en bois avec brûleur en terre cuite.",
    descriptionCourte: "Encens naturel oliban & myrrhe avec brûleur – méditation et relaxation.",
    ingredients: ["Résine d'oliban (Boswellia sacra)", "Résine de myrrhe (Commiphora myrrha)", "Charbon végétal naturel"],
    note: 4.5, nbAvis: 19, stock: 14,
    badges: ["artisanal", "nouveau"],
    origine: "Somalie / Éthiopie", poids: "Coffret 30g",
    conseilsUtilisation: "Placer un charbon incandescent dans le brûleur, déposer quelques grains de résine."
  },

  /* ── HUILES ── */
  {
    id: "p08", slug: "huile-d-argan-bio", nom: "Huile d'Argan Bio",
    categorie: "huiles",
    prix: 24.90,
    images: ["/images/huile-argan.jpg", "/images/huile-argan.jpg"],
    description: "Huile d'argan pure, pressée à froid, issue de l'agriculture biologique certifiée. Riche en vitamine E et en acides gras essentiels, elle nourrit intensément la peau et les cheveux.",
    descriptionCourte: "Huile d'argan vierge bio – pressée à froid – soin visage, corps et cheveux.",
    ingredients: ["100% Huile d'Argania spinosa biologique, première pression à froid"],
    note: 4.8, nbAvis: 89, stock: 40,
    variantes: [{ nom: "Format", options: ["30ml", "50ml", "100ml"] }],
    badges: ["best-seller", "bio"],
    origine: "Maroc", poids: "50ml",
    conseilsUtilisation: "Quelques gouttes sur le visage le soir, ou en masque capillaire avant le shampoing."
  },
  {
    id: "p09", slug: "huile-de-moringa", nom: "Huile de Moringa Bio",
    categorie: "huiles",
    prix: 22.50,
    images: ["/images/huile-moringa.jpg", "/images/huile-moringa.jpg"],
    description: "L'huile de Moringa, aussi appelée 'huile de Ben', est extraite des graines de l'arbre miracle. Extrêmement riche en antioxydants, elle lutte contre le vieillissement cutané.",
    descriptionCourte: "Huile de Moringa bio – antioxydante, anti-âge, légère et pénétrante.",
    ingredients: ["100% Huile de Moringa oleifera biologique, première pression à froid"],
    note: 4.6, nbAvis: 34, stock: 22,
    variantes: [{ nom: "Format", options: ["30ml", "50ml", "100ml"] }],
    badges: ["bio", "nouveau"],
    origine: "Burkina Faso", poids: "50ml",
    conseilsUtilisation: "Appliquer 2-3 gouttes matin et soir sur le visage propre."
  },

  /* ── CRÈMES & BAUMES ── */
  {
    id: "p10", slug: "baume-levres-karite", nom: "Baume à Lèvres Karité & Miel",
    categorie: "cremes",
    prix: 7.90,
    images: ["/images/creme-karite.jpg", "/images/creme-karite.jpg"],
    description: "Baume à lèvres nourrissant au beurre de karité biologique et au miel. Sa formule riche protège les lèvres du dessèchement et des gerçures.",
    descriptionCourte: "Baume lèvres nourrissant – karité bio, miel – protection naturelle.",
    ingredients: ["Beurre de karité bio", "Miel", "Cire d'abeille", "Huile de coco", "Vitamine E"],
    note: 4.3, nbAvis: 56, stock: 60,
    badges: ["bio"],
    origine: "Burkina Faso", poids: "15ml",
    conseilsUtilisation: "Appliquer généreusement sur les lèvres, renouveler aussi souvent que nécessaire."
  },
  {
    id: "p11", slug: "creme-visage-nuit", nom: "Crème Visage Nuit Éclat",
    categorie: "cremes",
    prix: 34.50, prixBarre: 42.00,
    images: ["/images/creme-visage.jpg", "/images/creme-visage.jpg"],
    description: "Crème de nuit réparatrice au beurre de karité, huile d'argan et extrait de curcuma. Sa formule riche travaille pendant votre sommeil pour régénérer la peau.",
    descriptionCourte: "Crème nuit réparatrice – karité, argan, curcuma – éclat et régénération.",
    ingredients: ["Beurre de karité bio", "Huile d'argan bio", "Extrait de curcuma", "Glycérine végétale", "Aloe vera", "Vitamine E"],
    note: 4.7, nbAvis: 41, stock: 15,
    badges: ["best-seller", "bio"],
    origine: "France", poids: "50ml",
    conseilsUtilisation: "Appliquer le soir sur visage et cou parfaitement démaquillés."
  },
  {
    id: "p12", slug: "savon-noir-africain", nom: "Savon Noir Africain",
    categorie: "cremes",
    prix: 9.90,
    images: ["/images/savon-noir.jpg", "/images/savon-noir.jpg"],
    description: "Savon noir artisanal fabriqué selon la méthode traditionnelle africaine. À base de cendres de cacao et de beurre de karité, il nettoie la peau en profondeur.",
    descriptionCourte: "Savon noir artisanal – karité, cacao – purifiant et apaisant.",
    ingredients: ["Cendres de cacao", "Beurre de karité", "Huile de coco", "Eau"],
    note: 4.5, nbAvis: 73, stock: 35,
    badges: ["artisanal"],
    origine: "Ghana", poids: "100g",
    conseilsUtilisation: "Faire mousser entre les mains, appliquer sur peau humide, rincer abondamment."
  },
  {
    id: "p14", slug: "baume-tigre-epices", nom: "Baume Apaisant aux Épices",
    categorie: "cremes",
    prix: 14.90,
    images: ["/images/baume-epices.jpg", "/images/baume-epices.jpg"],
    description: "Baume apaisant inspiré des traditions asiatiques, formulé avec des huiles essentielles de girofle, de cannelle et de menthe poivrée.",
    descriptionCourte: "Baume musculaire – girofle, cannelle, menthe – soulagement après l'effort.",
    ingredients: ["Huile de girofle", "Huile de cannelle", "Menthe poivrée", "Camphre naturel", "Beurre de karité", "Cire d'abeille"],
    note: 4.6, nbAvis: 29, stock: 20,
    badges: ["artisanal"],
    origine: "France", poids: "30ml",
    conseilsUtilisation: "Masser doucement sur la zone concernée 2 à 3 fois par jour."
  },
  {
    id: "p17", slug: "eclat-corps-karite", nom: "Beurre de Karité Brut",
    categorie: "cremes",
    prix: 12.90,
    images: ["/images/creme-karite.jpg", "/images/creme-karite.jpg"],
    description: "Beurre de karité brut, non raffiné, importé directement d'une coopérative de femmes au Burkina Faso. Sa texture riche fond au contact de la peau.",
    descriptionCourte: "Beurre de karité brut non raffiné du Burkina – hydratation intense.",
    ingredients: ["100% Beurre de Vitellaria paradoxa non raffiné"],
    note: 4.7, nbAvis: 62, stock: 28,
    variantes: [{ nom: "Format", options: ["100g", "250g", "500g"] }],
    badges: ["best-seller", "bio"],
    origine: "Burkina Faso", poids: "100g",
    conseilsUtilisation: "Faire fondre une noisette entre les mains avant d'appliquer."
  }
];

export default products;
