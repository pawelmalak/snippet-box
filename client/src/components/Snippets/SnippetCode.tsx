interface Props {
  code: string;
}

export const SnippetCode = (props: Props): JSX.Element => {
  return (
    <div className='mb-3'>
      <textarea
        className='form-control'
        id='code'
        rows={13}
        value={props.code}
        disabled
      ></textarea>
    </div>
  );
};
