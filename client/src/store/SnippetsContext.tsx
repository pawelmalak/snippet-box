import { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Context,
  Snippet,
  Response,
  LanguageCount,
  NewSnippet
} from '../typescript/interfaces';

export const SnippetsContext = createContext<Context>({
  snippets: [],
  currentSnippet: null,
  languageCount: [],
  getSnippets: () => {},
  getSnippetById: (id: number) => {},
  setSnippet: (id: number) => {},
  createSnippet: (snippet: NewSnippet) => {},
  countSnippets: () => {}
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const SnippetsContextProvider = (props: Props): JSX.Element => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [currentSnippet, setCurrentSnippet] = useState<Snippet | null>(null);
  const [languageCount, setLanguageCount] = useState<LanguageCount[]>([]);

  const history = useHistory();

  const getSnippets = (): void => {
    axios
      .get<Response<Snippet[]>>('/api/snippets')
      .then(res => setSnippets(res.data.data))
      .catch(err => console.log(err));
  };

  const getSnippetById = (id: number): void => {
    axios
      .get<Response<Snippet>>(`/api/snippets/${id}`)
      .then(res => setCurrentSnippet(res.data.data))
      .catch(err => console.log(err));
  };

  const setSnippet = (id: number): void => {
    if (id < 0) {
      setCurrentSnippet(null);
      return;
    }

    const snippet = snippets.find(s => s.id === id);

    if (snippet) {
      setCurrentSnippet(snippet);
    }
  };

  const createSnippet = (snippet: NewSnippet): void => {
    axios
      .post<Response<Snippet>>('/api/snippets', snippet)
      .then(res => {
        setSnippets([...snippets, res.data.data]);
        setCurrentSnippet(res.data.data);
        history.push(`/snippet/${res.data.data.id}`);
      })
      .catch(err => console.log(err));
  };

  const countSnippets = (): void => {
    axios
      .get<Response<LanguageCount[]>>('/api/snippets/statistics/count')
      .then(res => setLanguageCount(res.data.data))
      .catch(err => console.log(err));
  };

  const context = {
    snippets,
    currentSnippet,
    languageCount,
    getSnippets,
    getSnippetById,
    setSnippet,
    createSnippet,
    countSnippets
  };

  return (
    <SnippetsContext.Provider value={context}>
      {props.children}
    </SnippetsContext.Provider>
  );
};
