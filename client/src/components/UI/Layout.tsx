interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout = (props: Props): JSX.Element => {
  return (
    <div className='container-lg px-5'>
      <div className='row pt-4'>{props.children}</div>
    </div>
  );
};
