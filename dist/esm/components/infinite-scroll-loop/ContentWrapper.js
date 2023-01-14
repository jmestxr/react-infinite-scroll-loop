import React from "react";
export const ContentWrapper = ({ children: content, height = "auto", width = "auto", }) => {
    const EnrichedContent = () => React.Children.map(content, (child) => {
        return (React.createElement("div", { style: {
                height: height,
                width: width,
                display: "inline-block",
                scrollSnapAlign: "center",
            } }, child));
    });
    return React.createElement(EnrichedContent, null);
};
//# sourceMappingURL=ContentWrapper.js.map