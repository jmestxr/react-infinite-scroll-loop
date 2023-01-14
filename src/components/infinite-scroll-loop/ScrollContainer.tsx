import styled from "styled-components";

interface ScrollContainerProps {
    verticalScroll: boolean;
}

export const ScrollContainer = styled.div<ScrollContainerProps>`
    height: 100%;
    width: 100%;
    overflow-x: ${(props) => (props.verticalScroll ? "hidden" : "auto")};
    overflow-y: ${(props) => (props.verticalScroll ? "auto" : "hidden")};
    scroll-snap-type: ${(props) =>
      props.verticalScroll ? "y proximity" : "x proximity"};
    white-space: ${(props) => (props.verticalScroll ? "normal" : "nowrap")};

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /*IE and Edge */
    scrollbar-width: none; /*Firefox*/
    }

    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
    display: none;
`;
