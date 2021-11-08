import { AxiosError } from 'axios';

export const errorHandler = (err: any) => {
  const error = err as AxiosError<{ error: string }>;

  let msg: string;

  if (error.response) {
    msg = error.response.data.error;
  } else {
    msg = 'Something went wrong';
  }

  // todo: emit notification
  // redirect on error
  console.log(msg);
};
