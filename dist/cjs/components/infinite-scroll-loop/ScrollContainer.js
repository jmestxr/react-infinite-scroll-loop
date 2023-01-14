"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollContainer = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
exports.ScrollContainer = styled_components_1.default.div `
    height: 100%;
    width: 100%;
    overflow-x: ${(props) => (props.verticalScroll ? "hidden" : "auto")};
    overflow-y: ${(props) => (props.verticalScroll ? "auto" : "hidden")};
    scroll-snap-type: ${(props) => props.verticalScroll ? "y proximity" : "x proximity"};
    white-space: ${(props) => (props.verticalScroll ? "normal" : "nowrap")};

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /*IE and Edge */
    scrollbar-width: none; /*Firefox*/
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
    display: none;
`;
//# sourceMappingURL=ScrollContainer.js.map