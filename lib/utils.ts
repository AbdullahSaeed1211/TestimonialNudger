import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a random token for testimonial requests
 * @returns A base64 encoded random string
 */
export function generateToken(): string {
  const randomBytes = new Uint8Array(32); // 32 bytes = 256 bits
  crypto.getRandomValues(randomBytes);
  return Buffer.from(randomBytes).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
