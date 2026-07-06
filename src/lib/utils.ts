import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function camelCaseToLabel(string: string) {
  return string.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (str) => str.toUpperCase());
}

export const getBasePath = (path: string) => {
  const parts = path.split("/");
  const videoIndex = parts.indexOf("videos");
  return parts.slice(0, videoIndex + 1).join("/");
};