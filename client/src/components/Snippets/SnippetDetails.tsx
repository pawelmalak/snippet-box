import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SnippetsContext } from '../../store';
import { Snippet } from '../../typescript/interfaces';
import { dateParser } from '../../utils';
import { Badge, Button, Card } from '../UI';
import copy from 'clipboard-copy';
import { SnippetPin } from './SnippetPin';

interface Props {
  snippet: Snippet;
}

export const SnippetDetails = (props: Props): JSX.Element => {
  const {
    title,
    language,
    tags,
    createdAt,
    updatedAt,
    description,
    code,
    id,
    isPinned
  } = props.snippet;

  const history = useHistory();

  const { deleteSnippet, setSnippet } = useContext(SnippetsContext);

  const creationDate = dateParser(createdAt);
  const updateDate = dateParser(updatedAt);

  const copyHandler = () => {
    copy(code);
  };

  return (
    <Card>
      <h5 className='card-title d-flex align-items-center justify-content-between'>
        {title}
        <SnippetPin id={id} isPinned={isPinned} />
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

      {/* TAGS */}
      <div>
        {tags.map((tag, idx) => (
          <span className='me-2' key={idx}>
            <Badge text={tag} color='dark' />
          </span>
        ))}
      </div>
      <hr />

      {/* ACTIONS */}
      <div className='d-grid g-2' style={{ rowGap: '10px' }}>
        <Button
          text='Edit'
          color='dark'
          small
          outline
          handler={() => {
            setSnippet(id);
            history.push({
              pathname: `/editor/${id}`,
              state: { from: window.location.pathname }
            });
          }}
        />
        <Button
          text='Delete'
          color='danger'
          small
          outline
          handler={() => deleteSnippet(id)}
        />
        <Button text='Copy code' color='dark' small handler={copyHandler} />
      </div>
    </Card>
  );
};
