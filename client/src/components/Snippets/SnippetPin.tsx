import { useContext } from 'react';
import { SnippetsContext } from '../../store';
import Icon from '@mdi/react';
import { mdiPin, mdiPinOutline } from '@mdi/js';

interface Props {
  id: number;
  isPinned: boolean;
}

export const SnippetPin = (props: Props): JSX.Element => {
  const { toggleSnippetPin } = useContext(SnippetsContext);
  const { id, isPinned } = props;

  return (
    <div onClick={() => toggleSnippetPin(id)} className='cursor-pointer'>
      {isPinned ? (
        <Icon path={mdiPin} size={0.8} color='#212529' />
      ) : (
        <Icon path={mdiPinOutline} size={0.8} color='#9a9a9a' />
      )}
    </div>
  );
};
