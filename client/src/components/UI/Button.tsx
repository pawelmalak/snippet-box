import { Color } from '../../typescript/types';

interface Props {
  text: string;
  color: Color;
  outline?: boolean;
  small?: boolean;
  handler?: () => void;
}

export const Button = (props: Props): JSX.Element => {
  const { text, color, outline = false, small = false, handler } = props;

  const classes = [
    'btn',
    outline ? `btn-outline-${color}` : `btn-${color}`,
    small && 'btn-sm'
  ];

  return (
    <button type='button' className={classes.join(' ')} onClick={handler}>
      {text}
    </button>
  );
};
