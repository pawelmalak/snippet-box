import { SetStateAction } from 'react';
import { errorHandler } from '../../../utils';
import { Response, Snippet } from '../../../typescript/interfaces';
import axios from 'axios';

interface Params {
  id: number;
  setCurrentSnippet: (v: SetStateAction<Snippet | null>) => void;
}

export const getSnippetByIdAction = async (params: Params) => {
  const { id, setCurrentSnippet } = params;

  const token = `Bearer ${localStorage.token}`;

  try {
    const res = await axios.get<Response<Snippet>>(`/api/snippets/${id}`, {
      headers: {
        Authorization: token
      }
    });

    setCurrentSnippet(res.data.data);
  } catch (err) {
    errorHandler(err);
  }
};
