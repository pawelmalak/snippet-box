export const colors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'light',
  'dark'
] as const;

export type Color = typeof colors[number];
