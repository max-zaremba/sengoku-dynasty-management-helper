import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
}

export const exhaustiveSwitch = (_: never, message?: string): never => {
	throw new Error(`Exhaustive Switch Error${message ? `: ${message}` : '.'}`);
}
