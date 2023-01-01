import React, { Children, useEffect, useRef, useState } from "react";
import { getContainerCenter, getContents, getEnrichedContents, getIntersection, } from "../../functions/functions";
import { useOnStopScroll } from "../../hooks/useOnStopScroll";
import "./infinite-scroll-loop.css";
export const InfiniteScrollLoop = ({ children: content, onSelect, verticalScroll = true, backup = 50, }) => {
    const scrollRef = useRef(null);
    const [contentSize, setContentSize] = useState(0);
    const paddedContentSize = contentSize * backup; /* can set any number via prop */
    const NO_OF_ELEMENTS = Children.count(content);
    useEffect(() => {
        if (scrollRef.current) {
            const contents = getEnrichedContents(scrollRef.current);
            setContentSize((verticalScroll ? contents[0].clientHeight : contents[0].clientWidth) *
                NO_OF_ELEMENTS);
            verticalScroll
                ? (scrollRef.current.scrollTop = paddedContentSize)
                : (scrollRef.current.scrollLeft = paddedContentSize);
        }
    }, [content, scrollRef, contentSize]);
    const handleScrollLoop = () => {
        if (scrollRef.current) {
            const contents = getEnrichedContents(scrollRef.current);
            const contentSize = (verticalScroll ? contents[0].clientHeight : contents[0].clientWidth) *
                NO_OF_ELEMENTS;
            const paddedContentSize = contentSize * backup;
            const scroll = verticalScroll
                ? scrollRef.current.scrollTop
                : scrollRef.current.scrollLeft;
            if (scroll < paddedContentSize ||
                scroll >= paddedContentSize + contentSize) {
                verticalScroll
                    ? (scrollRef.current.scrollTop =
                        paddedContentSize + (scroll % contentSize))
                    : (scrollRef.current.scrollLeft =
                        paddedContentSize + (scroll % contentSize));
            }
        }
    };
    const handleSelect = () => {
        if (scrollRef.current) {
            const containerCenter = getContainerCenter(scrollRef.current, verticalScroll);
            const contents = getContents(scrollRef.current);
            const ERROR = 1;
            // Get the selected content and call onSelect on it
            for (const content of contents) {
                const contentCenter = getContainerCenter(content, verticalScroll);
                if (Math.abs(containerCenter - contentCenter) < ERROR) {
                    onSelect === null || onSelect === void 0 ? void 0 : onSelect(content);
                }
            }
        }
    };
    useOnStopScroll(scrollRef, handleScrollLoop, 50); // time has to be >= transition time
    useOnStopScroll(scrollRef, handleSelect, 200);
    const handleOnScroll = () => {
        if (scrollRef.current) {
            const containerCenter = getContainerCenter(scrollRef.current, verticalScroll);
            const contents = getEnrichedContents(scrollRef.current);
            let i = 0; // loop index
            for (const content of contents) {
                const contentCenter = getContainerCenter(content, verticalScroll);
                const contentSize = verticalScroll
                    ? content.clientHeight
                    : content.clientWidth;
                const intersection = getIntersection([
                    containerCenter - contentSize / 2,
                    containerCenter + contentSize / 2,
                ], [contentCenter - contentSize / 2, contentCenter + contentSize / 2]);
                if (intersection) {
                    const intervalWidth = intersection[1] - intersection[0];
                    const THRESHOLD = 0.5;
                    if (intervalWidth / contentSize > THRESHOLD) {
                        let j = 0;
                        while (j < contents.length) {
                            if ((j - i) % NO_OF_ELEMENTS == 0) {
                                const descendants = Array.from(contents[j].querySelectorAll("*"));
                                for (const descendant of descendants) {
                                    let classes = descendant.className.split(" ");
                                    classes = classes.filter((className) => !(new RegExp(".*__selected").test(className) ||
                                        className === ""));
                                    classes = classes.concat(classes.map((className) => className + "__selected"));
                                    descendant.className = classes.join(" ");
                                }
                            }
                            else {
                                const descendants = Array.from(contents[j].querySelectorAll("*"));
                                for (const descendant of descendants) {
                                    let classes = descendant.className.split(" ");
                                    classes = classes.filter((className) => !(new RegExp(".*__selected").test(className) ||
                                        className === ""));
                                    descendant.className = classes.join(" ");
                                }
                            }
                            j += 1;
                        }
                        break;
                    }
                }
                i += 1;
            }
        }
    };
    return (React.createElement("div", { ref: scrollRef, onScroll: handleOnScroll, className: "scroll-container" +
            (verticalScroll ? " vertical-scroll" : " horizontal-scroll") },
        React.createElement(PaddedContent, { backup: backup }, content),
        content,
        React.createElement(PaddedContent, { backup: backup }, content)));
};
const PaddedContent = ({ children, backup }) => {
    return (React.createElement(React.Fragment, null, Array(backup) /* can set any number via prop */
        .fill(0)
        .map((v, i) => {
        return children;
    })));
};
//# sourceMappingURL=InfiniteScrollLoop.js.map