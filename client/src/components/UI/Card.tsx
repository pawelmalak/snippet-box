interface Props {
  title?: string;
  children?: JSX.Element | JSX.Element[];
}

export const Card = (props: Props): JSX.Element => {
  const { title, children } = props;

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        {children}
      </div>
    </div>
  );
};
