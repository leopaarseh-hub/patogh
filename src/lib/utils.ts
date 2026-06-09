import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...i: ClassValue[]) => twMerge(clsx(i));
export const fmt = (n: number) => Number.isInteger(n) ? `${n}€` : `${n.toFixed(1).replace('.',',')}€`;
export const ff  = (rtl: boolean) => rtl ? "'Vazirmatn','Tahoma',sans-serif" : "'Inter','Helvetica',sans-serif";
export const PHONE = '0211 26107041';
export const IG    = 'patogh2026';
export const WA    = 'https://wa.me/492112610741';
export const ADDR  = 'Reisholzer Str. 25, 40231 Düsseldorf';
