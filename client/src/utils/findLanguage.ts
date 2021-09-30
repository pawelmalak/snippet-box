import { aliases } from '../data/aliases_raw.json';

export const findLanguage = (language: string): boolean => {
  const search = language.toLowerCase();
  return aliases.some(alias => alias === search);
};
