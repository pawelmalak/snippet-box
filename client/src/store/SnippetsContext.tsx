import { useState, createContext } from 'react';
import axios from 'axios';
import {
  Context,
  Snippet,
  Response,
  LanguageCount
} from '../typescript/interfaces';

export const SnippetsContext = createContext<Context>({
  snippets: [],
  languageCount: [],
  getSnippets: () => {},
  countSnippets: () => {}
});

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const SnippetsContextProvider = (props: Props): JSX.Element => {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [languageCount, setLanguageCount] = useState<LanguageCount[]>([]);

  const getSnippets = (): void => {
    axios
      .get<Response<Snippet[]>>('/api/snippets')
      .then(res => setSnippets(res.data.data))
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
    languageCount,
    getSnippets,
    countSnippets
  };

  return (
    <SnippetsContext.Provider value={context}>
      {props.children}
    </SnippetsContext.Provider>
  );
};
