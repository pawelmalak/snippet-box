import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Snippet } from '../../typescript/interfaces';
import { dateParser, badgeColor } from '../../utils';
import { Badge, Button, Card } from '../UI';
import { SnippetsContext } from '../../store';
import Icon from '@mdi/react';
import { mdiPin } from '@mdi/js';

interface Props {
  snippet: Snippet;
}

export const SnippetCard = (props: Props): JSX.Element => {
  const { title, description, language, code, id, updatedAt, isPinned } =
    props.snippet;
  const { setSnippet } = useContext(SnippetsContext);

  const copyHandler = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Card>
      {/* TITLE */}
      <h5 className='card-title d-flex align-items-center justify-content-between'>
        {title}
        {isPinned ? <Icon path={mdiPin} size={0.8} color='#212529' /> : ''}
      </h5>

      {/* UPDATE DATE */}
      <h6 className='card-subtitle mb-2 text-muted'>
        {dateParser(updatedAt).relative}
      </h6>

      {/* DESCRIPTION */}
      <p className='text-truncate'>
        {description ? description : 'No description'}
      </p>

      {/* LANGUAGE */}
      <Badge text={language} color={badgeColor(language)} />
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
