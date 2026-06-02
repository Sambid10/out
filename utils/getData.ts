const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' },
  { id: 3, title: 'Post 3' },
  { id: 4, title: 'Post 4' },
  { id: 5, title: 'Post 5' },
  { id: 6, title: 'Post 6' },
  { id: 7, title: 'Post 7' },
  { id: 8, title: 'Post 8' },
  { id: 9, title: 'Post 9' },
  { id: 10, title: 'Post 10' },
  { id: 11, title: 'Post 11' },
  { id: 12, title: 'Post 12' },
  { id: 13, title: 'Post 13' },
  { id: 14, title: 'Post 14' },
  { id: 15, title: 'Post 15' },
];
export const fetchPosts = async (
  cursor: number | null = null
) => {
  await new Promise(resolve => setTimeout(resolve, 5000));

  const startIndex = cursor
    ? POSTS.findIndex(post => post.id === cursor) + 1
    : 0;

  const items = POSTS.slice(startIndex, startIndex + 5);

  return {
    items,
    nextCursor:
      items.length > 0
        ? items[items.length - 1].id
        : null,
  };
};