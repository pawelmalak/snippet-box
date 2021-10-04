import { SearchQuery } from '../typescript/interfaces';

export const searchParser = (rawQuery: string): SearchQuery => {
  // Extract filters from query
  const tags = extractFilters(rawQuery, 'tags');
  const languages = extractFilters(rawQuery, 'lang');
  const query = rawQuery.replaceAll(/(tags|lang):[a-zA-Z]+(,[a-zA-Z]+)*/g, '');

  return {
    query: query.trim(),
    tags,
    languages
  };
};

const extractFilters = (query: string, filter: string): string[] => {
  let filters: string[] = [];

  const regex = new RegExp(filter + ':[a-zA-Z]+(,[a-zA-Z]+)*');
  const matcher = query.match(regex);

  if (matcher) {
    filters = matcher[0].split(':')[1].split(',');
  }

  return filters;
};
