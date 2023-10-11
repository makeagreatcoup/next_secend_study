import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isMaster=(id: string | null | undefined)=>{
  return id=== process.env.NEXT_PUBLIC_MASTER_ID
}