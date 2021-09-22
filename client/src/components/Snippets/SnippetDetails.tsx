import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SnippetsContext } from '../../store';
import { Snippet } from '../../typescript/interfaces';
import { dateParser } from '../../utils';
import { Button, Card } from '../UI';

interface Props {
  snippet: Snippet;
}

export const SnippetDetails = (props: Props): JSX.Element => {
  const { title, language, createdAt, updatedAt, description, code, id } =
    props.snippet;

  const { deleteSnippet } = useContext(SnippetsContext);

  const creationDate = dateParser(createdAt);
  const updateDate = dateParser(updatedAt);

  const copyHandler = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Card title={title}>
      <p>{description}</p>

      {/* LANGUAGE */}
      <div className={`d-flex justify-content-between`}>
        <span>Language</span>
        <span className='fw-bold'>{language}</span>
      </div>

      {/* CREATED AT */}
      <div className={`d-flex justify-content-between`}>
        <span>Created</span>
        <span>{creationDate.relative}</span>
      </div>

      {/* UPDATED AT */}
      <div className={`d-flex justify-content-between`}>
        <span>Last updated</span>
        <span>{updateDate.relative}</span>
      </div>

      <hr />

      {/* ACTIONS */}
      <div className='d-flex justify-content-between'>
        <Link
          to={{
            pathname: `/editor/${id}`,
            state: { from: window.location.pathname }
          }}
        >
          <Button text='Edit' color='dark' small outline classes='me-3' />
        </Link>
        <Button
          text='Pin snippet'
          color='dark'
          small
          outline
          handler={copyHandler}
          classes='me-3'
        />
        <Button
          text='Delete'
          color='danger'
          small
          outline
          handler={() => deleteSnippet(id)}
        />
      </div>

      <hr />

      {/* COPY */}
      <div className='d-grid'>
        <Button text='Copy code' color='dark' small handler={copyHandler} />
      </div>
    </Card>
  );
};
