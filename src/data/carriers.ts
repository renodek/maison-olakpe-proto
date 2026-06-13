import { Carrier } from "./types";

const carriers: Carrier[] = [
  { id: "cr1", nom: "Colissimo Standard", delai: "3-5 jours ouvrés", tarif: 5.90, gratuitAuDessusDe: 50, icone: "truck" },
  { id: "cr2", nom: "Colissimo Express", delai: "1-2 jours ouvrés", tarif: 9.90, gratuitAuDessusDe: 80, icone: "fast" },
  { id: "cr3", nom: "Point Relais", delai: "3-5 jours ouvrés", tarif: 3.90, gratuitAuDessusDe: 45, icone: "map-pin" }
];

export default carriers;
