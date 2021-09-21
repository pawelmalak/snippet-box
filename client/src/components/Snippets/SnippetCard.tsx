import { Snippet } from '../../typescript/interfaces';
import { dateParser } from '../../utils';
import { Card } from '../UI';

interface Props {
  snippet: Snippet;
}

export const SnippetCard = (props: Props): JSX.Element => {
  const { title, description, language, code, id, updatedAt } = props.snippet;

  const copyHandler = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Card title={title}>
      <h6 className='card-subtitle mb-2 text-muted'>
        {dateParser(updatedAt).relative}
      </h6>
      <p onClick={copyHandler}>{language}</p>
    </Card>
  );
};
