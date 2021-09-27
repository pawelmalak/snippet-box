export const tagsParser = (tags: string): string[] => {
  const parsedTags = tags
    .split(',')
    .map(tag => tag.trim().toLowerCase())
    .filter(String);

  return parsedTags;
};
