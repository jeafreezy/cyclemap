import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 *  Merges class names using clsx and tailwind-merge.
 * @param inputs - Class names to be merged.
 * @returns  - Merged class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
