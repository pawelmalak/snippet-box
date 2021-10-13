interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout = (props: Props): JSX.Element => {
  return (
    <div className='container-lg'>
      <div className='row py-4'>{props.children}</div>
    </div>
  );
};
