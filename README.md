# react-infinite-scroll-loop
React component that supports infinite scrolling of finite number of elements.
![demo3](https://user-images.githubusercontent.com/87931905/205445577-bf050286-d98e-45df-b688-7c1c1f088117.gif)

## Installation
To download react-infinite-scroll-loop, run:
```console
npm i reactjs-infinite-scroll-loop
```

## Usage
```jsx
import { InfiniteScrollLoop, ContentWrapper } from 'reactjs-infinite-scroll-loop';

<InfiniteScrollLoop {/* props here */}>
    <ContentWrapper {/* props here */}>
        {/* Content element 1 */}
    </ContentWrapper>
    <ContentWrapper {/* props here */}>
        {/* Content element 2 */}
    </ContentWrapper>
    ...
</InfiniteScrollLoop>
```

## Animation
Custom animation when a content element is selected can be implemented by adding the custom pseudo class `<className>__selected`. The animation
transition duration can be added to the target `<className>`.

## Example
![demo2](https://user-images.githubusercontent.com/87931905/205446156-7f40b41b-f600-403d-8e1e-0059f34600d5.gif)

The following code snippets reproduce the above gif:

### React JS:
```jsx
const Example = () => {
    return (
        <div style={{ height:"150px", width:"200px" }}>
            <InfiniteScrollLoop>
                {
                    Array(6).fill(0).map((v, i) => {
                        return <Content key={i} id={`${i+1}`} number={i+1}/>
                    })
                }
            </InfiniteScrollLoop>
        </div>
    );
};

interface ContentProps {
    id: string;
    number: number;
}

const Content = ({ id, number }: ContentProps) => {
    return (
        <ContentWrapper height="30%" width="100%">
            <div id={id} className="container" >
                <h4 className="number">{number}</h4>
            </div>
        </ContentWrapper>
    );
};
```

### CSS:
```css
.container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.number {
    margin: 0;
    opacity: 0.2;
    font-size: 18px;
    transition: 0.2s;
}

.number__selected {
    opacity: 1;
    font-size: 25px;
}

```

## Docs

### InfiniteScrollLoop Props
| Name           | Type                        | Default         | Description                                                                                                                                                                                                                     |
|----------------|-----------------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `children`       | `React.ReactNode`             | None (required) | The content of the scroll container.[^1]                                                                                                                                                                                            |
| `onSelect`       | `(selected: Element) => void` | `undefined`       | Executes a given JavaScript code on the selected element.                                                                                                                                                                       |
| `verticalScroll` | `boolean`                     | `true`            | The direction of scroll. `true` for vertical and `false` for horizontal.[^2]                                                                                                                                                            |
| `backup`         | `number`                      | `50`              | The number of backup content sets on the top and bottom. Increasing this number will increase the amount of scroll required to the end of the scroll container, but decreases performance as more content needs to be rendered. |

### ContentWrapper Props
| Name   | Type                                  | Default | Description                         |
|--------|---------------------------------------|---------|-------------------------------------|
| `height` | `string` (accept any CSS height values) | `‘auto’`  | The height of each content element. |
| `width`  | `string` (accept any CSS width values)  | `‘auto’`  | The width of each content element.  |




[^1]: Each content element must be contained in a ContentWrapper, or a custom parent wrapper class that consists of the scroll-snap-align property.
[^2]: If scrollDirection is vertical, the height of scroll container must be larger than the height of each content element.
If scrollDirection is horizontal, the width of scroll container must be larger than the width of each content element.
