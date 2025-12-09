// FILE: lib/utils.ts
// Create this new file: lib/utils.ts
// This is a helper for merging Tailwind classes

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind classes properly
 * Combines clsx and tailwind-merge for proper class merging
 * 
 * Usage:
 * cn("px-4 py-2", condition && "bg-blue-500", "text-white")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}