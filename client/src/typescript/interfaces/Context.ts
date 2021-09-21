import { LanguageCount, Snippet } from '.';

export interface Context {
  snippets: Snippet[];
  languageCount: LanguageCount[];
  getSnippets: () => void;
  countSnippets: () => void;
}
