import { Snippet } from '../../typescript/interfaces';
import { SnippetCard } from './SnippetCard';

interface Props {
  snippets: Snippet[];
}

export const SnippetGrid = (props: Props): JSX.Element => {
  const { snippets } = props;

  return (
    <div className='row'>
      {snippets.map(snippet => (
        <div className='col-12 col-md-6 col-lg-4' key={snippet.id}>
          <SnippetCard snippet={snippet} />
        </div>
      ))}
    </div>
  );
};
