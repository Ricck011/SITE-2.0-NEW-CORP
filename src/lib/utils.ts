import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// O React 18 só repassa esse atributo ao HTML escrito em minúsculo; em
// camelCase (fetchPriority) ele funciona mas enche o console de aviso.
export function fetchPriority(priority: "high" | undefined): Record<string, string> {
  return priority ? { fetchpriority: priority } : {};
}
