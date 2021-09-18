import { Color } from '../../typescript/types';

interface Props {
  text: string;
  color: Color;
  outline?: boolean;
}

export const Button = (props: Props): JSX.Element => {
  const { text, color, outline = false } = props;

  const classes = ['btn', outline ? `btn-outline-${color}` : `btn-${color}`];

  return (
    <button type='button' className={classes.join(' ')}>
      {text}
    </button>
  );
};
