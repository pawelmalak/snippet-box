import { SetStateAction } from 'react';
import { errorHandler } from '../../../utils';
import { Response, Snippet } from '../../../typescript/interfaces';
import axios from 'axios';

interface Params {
  id: number;
  snippets: Snippet[];
  setSnippets: (v: SetStateAction<Snippet[]>) => void;
  setSnippet: (id: number) => void;
}

export const deleteSnippetAction = async (params: Params) => {
  const { id, snippets, setSnippets, setSnippet } = params;

  const token = `Bearer ${localStorage.token}`;

  if (window.confirm('Are you sure you want to delete this snippet?')) {
    try {
      await axios.delete<Response<{}>>(`/api/snippets/${id}`, {
        headers: {
          Authorization: token
        }
      });

      const deletedSnippetIdx = snippets.findIndex(s => s.id === id);

      setSnippets([
        ...snippets.slice(0, deletedSnippetIdx),
        ...snippets.slice(deletedSnippetIdx + 1)
      ]);

      setSnippet(-1);
    } catch (err) {
      errorHandler(err);
    }
  }
};
