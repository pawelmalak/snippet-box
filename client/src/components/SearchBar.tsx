import { useRef, useEffect, KeyboardEvent } from 'react';
import { searchParser } from '../utils';

export const SearchBar = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(document.createElement('input'));

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const inputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const rawQuery = searchParser(inputRef.current.value);
  };

  return (
    <div className='mb-3'>
      <input
        type='text'
        className='form-control'
        placeholder='card lang:typescript tags:ui,react'
        ref={inputRef}
        onKeyUp={e => inputHandler(e)}
      />
      <div className='form-text text-gray'>
        Submit search query by pressing `Enter`. Read more about available
        filters{' '}
        <a
          href='https://github.com/pawelmalak/snippet-box/wiki/Search-filters'
          target='_blank'
          rel='noreferrer'
          className='text-success text-decoration-none'
        >
          here
        </a>
      </div>
    </div>
  );
};
