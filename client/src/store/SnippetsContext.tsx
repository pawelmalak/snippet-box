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
  updateSnippet: (snippet: NewSnippet, id: number) => {},
  deleteSnippet: (id: number) => {},
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

  const updateSnippet = (snippet: NewSnippet, id: number): void => {
    axios
      .put<Response<Snippet>>(`/api/snippets/${id}`, snippet)
      .then(res => {
        const oldSnippetIdx = snippets.findIndex(s => s.id === id);
        setSnippets([
          ...snippets.slice(0, oldSnippetIdx),
          res.data.data,
          ...snippets.slice(oldSnippetIdx + 1)
        ]);
        setCurrentSnippet(res.data.data);
        history.push(`/snippet/${res.data.data.id}`, { from: '/snippets' });
      })
      .catch(err => console.log(err));
  };

  const deleteSnippet = (id: number): void => {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      axios
        .delete<Response<{}>>(`/api/snippets/${id}`)
        .then(res => {
          const deletedSnippetIdx = snippets.findIndex(s => s.id === id);
          setSnippets([
            ...snippets.slice(0, deletedSnippetIdx),
            ...snippets.slice(deletedSnippetIdx + 1)
          ]);
          setSnippet(-1);
          history.push('/snippets');
        })
        .catch(err => console.log(err));
    }
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
    updateSnippet,
    deleteSnippet,
    countSnippets
  };

  return (
    <SnippetsContext.Provider value={context}>
      {props.children}
    </SnippetsContext.Provider>
  );
};
