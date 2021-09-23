import { Snippet } from '../../typescript/interfaces';
import { SnippetCard } from './SnippetCard';

interface Props {
  snippets: Snippet[];
}

export const SnippetGrid = (props: Props): JSX.Element => {
  const { snippets } = props;

  return (
    <div className='row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4'>
      {snippets.map(snippet => (
        <div className='col' key={snippet.id}>
          <SnippetCard snippet={snippet} />
        </div>
      ))}
    </div>
  );
};
