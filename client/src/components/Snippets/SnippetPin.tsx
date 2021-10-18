import { Fragment, useContext } from 'react';
import { SnippetsContext, AuthContext } from '../../store';
import Icon from '@mdi/react';
import { mdiPin, mdiPinOutline } from '@mdi/js';

interface Props {
  id: number;
  isPinned: boolean;
}

export const SnippetPin = (props: Props): JSX.Element => {
  const { toggleSnippetPin } = useContext(SnippetsContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { id, isPinned } = props;

  return (
    <Fragment>
      {isAuthenticated && (
        <div onClick={() => toggleSnippetPin(id)} className='cursor-pointer'>
          {isPinned ? (
            <Icon path={mdiPin} size={0.8} color='#20c997' />
          ) : (
            <Icon path={mdiPinOutline} size={0.8} color='#ced4da' />
          )}
        </div>
      )}
    </Fragment>
  );
};
