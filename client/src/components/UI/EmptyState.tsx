import { Link } from 'react-router-dom';

export const EmptyState = (): JSX.Element => {
  const editorLink = (
    <Link to='/editor' className='fw-bold text-success text-decoration-none'>
      <span>editor</span>
    </Link>
  );

  return (
    <div className='col-12 d-flex flex-column align-items-center'>
      <h4>You currently don't have any snippets</h4>
      <p>Go to the {editorLink} and create one</p>
    </div>
  );
};
