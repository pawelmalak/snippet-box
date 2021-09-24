import { LanguageCount, NewSnippet, Snippet } from '.';

export interface Context {
  snippets: Snippet[];
  currentSnippet: Snippet | null;
  languageCount: LanguageCount[];
  getSnippets: () => void;
  getSnippetById: (id: number) => void;
  setSnippet: (id: number) => void;
  createSnippet: (snippet: NewSnippet) => void;
  updateSnippet: (snippet: NewSnippet, id: number, isLocal?: boolean) => void;
  deleteSnippet: (id: number) => void;
  toggleSnippetPin: (id: number) => void;
  countSnippets: () => void;
}
