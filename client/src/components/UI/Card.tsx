import { ReactNode } from 'react';

interface Props {
  title?: string;
  children?: ReactNode;
  classes?: string;
  bodyClasses?: string;
}

export const Card = (props: Props): JSX.Element => {
  const { title, children, classes = '', bodyClasses = '' } = props;

  const parentClasses = `card mb-3 ${classes}`;
  const childClasses = `card-body ${bodyClasses}`;

  return (
    <div className={parentClasses}>
      <div className={childClasses}>
        <h5 className='card-title'>{title}</h5>
        {children}
      </div>
    </div>
  );
};
