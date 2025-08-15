// DARK MODE - Grayscale palette
export const colors = {
  // Backgrounds
  background: '#09090b',      // zinc-950
  surface: '#18181b',         // zinc-900
  card: '#27272a',           // zinc-800
  
  // Borders
  border: '#3f3f46',         // zinc-700
  borderLight: '#52525b',    // zinc-600
  
  // Text
  text: '#fafafa',           // zinc-50
  textSecondary: '#a1a1aa',  // zinc-400
  textMuted: '#71717a',      // zinc-500
  
  // Accents (still grayscale)
  primary: '#fafafa',        // white for primary actions
  primaryDark: '#e4e4e7',    // zinc-200
  danger: '#ef4444',         // keeping red for delete only
  
  // Input
  inputBg: '#18181b',        // zinc-900
  inputBorder: '#3f3f46',    // zinc-700
  inputFocus: '#71717a',     // zinc-500
};


export function combineStyles(...styles: any[]) {
  return styles.filter(Boolean);
}
