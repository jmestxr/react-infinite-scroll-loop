// Get all contents (Elements) of scroll container
export const getEnrichedContents = (scrollContainer: HTMLDivElement) => {
  return Array.from(scrollContainer.children)
};
export const getContents = (scrollContainer: HTMLDivElement) => {
  const contentsUnflattened = Array.from(scrollContainer.children).map(
    (child, index) => Array.from(child.children)
  );
  const contents = contentsUnflattened.reduce((prev, curr) => {
    return prev.concat(curr);
  }, []);
  return contents;
};


export const getContainerCenter = (container: Element, verticalScroll: boolean) => {
  const upper = verticalScroll ? container.getBoundingClientRect().top :container.getBoundingClientRect().left;
  const lower = verticalScroll ? container.getBoundingClientRect().bottom :container.getBoundingClientRect().right;
  return (upper + lower) / 2;
};

export const getIntersection = (
  interval1: [number, number],
  interval2: [number, number]
) => {
  const [l1, h1] = interval1;
  const [l2, h2] = interval2;

  if (h2 >= l1 && l2 <= h1) {
    return [Math.max(l1, l2), Math.min(h1, h2)];
  }

  return null;
};
