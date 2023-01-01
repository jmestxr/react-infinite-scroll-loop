import React, { FC } from "react";
import "./infinite-scroll-loop.css";
interface InfiniteScrollLoopProps {
    children: React.ReactNode;
    onSelect?: (selected: Element) => void;
    verticalScroll?: boolean;
    backup?: number;
}
export declare const InfiniteScrollLoop: FC<InfiniteScrollLoopProps>;
export {};
