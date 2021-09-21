import { Link } from 'react-router-dom';

interface Props {
  title: string;
  prevDest?: string;
}

export const PageHeader = (props: Props): JSX.Element => {
  const { title, prevDest } = props;

  return (
    <div className='col-12'>
      <h2>{title}</h2>
      {prevDest && (
        <h6>
          <Link to={prevDest} className='text-decoration-none text-dark'>
            &lt;- Go back
          </Link>
        </h6>
      )}
    </div>
  );
};
