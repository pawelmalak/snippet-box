import ReactMarkdown from 'react-markdown';

interface Props {
  markdown: string;
}

export const SnippetDocs = (props: Props): JSX.Element => {
  return (
    <div>
      <ReactMarkdown>{props.markdown}</ReactMarkdown>
    </div>
  );
};
