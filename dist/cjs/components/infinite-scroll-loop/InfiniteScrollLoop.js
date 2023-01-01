"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfiniteScrollLoop = void 0;
const react_1 = __importStar(require("react"));
const functions_1 = require("../../functions/functions");
const useOnStopScroll_1 = require("../../hooks/useOnStopScroll");
require("./infinite-scroll-loop.css");
const InfiniteScrollLoop = ({ children: content, onSelect, verticalScroll = true, backup = 50, }) => {
    const scrollRef = (0, react_1.useRef)(null);
    const [contentSize, setContentSize] = (0, react_1.useState)(0);
    const paddedContentSize = contentSize * backup; /* can set any number via prop */
    const NO_OF_ELEMENTS = react_1.Children.count(content);
    (0, react_1.useEffect)(() => {
        if (scrollRef.current) {
            const contents = (0, functions_1.getEnrichedContents)(scrollRef.current);
            setContentSize((verticalScroll ? contents[0].clientHeight : contents[0].clientWidth) *
                NO_OF_ELEMENTS);
            verticalScroll
                ? (scrollRef.current.scrollTop = paddedContentSize)
                : (scrollRef.current.scrollLeft = paddedContentSize);
        }
    }, [content, scrollRef, contentSize]);
    const handleScrollLoop = () => {
        if (scrollRef.current) {
            const contents = (0, functions_1.getEnrichedContents)(scrollRef.current);
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
            const containerCenter = (0, functions_1.getContainerCenter)(scrollRef.current, verticalScroll);
            const contents = (0, functions_1.getContents)(scrollRef.current);
            const ERROR = 1;
            // Get the selected content and call onSelect on it
            for (const content of contents) {
                const contentCenter = (0, functions_1.getContainerCenter)(content, verticalScroll);
                if (Math.abs(containerCenter - contentCenter) < ERROR) {
                    onSelect === null || onSelect === void 0 ? void 0 : onSelect(content);
                }
            }
        }
    };
    (0, useOnStopScroll_1.useOnStopScroll)(scrollRef, handleScrollLoop, 50); // time has to be >= transition time
    (0, useOnStopScroll_1.useOnStopScroll)(scrollRef, handleSelect, 200);
    const handleOnScroll = () => {
        if (scrollRef.current) {
            const containerCenter = (0, functions_1.getContainerCenter)(scrollRef.current, verticalScroll);
            const contents = (0, functions_1.getEnrichedContents)(scrollRef.current);
            let i = 0; // loop index
            for (const content of contents) {
                const contentCenter = (0, functions_1.getContainerCenter)(content, verticalScroll);
                const contentSize = verticalScroll
                    ? content.clientHeight
                    : content.clientWidth;
                const intersection = (0, functions_1.getIntersection)([
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
    return (react_1.default.createElement("div", { ref: scrollRef, onScroll: handleOnScroll, className: "scroll-container" +
            (verticalScroll ? " vertical-scroll" : " horizontal-scroll") },
        react_1.default.createElement(PaddedContent, { backup: backup }, content),
        content,
        react_1.default.createElement(PaddedContent, { backup: backup }, content)));
};
exports.InfiniteScrollLoop = InfiniteScrollLoop;
const PaddedContent = ({ children, backup }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null, Array(backup) /* can set any number via prop */
        .fill(0)
        .map((v, i) => {
        return children;
    })));
};
//# sourceMappingURL=InfiniteScrollLoop.js.map