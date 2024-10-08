import React from "react";
import ReactDOM from "react-dom/client";

// React.createElement is an object (Js Object) &
// while rendering on browser these React.createElement(object) is converted to HTMLElement

//! React.createElement ==> ReactElement(JS-Object) ==> HTMLElement(render)

// while creating react element we use core React
// but while rendering we use ReactDOM for rendering react element on Browser

const heading = React.createElement("h1", { id: "heading" }, "Namaste Soham");   // This is a react element(as it is made using react.createElement)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);

// If your ROOT HTML element contains child element, THEN react will replace that child element with the react element (NOT APPEND)
// React.createElement is not a good way for creating React apps ----> hence JSX is created

// JSX
// JSX - is HTML or XML like Syntax (JSX is not HTML in JS)

const jsxHeading = (<h1 className="heading">  // className is similar to class attribute in html
  Namaste React from jsx
</h1>);
root.render(jsxHeading);

// JSX ==>Babel transpiles it to React.createElement ==> ReactElement(JS-Object) ==> HTMLElement(render)

// JSX (transpiled before it reaches the JS Engine)
// ReactDOM will not understand JSX Code , Hence jsx code is transpiled before (rendering) / before it reaches root.render
// Browser can understand Core js Code or ECMASCRIPT6 (Es6) code , hence parcel is transpiling the code.
// parcel is not doing by itself , it manages for you.

// Transpiling is doing with the help of one of the Parcel Package called - [Babel]
// Babel is js compiler (it takes jsx code & converts it to the code that js engine understands)
// Babel is exactly Transpiling our code
// Babel will take your jsx code convert it to the react.createElement & now react can understand the code & now react can render the jsx properly
// transpiled =  your code is converted to the code that browsers can understand / that react can understand

// At the end of the day , behind the scenes JSX code is transpiled to React.createElement and so on
// hence jsx & React.createElement are same




// react Element
const elem = <span>ReactDOM</span>
const title = (<h1> {elem} Namaste React using JSX</h1>);   
// If there are multiple lines of JSX code, enclose it in brackets().

// React Functional Components - A js Function that returns a piece of jsx Code or (bunch of jsx code) is React Functional Components

const HeadingComponent = () => {                      // write a react component name with a capital letter
  return <h1 className="heading">Namaste Bro</h1>;
}

const HeadingComponent1 = () => (                     // Normal functions can also be used instead of arrow functions
  <h1 className="heading">Namaste Bro 1</h1>
);

// Above two are same. 

const HeadingComponent2 = () => <h1 className="heading">Namaste Bro 2</h1>

let numb = 10000;

// Component Composition
const HeadingComponent3 = () => {
  return (
    <div id="container">
      <HeadingComponent />     // This is how a component can be written inside another component
      {numb}                    // we can write js code within curly braces{}, inside JSX.
      <HeadingComponent1/>
      // Can aslo be written as <HeadingComponent1> </HeadingComponent1>
      // Can also be written as {Title()} // As Title is basically a function also.
      <h1 className="heading">Namaste Bro 3 + {numb} = {3 + numb}</h1>
      {title}                   // way to put a react element into a component
    </div>
  )
}

// JSX also prevents cross site scripting attacks by processing the code before running it (like js is running in {} in above case).

// rendering a component
root.render(<HeadingComponent3/>)            
