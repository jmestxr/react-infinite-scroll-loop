"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnStopScroll = void 0;
const react_1 = require("react");
const useOnStopScroll = (scrollRef, handler, time) => {
    (0, react_1.useEffect)(() => {
        const listener = (element) => {
            const timeout = time;
            let removed = false;
            let handle = null;
            const onScroll = () => {
                if (handle) {
                    clearTimeout(handle);
                }
                handle = window.setTimeout(handler, timeout);
            };
            element === null || element === void 0 ? void 0 : element.addEventListener("scroll", onScroll);
            return () => {
                if (removed) {
                    return;
                }
                removed = true;
                if (handle) {
                    clearTimeout(handle);
                }
                element === null || element === void 0 ? void 0 : element.removeEventListener("scroll", onScroll);
            };
        };
        listener(scrollRef.current);
    });
};
exports.useOnStopScroll = useOnStopScroll;
//# sourceMappingURL=useOnStopScroll.js.map