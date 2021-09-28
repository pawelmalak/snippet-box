export const tagParser = (tags: string[]): Set<string> => {
  const parsedTags = tags.map(tag => tag.trim().toLowerCase()).filter(String);
  const uniqueTags = new Set([...parsedTags]);

  return uniqueTags;
};
