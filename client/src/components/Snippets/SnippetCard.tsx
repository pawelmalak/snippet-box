import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Snippet } from '../../typescript/interfaces';
import { dateParser } from '../../utils';
import { Badge, Button, Card } from '../UI';
import { SnippetsContext } from '../../store';

interface Props {
  snippet: Snippet;
}

export const SnippetCard = (props: Props): JSX.Element => {
  const { title, description, language, code, id, updatedAt } = props.snippet;
  const { setSnippet } = useContext(SnippetsContext);

  const copyHandler = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Card title={title}>
      <h6 className='card-subtitle mb-2 text-muted'>
        {dateParser(updatedAt).relative}
      </h6>
      <p className='text-truncate'>
        {description ? description : 'No description'}
      </p>
      <Badge text={language} color='success' />
      <hr />
      <div className='d-flex justify-content-end'>
        <Link
          to={{
            pathname: `/snippet/${id}`,
            state: { from: window.location.pathname }
          }}
        >
          <Button
            text='View'
            color='dark'
            small
            outline
            classes='me-2'
            handler={() => {
              setSnippet(id);
            }}
          />
        </Link>
        <Button text='Copy code' color='dark' small handler={copyHandler} />
      </div>
    </Card>
  );
};
