import { Fragment, useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { SnippetCode } from '../components/Snippets/SnippetCode';
import { Layout, PageHeader, Spinner, Card } from '../components/UI';
import { SnippetsContext } from '../store';
import { SnippetDetails } from '../components/Snippets/SnippetDetails';
import { SnippetDocs } from '../components/Snippets/SnippetDocs';

interface Params {
  id: string;
}

export const Snippet = (): JSX.Element => {
  const { currentSnippet, getSnippetById } = useContext(SnippetsContext);
  const { id } = useParams<Params>();

  // Get previous location
  const location = useLocation<{ from: string }>();
  const { from } = location.state || '/snippets';

  useEffect(() => {
    getSnippetById(+id);
  }, []);

  return (
    <Layout>
      {!currentSnippet ? (
        <div className='col-12'>
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <PageHeader title='' prevDest={from} />
          <div className='row mt-3'>
            <div className='col-12 col-md-7 col-lg-8'>
              <SnippetCode code={currentSnippet.code} />
            </div>
            <div className='col-12 col-md-5 col-lg-4'>
              <SnippetDetails snippet={currentSnippet} />
            </div>
            {currentSnippet.docs && (
              <div className='col-12'>
                <Card title='Snippet documentation'>
                  <hr />
                  <SnippetDocs markdown={currentSnippet.docs} />
                </Card>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Layout>
  );
};
