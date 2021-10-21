import { SetStateAction } from 'react';
import { errorHandler } from '../../../utils';
import { Response, Snippet, NewSnippet } from '../../../typescript/interfaces';
import axios from 'axios';

interface Params {
  id: number;
  snippet: NewSnippet;
  snippets: Snippet[];
  setSnippets: (v: SetStateAction<Snippet[]>) => void;
  setCurrentSnippet: (v: SetStateAction<Snippet | null>) => void;
}

export const updateSnippetAction = async (params: Params) => {
  const { id, snippet, snippets, setSnippets, setCurrentSnippet } = params;

  const token = `Bearer ${localStorage.token}`;

  try {
    const res = await axios.put<Response<Snippet>>(
      `/api/snippets/${id}`,
      snippet,
      {
        headers: {
          Authorization: token
        }
      }
    );

    const oldSnippetIdx = snippets.findIndex(s => s.id === id);

    setSnippets([
      ...snippets.slice(0, oldSnippetIdx),
      res.data.data,
      ...snippets.slice(oldSnippetIdx + 1)
    ]);

    setCurrentSnippet(res.data.data);
  } catch (err) {
    errorHandler(err);
  }
};
