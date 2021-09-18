import { ReactJs } from '@icons-pack/react-simple-icons';

interface Props {}

export const Badge = (props: Props): JSX.Element => {
  const Icon = require('@icons-pack/react-simple-icons/lib/components/Youtube');

  return (
    <span className='badge bg-primary'>
      <ReactJs color='#61dafb' size={24} />
      New
    </span>
  );
};
