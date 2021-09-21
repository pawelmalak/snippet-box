import { Color } from '../../typescript/types';

interface Props {
  text: string;
  color: Color;
}

export const Badge = (props: Props): JSX.Element => {
  const { text, color } = props;

  return <span className={`badge bg-${color}`}>{text}</span>;
};
