import { SetStateAction } from 'react';
import { errorHandler } from '../../../utils';
import { NewSnippet, Response, Snippet } from '../../../typescript/interfaces';
import axios from 'axios';

interface Params {
  snippet: NewSnippet;
  snippets: Snippet[];
  setSnippets: (v: SetStateAction<Snippet[]>) => void;
  setCurrentSnippet: (v: SetStateAction<Snippet | null>) => void;
}

export const createSnippetAction = async (
  params: Params
): Promise<number | undefined> => {
  const { snippet, snippets, setSnippets, setCurrentSnippet } = params;

  const token = `Bearer ${localStorage.token}`;

  try {
    const res = await axios.post<Response<Snippet>>('/api/snippets', snippet, {
      headers: {
        Authorization: token
      }
    });

    setSnippets([...snippets, res.data.data]);
    setCurrentSnippet(res.data.data);

    return res.data.data.id;
  } catch (err) {
    errorHandler(err);
  }
};
