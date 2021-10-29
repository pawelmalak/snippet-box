import { useState, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { SnippetsContext } from '..';

import {
  countTagsAction,
  createSnippetAction,
  deleteSnippetAction,
  getSnippetByIdAction,
  getSnippetsAction,
  searchSnippetsAction,
  updateSnippetAction
} from './actions';

import {
  SnippetsContext as Context,
  Snippet,
  TagCount,
  NewSnippet,
  SearchQuery
} from '../../typescript/interfaces';

interface Props {
  children: ReactNode;
}

export const SnippetsContextProvider = (props: Props): JSX.Element => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchResults, setSearchResults] = useState<Snippet[]>([]);
  const [currentSnippet, setCurrentSnippet] = useState<Snippet | null>(null);
  const [tagCount, setTagCount] = useState<TagCount[]>([]);

  const history = useHistory();

  const getSnippets = async () => {
    await getSnippetsAction({ setSnippets });
  };

  const getSnippetById = async (id: number) => {
    await getSnippetByIdAction({ id, setCurrentSnippet });
  };

  const setSnippet = (id: number) => {
    if (id < 0) {
      setCurrentSnippet(null);
      return;
    }

    const snippet = snippets.find(s => s.id === id);

    if (snippet) {
      setCurrentSnippet(snippet);
    }
  };

  const createSnippet = async (snippet: NewSnippet) => {
    const id = await createSnippetAction({
      snippet,
      snippets,
      setCurrentSnippet,
      setSnippets
    });

    if (id) {
      history.push({
        pathname: `/snippet/${id}`,
        state: { from: '/snippets' }
      });
    }
  };

  const updateSnippet = async (
    snippet: NewSnippet,
    id: number,
    isLocal?: boolean
  ) => {
    await updateSnippetAction({
      id,
      snippet,
      snippets,
      setSnippets,
      setCurrentSnippet
    });

    if (!isLocal) {
      history.push({
        pathname: `/snippet/${id}`,
        state: { from: '/snippets' }
      });
    }
  };

  const deleteSnippet = async (id: number) => {
    await deleteSnippetAction({ id, snippets, setSnippets, setSnippet });
    history.push('/snippets');
  };

  const countTags = async () => {
    await countTagsAction({ setTagCount });
  };

  const searchSnippets = async (query: SearchQuery) => {
    await searchSnippetsAction({ query, setSearchResults });
  };

  const toggleSnippetPin = async (id: number) => {
    const snippet = snippets.find(s => s.id === id);

    if (snippet) {
      await updateSnippet(
        { ...snippet, isPinned: !snippet.isPinned },
        id,
        true
      );
    }
  };

  const clearOnLogout = () => {
    setCurrentSnippet(null);
    setTagCount([]);
    setSnippets([]);
  };

  const context: Context = {
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
    searchSnippets,
    clearOnLogout
  };

  return (
    <SnippetsContext.Provider value={context}>
      {props.children}
    </SnippetsContext.Provider>
  );
};
