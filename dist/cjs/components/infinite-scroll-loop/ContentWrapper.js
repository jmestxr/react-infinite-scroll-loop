"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentWrapper = void 0;
const react_1 = __importDefault(require("react"));
const ContentWrapper = ({ children: content, height = "auto", width = "auto", }) => {
    const EnrichedContent = () => react_1.default.Children.map(content, (child) => {
        return (react_1.default.createElement("div", { style: {
                height: height,
                width: width,
                display: "inline-block",
                scrollSnapAlign: "center",
            } }, child));
    });
    return react_1.default.createElement(EnrichedContent, null);
};
exports.ContentWrapper = ContentWrapper;
//# sourceMappingURL=ContentWrapper.js.map