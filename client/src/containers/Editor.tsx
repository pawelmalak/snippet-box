import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { SnippetForm } from '../components/Snippets/SnippetForm';
import { Layout, PageHeader } from '../components/UI';
import { Snippet } from '../typescript/interfaces';

interface Props {
  snippet?: Snippet;
}

export const Editor = (props: Props): JSX.Element => {
  const { snippet } = props;

  // Get previous location
  const location = useLocation<{ from: string }>();
  const { from } = location.state || '/snippets';

  return (
    <Layout>
      {snippet ? (
        <Fragment>
          <PageHeader title='edit snippet' prevDest={from} />
        </Fragment>
      ) : (
        <Fragment>
          <PageHeader title='Add new snippet' />
          <SnippetForm />
        </Fragment>
      )}
    </Layout>
  );
};
