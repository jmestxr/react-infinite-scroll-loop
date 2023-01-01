"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntersection = exports.getContainerCenter = exports.getContents = exports.getEnrichedContents = void 0;
// Get all contents (Elements) of scroll container
const getEnrichedContents = (scrollContainer) => {
    return Array.from(scrollContainer.children);
};
exports.getEnrichedContents = getEnrichedContents;
const getContents = (scrollContainer) => {
    const contentsUnflattened = Array.from(scrollContainer.children).map((child, index) => Array.from(child.children));
    const contents = contentsUnflattened.reduce((prev, curr) => {
        return prev.concat(curr);
    }, []);
    return contents;
};
exports.getContents = getContents;
const getContainerCenter = (container, verticalScroll) => {
    const upper = verticalScroll ? container.getBoundingClientRect().top : container.getBoundingClientRect().left;
    const lower = verticalScroll ? container.getBoundingClientRect().bottom : container.getBoundingClientRect().right;
    return (upper + lower) / 2;
};
exports.getContainerCenter = getContainerCenter;
const getIntersection = (interval1, interval2) => {
    const [l1, h1] = interval1;
    const [l2, h2] = interval2;
    if (h2 >= l1 && l2 <= h1) {
        return [Math.max(l1, l2), Math.min(h1, h2)];
    }
    return null;
};
exports.getIntersection = getIntersection;
//# sourceMappingURL=functions.js.map