/** Returns a unique ID. */
export { v4 as generateId } from 'uuid';

/** Returns the absolute position of an element on the page. */
export const getPosition = el => {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
};
