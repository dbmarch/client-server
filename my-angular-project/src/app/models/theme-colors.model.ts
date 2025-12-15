export interface ThemeColors {
   readonly name: string;
   readonly primary: string;
   readonly accent: string;
}

export const THEME_COLORS: ThemeColors[] = [
   { primary: 'azure', accent: 'rose', name: 'Azure'},
   { primary: 'red',  accent: 'pink', name: 'Red'},
   { primary: 'purple', accent: 'orange', name: 'Purple'},
   { primary: 'green', accent: 'teal', name: 'Green'},
]  
