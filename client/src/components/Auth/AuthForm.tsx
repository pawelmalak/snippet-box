import { ChangeEvent, FormEvent, useState, useContext, Fragment } from 'react';
import { AuthContext } from '../../store';
import { Button } from '../UI';

export const AuthForm = (): JSX.Element => {
  const [isInLogin, setIsInLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, register } = useContext(AuthContext);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const formHandler = (e: FormEvent) => {
    e.preventDefault();

    if (isInLogin) {
      login(formData);
    } else {
      register(formData);
    }
  };

  return (
    <Fragment>
      <h5 className='card-title'>{isInLogin ? 'Login' : 'Register'}</h5>
      <p className=''>
        {isInLogin ? "Don't have an account yet?" : 'Already a user?'}
        <span
          onClick={() => setIsInLogin(!isInLogin)}
          className='text-success cursor-pointer'
        >
          {isInLogin ? ' Sign Up' : ' Login'}
        </span>
      </p>
      <hr />

      <form onSubmit={e => formHandler(e)}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            placeholder='john@doe.com'
            required
            autoComplete='email'
            value={formData.email}
            onChange={e => inputHandler(e)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            name='password'
            placeholder='••••••'
            required
            autoComplete='current-password'
            value={formData.password}
            onChange={e => inputHandler(e)}
          />
        </div>

        <hr />
        <div className='d-grid gap-2'>
          <Button
            text={isInLogin ? 'Login' : 'Register'}
            color='secondary'
            type='submit'
            outline
          />
        </div>
      </form>
    </Fragment>
  );
};
