import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAddress = (address: string) => {
  return address.slice(0, 5) + "..." + address.slice(-5);
};

export const formatTime = (time: Date) => {
  return time.toDateString();
};
