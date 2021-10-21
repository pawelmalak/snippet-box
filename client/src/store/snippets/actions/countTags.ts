import { SetStateAction } from 'react';
import { errorHandler } from '../../../utils';
import { Response, TagCount } from '../../../typescript/interfaces';
import axios from 'axios';

interface Params {
  setTagCount: (v: SetStateAction<TagCount[]>) => void;
}

export const countTagsAction = async (params: Params) => {
  const { setTagCount } = params;

  const token = `Bearer ${localStorage.token}`;

  try {
    const res = await axios.get<Response<TagCount[]>>(
      '/api/snippets/statistics/count',
      {
        headers: {
          Authorization: token
        }
      }
    );

    setTagCount(res.data.data);
  } catch (err) {
    errorHandler(err);
  }
};
