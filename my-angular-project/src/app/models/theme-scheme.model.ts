export interface ThemeScheme {
   readonly name: string;
   readonly value: string;
}

export const THEME_SCHEMES: ThemeScheme[] = [
   { value: 'light', name: 'Light' },
   { value: 'dark', name: 'Dark' },
   { value: 'light-dark', name: 'Light & Dark' },
]