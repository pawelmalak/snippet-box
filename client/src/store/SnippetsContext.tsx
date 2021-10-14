import { useState, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Context,
  Snippet,
  Response,
  TagCount,
  NewSnippet,
  SearchQuery
} from '../typescript/interfaces';

export const SnippetsContext = createContext<Context>({
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
  searchSnippets: (query: SearchQuery) => {}
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const SnippetsContextProvider = (props: Props): JSX.Element => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchResults, setSearchResults] = useState<Snippet[]>([]);
  const [currentSnippet, setCurrentSnippet] = useState<Snippet | null>(null);
  const [tagCount, setTagCount] = useState<TagCount[]>([]);

  const history = useHistory();

  const redirectOnError = () => {
    history.push('/');
  };

  const getSnippets = (): void => {
    axios
      .get<Response<Snippet[]>>('/api/snippets')
      .then(res => setSnippets(res.data.data))
      .catch(err => redirectOnError());
  };

  const getSnippetById = (id: number): void => {
    axios
      .get<Response<Snippet>>(`/api/snippets/${id}`)
      .then(res => setCurrentSnippet(res.data.data))
      .catch(err => redirectOnError());
  };

  const setSnippet = (id: number): void => {
    if (id < 0) {
      setCurrentSnippet(null);
      return;
    }

    getSnippetById(id);

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
        history.push({
          pathname: `/snippet/${res.data.data.id}`,
          state: { from: '/snippets' }
        });
      })
      .catch(err => redirectOnError());
  };

  const updateSnippet = (
    snippet: NewSnippet,
    id: number,
    isLocal?: boolean
  ): void => {
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

        if (!isLocal) {
          history.push({
            pathname: `/snippet/${res.data.data.id}`,
            state: { from: '/snippets' }
          });
        }
      })
      .catch(err => redirectOnError());
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
        .catch(err => redirectOnError());
    }
  };

  const toggleSnippetPin = (id: number): void => {
    const snippet = snippets.find(s => s.id === id);

    if (snippet) {
      updateSnippet({ ...snippet, isPinned: !snippet.isPinned }, id, true);
    }
  };

  const countTags = (): void => {
    axios
      .get<Response<TagCount[]>>('/api/snippets/statistics/count')
      .then(res => setTagCount(res.data.data))
      .catch(err => redirectOnError());
  };

  const searchSnippets = (query: SearchQuery): void => {
    axios
      .post<Response<Snippet[]>>('/api/snippets/search', query)
      .then(res => {
        setSearchResults(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => console.log(err));
  };

  const context = {
    snippets,
    searchResults,
    currentSnippet,
    tagCount,
    getSnippets,
    getSnippetById,
    setSnippet,
    createSnippet,
    updateSnippet,
    deleteSnippet,
    toggleSnippetPin,
    countTags,
    searchSnippets
  };

  return (
    <SnippetsContext.Provider value={context}>
      {props.children}
    </SnippetsContext.Provider>
  );
};
