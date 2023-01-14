/* Get all contents (Elements) of scroll container */
export const getEnrichedContents = (scrollContainer) => {
    return Array.from(scrollContainer.children);
};
export const getContents = (scrollContainer) => {
    const contentsUnflattened = Array.from(scrollContainer.children).map((child, index) => Array.from(child.children));
    const contents = contentsUnflattened.reduce((prev, curr) => {
        return prev.concat(curr);
    }, []);
    return contents;
};
/* Get the center area of the container (size is equal to a content element) */
export const getContainerCenter = (container, verticalScroll) => {
    const upper = verticalScroll ? container.getBoundingClientRect().top : container.getBoundingClientRect().left;
    const lower = verticalScroll ? container.getBoundingClientRect().bottom : container.getBoundingClientRect().right;
    return (upper + lower) / 2;
};
/* Get the intersection between two intervals */
export const getIntersection = (interval1, interval2) => {
    const [l1, h1] = interval1;
    const [l2, h2] = interval2;
    if (h2 >= l1 && l2 <= h1) {
        return [Math.max(l1, l2), Math.min(h1, h2)];
    }
    return null;
};
//# sourceMappingURL=functions.js.map