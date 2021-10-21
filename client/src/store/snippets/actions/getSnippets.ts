import { SetStateAction } from 'react';
import { errorHandler } from '../../../utils';
import { Response, Snippet } from '../../../typescript/interfaces';
import axios from 'axios';

interface Params {
  setSnippets: (v: SetStateAction<Snippet[]>) => void;
}

export const getSnippetsAction = async (params: Params) => {
  const { setSnippets } = params;

  const token = `Bearer ${localStorage.token}`;

  try {
    const res = await axios.get<Response<Snippet[]>>('/api/snippets', {
      headers: {
        Authorization: token
      }
    });

    setSnippets(res.data.data);
  } catch (err) {
    errorHandler(err);
  }
};
