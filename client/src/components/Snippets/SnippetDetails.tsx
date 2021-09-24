import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SnippetsContext } from '../../store';
import { Snippet } from '../../typescript/interfaces';
import { dateParser } from '../../utils';
import { Button, Card } from '../UI';
import Icon from '@mdi/react';
import { mdiPin } from '@mdi/js';
import copy from 'clipboard-copy';

interface Props {
  snippet: Snippet;
}

export const SnippetDetails = (props: Props): JSX.Element => {
  const {
    title,
    language,
    createdAt,
    updatedAt,
    description,
    code,
    id,
    isPinned
  } = props.snippet;

  const { deleteSnippet, toggleSnippetPin, setSnippet } =
    useContext(SnippetsContext);

  const creationDate = dateParser(createdAt);
  const updateDate = dateParser(updatedAt);

  const copyHandler = () => {
    copy(code);
  };

  return (
    <Card>
      <h5 className='card-title d-flex align-items-center justify-content-between'>
        {title}
        {isPinned ? <Icon path={mdiPin} size={0.8} color='#212529' /> : ''}
      </h5>
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
          <Button
            text='Edit'
            color='dark'
            small
            outline
            classes='me-3'
            handler={() => setSnippet(id)}
          />
        </Link>
        <Button
          text={`${isPinned ? 'Unpin snippet' : 'Pin snippet'}`}
          color='dark'
          small
          outline
          handler={() => toggleSnippetPin(id)}
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
