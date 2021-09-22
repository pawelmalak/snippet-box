import { LanguageCount, NewSnippet, Snippet } from '.';

export interface Context {
  snippets: Snippet[];
  currentSnippet: Snippet | null;
  languageCount: LanguageCount[];
  getSnippets: () => void;
  getSnippetById: (id: number) => void;
  setSnippet: (id: number) => void;
  createSnippet: (snippet: NewSnippet) => void;
  countSnippets: () => void;
}
