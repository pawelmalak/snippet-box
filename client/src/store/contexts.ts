import { createContext } from 'react';

import {
  SnippetsContext as SnippetsContextInterface,
  AuthContext as AuthContextInterface,
  NewSnippet,
  SearchQuery
} from '../typescript/interfaces';

export const SnippetsContext = createContext<SnippetsContextInterface>({
  snippets: [],
  searchResults: [],
  currentSnippet: null,
  tagCount: [],
  getSnippets: () => {},
  getSnippetById: (id: number) => {},
  setSnippet: (id: number) => {},
  createSnippet: (snippet: NewSnippet) => {},
  updateSnippet: (snippet: NewSnippet, id: number, isLocal?: boolean) => {},
  deleteSnippet: (id: number) => {},
  toggleSnippetPin: (id: number) => {},
  countTags: () => {},
  searchSnippets: (query: SearchQuery) => {},
  clearOnLogout: () => {}
});

export const AuthContext = createContext<AuthContextInterface>({
  isAuthenticated: false,
  user: null,
  autoLogin: () => {},
  login: () => {},
  logout: () => {},
  register: () => {}
});
