import { generateId } from '../utils';

export const getInitialPageData = () => ({
  name: 'Untitled Page',
  image: {
    id: '0c1de8f8-c585-4d4a-b5b2-75c8632027b6.jpg',
  },
  pins: {},
});

export const getInitialMapData = () => {
  const pageId = generateId();
  return {
    name: 'Untitled Map',
    pages: {
      order: [pageId],
      data: {
        [pageId]: getInitialPageData(),
      },
    },
  };
};
