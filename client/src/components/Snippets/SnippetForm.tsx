import { ChangeEvent, FormEvent, Fragment, useState, useContext } from 'react';
import { SnippetsContext } from '../../store';
import { NewSnippet } from '../../typescript/interfaces';
import { Button, Card } from '../UI';

export const SnippetForm = (): JSX.Element => {
  const { createSnippet } = useContext(SnippetsContext);

  const [formData, setFormData] = useState<NewSnippet>({
    title: '',
    description: '',
    language: '',
    code: '',
    docs: ''
  });

  const inputHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formHandler = (e: FormEvent) => {
    e.preventDefault();
    createSnippet(formData);
  };

  return (
    <Fragment>
      <div className='col-12 mt-3'>
        <Card>
          <form onSubmit={e => formHandler(e)}>
            {/* DETAILS SECTION */}
            <h5 className='card-title mb-3'>Snippet details</h5>

            {/* TITLE */}
            <div className='mb-3'>
              <label htmlFor='title' className='form-label'>
                Title
              </label>
              <input
                type='text'
                className='form-control'
                id='title'
                name='title'
                value={formData.title}
                placeholder='Recursively copy all files'
                required
                onChange={e => inputHandler(e)}
              />
            </div>

            {/* DESCRIPTION */}
            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>
                Short description
              </label>
              <input
                type='text'
                className='form-control'
                id='description'
                name='description'
                value={formData.description}
                placeholder='Bash script to copy all files from src to dest'
                onChange={e => inputHandler(e)}
              />
            </div>

            {/* LANGUAGE */}
            <div className='mb-3'>
              <label htmlFor='language' className='form-label'>
                Language
              </label>
              <input
                type='text'
                className='form-control'
                id='language'
                name='language'
                value={formData.language}
                placeholder='bash'
                required
                onChange={e => inputHandler(e)}
              />
            </div>
            <hr />

            {/* CODE SECTION */}
            <h5 className='card-title mb-3'>Snippet code</h5>
            <div className='mb-3'>
              <textarea
                className='form-control'
                id='code'
                name='code'
                rows={10}
                value={formData.code}
                placeholder='cp -r ./src ./dest'
                required
                onChange={e => inputHandler(e)}
              ></textarea>
            </div>
            <hr />

            {/* DOCS SECTION */}
            <h5 className='card-title mb-3'>Snippet documentation</h5>
            <div className='mb-3'>
              <textarea
                className='form-control'
                id='docs'
                name='docs'
                rows={10}
                value={formData.docs}
                placeholder='`-r` flag stands for `--recursive`'
                onChange={e => inputHandler(e)}
              ></textarea>
            </div>

            {/* SUBMIT SECTION */}
            <div className='d-grid'>
              <Button text='Create snippet' color='dark' type='submit' />
            </div>
          </form>
        </Card>
      </div>
    </Fragment>
  );
};
