import React from "react";
import { ContentWrapper, InfiniteScrollLoop } from "../src";
import "./stories.css";

const stock1 = require("../src/assets/images/singapore.jpeg");
const stock2 = require("../src/assets/images/japan.jpeg");
const stock3 = require("../src/assets/images/paris.jpeg");

export default {
  title: "My Component/InfiniteScrollLoop",
  component: InfiniteScrollLoop,
};

export const Example1 = () => {
  return (
    <div style={{ height: "250px", width: "500px" }}>
      <InfiniteScrollLoop
        onSelect={(element) => console.log(element.id)}
        verticalScroll={false}
      >
        <ExampleContent1 src={stock1} id="1" title="Gardens by the Bay" />
        <ExampleContent1 src={stock2} id="2" title="Mount Fuji" />
        <ExampleContent1 src={stock3} id="3" title="Eiffel Tower" />
      </InfiniteScrollLoop>
    </div>
  );
};

export const Example2 = () => {
  return (
    <div style={{ height: "150px", width: "200px" }}>
      <InfiniteScrollLoop>
        {Array(6)
          .fill(0)
          .map((v, i) => {
            return <ExampleContent2 key={i} id={`${i + 1}`} number={i + 1} />;
          })}
      </InfiniteScrollLoop>
    </div>
  );
};

/* =========================================================================================== */
/* EXAMPLES
/* =========================================================================================== */
interface ExampleContent1Props {
  src: any;
  id: string;
  title: string;
}
const ExampleContent1 = ({ src, id, title }: ExampleContent1Props) => {
  return (
    <ContentWrapper height="90%" width="50%">
      <div id={id} className="container1">
        <img src={src} className="image" />
        <div className="bg-overlay"></div>
        <div className="text-overlay">
          <h2 className="title">{title}</h2>
        </div>
      </div>
    </ContentWrapper>
  );
};

interface ExampleContent2Props {
  id: string;
  number: number;
}
const ExampleContent2 = ({ id, number }: ExampleContent2Props) => {
  return (
    <ContentWrapper height="30%" width="100%">
      <div id={id} className="container2">
        <h4 className="number">{number}</h4>
      </div>
    </ContentWrapper>
  );
};
