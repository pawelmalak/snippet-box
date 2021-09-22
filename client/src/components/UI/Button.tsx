import { Color } from '../../typescript/types';

interface Props {
  text: string;
  color: Color;
  outline?: boolean;
  small?: boolean;
  handler?: () => void;
  classes?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = (props: Props): JSX.Element => {
  const {
    text,
    color,
    outline = false,
    small = false,
    handler,
    classes = '',
    type = 'button'
  } = props;

  const elClasses = [
    'btn',
    outline ? `btn-outline-${color}` : `btn-${color}`,
    small && 'btn-sm',
    classes
  ];

  return (
    <button type={type} className={elClasses.join(' ')} onClick={handler}>
      {text}
    </button>
  );
};
