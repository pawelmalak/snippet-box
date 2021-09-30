import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Snippet } from '../../typescript/interfaces';
import { dateParser, badgeColor } from '../../utils';
import { Badge, Button, Card } from '../UI';
import { SnippetsContext } from '../../store';
import copy from 'clipboard-copy';
import { SnippetPin } from './SnippetPin';

interface Props {
  snippet: Snippet;
}

export const SnippetCard = (props: Props): JSX.Element => {
  const { title, description, language, code, id, createdAt, isPinned } =
    props.snippet;
  const { setSnippet } = useContext(SnippetsContext);

  const copyHandler = () => {
    copy(code);
  };

  return (
    <Card classes='h-100' bodyClasses='d-flex flex-column'>
      {/* TITLE */}
      <h5 className='card-title d-flex align-items-center justify-content-between'>
        {title}
        <SnippetPin id={id} isPinned={isPinned} />
      </h5>

      <h6 className='card-subtitle mb-2 text-muted'>
        {/* LANGUAGE */}
        <Badge text={language} color={badgeColor(language)} />
      </h6>

      {/* DESCRIPTION */}
      <p>{description ? description : 'No description'}</p>

      <div className='mt-auto'>
        {/* UPDATE DATE */}
        <p>Created {dateParser(createdAt).relative}</p>
        <hr />

        {/* ACTIONS */}
        <div className='d-flex justify-content-end'>
          <Link
            to={{
              pathname: `/snippet/${id}`,
              state: { from: window.location.pathname }
            }}
          >
            <Button
              text='View'
              color='secondary'
              small
              outline
              classes='me-2'
              handler={() => {
                setSnippet(id);
              }}
            />
          </Link>
          <Button
            text='Copy code'
            color='secondary'
            small
            handler={copyHandler}
          />
        </div>
      </div>
    </Card>
  );
};
