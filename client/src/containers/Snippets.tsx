import { useEffect, useContext, useState, Fragment } from 'react';
import { SnippetsContext } from '../store';
import { SnippetGrid } from '../components/Snippets/SnippetGrid';
import { Badge, Button, Card, Layout, Spinner } from '../components/UI';
import { Snippet } from '../typescript/interfaces';

export const Snippets = (): JSX.Element => {
  const { snippets, languageCount, getSnippets, countSnippets } =
    useContext(SnippetsContext);

  const [filter, setFilter] = useState<string | null>(null);
  const [localSnippets, setLocalSnippets] = useState<Snippet[]>([]);

  useEffect(() => {
    getSnippets();
    countSnippets();
  }, []);

  useEffect(() => {
    setLocalSnippets([...snippets]);
  }, [snippets]);

  const filterHandler = (language: string) => {
    setFilter(language);
    const filteredSnippets = snippets.filter(s => s.language === language);
    setLocalSnippets(filteredSnippets);
  };

  const clearFilterHandler = () => {
    setFilter(null);
    setLocalSnippets([...snippets]);
  };

  return (
    <Layout>
      <div className='col-12 col-md-4 col-lg-3'>
        <Card title='Filter by language'>
          <Fragment>
            {languageCount.map((el, idx) => {
              const isActiveFilter = filter === el.language;

              return (
                <div
                  className={`d-flex justify-content-between cursor-pointer ${
                    isActiveFilter && 'text-dark fw-bold'
                  }`}
                  key={idx}
                  onClick={() => filterHandler(el.language)}
                >
                  <span>{el.language}</span>
                  <span>{el.count}</span>
                </div>
              );
            })}
          </Fragment>
          <div className='d-grid mt-3'>
            <Button
              text='Clear filters'
              color='dark'
              small
              outline
              handler={clearFilterHandler}
            />
          </div>
        </Card>
      </div>
      <div className='col-12 col-md-8 col-lg-9'>
        {snippets.length > 0 ? (
          <SnippetGrid snippets={localSnippets} />
        ) : (
          <div className='col-12'>
            <Spinner />
          </div>
        )}
      </div>
    </Layout>
  );
};
