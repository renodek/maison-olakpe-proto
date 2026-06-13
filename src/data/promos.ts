import { PromoCode } from "./types";

const promoCodes: PromoCode[] = [
  { code: "BIENVENUE10", type: "pourcentage", valeur: 10, labelAffiché: "-10% sur votre première commande", actif: true },
  { code: "LIVRAISON", type: "livraison", valeur: 100, labelAffiché: "Livraison offerte dès 50€ d'achat", actif: true }
];

export default promoCodes;
