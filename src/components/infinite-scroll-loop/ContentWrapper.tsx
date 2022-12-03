import React from "react";

interface ContentWrapperProps {
  children: React.ReactNode;
  height?: string;
  width?: string;
}
export const ContentWrapper = ({
  children: content,
  height = "auto",
  width = "auto",
}: ContentWrapperProps) => {
  const EnrichedContent: any = () =>
    React.Children.map(content, (child) => {
      return (
        <div
          style={{ height: height, width: width, display: "inline-block" }}
          className="content-wrapper"
        >
          {child}
        </div>
      );
    });

  return <EnrichedContent />;
};
