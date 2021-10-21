import { SetStateAction } from 'react';
import { errorHandler } from '../../../utils';
import { SearchQuery, Response, Snippet } from '../../../typescript/interfaces';
import axios from 'axios';

interface Params {
  query: SearchQuery;
  setSearchResults: (v: SetStateAction<Snippet[]>) => void;
}

export const searchSnippetsAction = async (params: Params) => {
  const { query, setSearchResults } = params;

  const token = `Bearer ${localStorage.token}`;

  try {
    const res = await axios.post<Response<Snippet[]>>(
      '/api/snippets/search',
      query,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      }
    );

    setSearchResults(res.data.data);
  } catch (err) {
    errorHandler(err);
  }
};
