import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
export const formatDate = (dateStr: string) => {
	const date = new Date(dateStr)
	const formatter = new Intl.DateTimeFormat("id-ID", {
		dateStyle: "medium",
	})
	return formatter.format(date)
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
 }