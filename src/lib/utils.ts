import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne des classes Tailwind conditionnelles sans conflits.
 * Combine clsx (conditions) + tailwind-merge (résolution de conflits).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
