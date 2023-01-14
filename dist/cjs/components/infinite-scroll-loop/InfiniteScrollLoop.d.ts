import React from "react";
interface InfiniteScrollLoopProps {
    children: React.ReactNode;
    onSelect?: (selected: Element) => void;
    verticalScroll?: boolean;
    backup?: number;
}
export declare const InfiniteScrollLoop: ({ children: content, onSelect, verticalScroll, backup, }: InfiniteScrollLoopProps) => JSX.Element;
export {};
