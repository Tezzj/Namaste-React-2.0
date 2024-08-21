/*
 *
 * <div id="parent">
 *      <div id="child">
 *          <h1>I am H1 tag</h1>
 *          <h2>I am H2 tag</h2>
 *      </div>
 *      <div id="child2">
 *          <h1>I am H1 tag</h1>
 *          <h2>I am H2 tag</h2>
 *      </div>
 * </div>
 *
 * ReactElement(Object) => HTML( Browser Understands)
 */

//const heading = React.createElement(      // React element is basically a js object
//   "h1",
//   {                                       // In this object, we can pass the attributes to be given to the element
//     id: "title",                         
//     style: {
//       background:"red",
//     },
//     className:"title"
//   },
//   "heading"                              // This is the content that is to be put inside the element
// );

// console.log(heading) will give an object
// React element has a property called PROPS, which has the ATTRIBUTES and the CHILDREN(content inside the element).



const parent = React.createElement("div", { id: "parent" }, [      
  React.createElement("div", { id: "child" }, [                     
    React.createElement("h1", {}, "I am H1 tag"),
    React.createElement("h2", {}, "I am H2 tag"),      // we can put multiple children inside the react element by making an array of them
  ]),
  React.createElement("div", { id: "child2" }, [
    React.createElement("h1", {}, "I am H1 tag"),
    React.createElement("h2", {}, "I am H2 tag"),
  ]),
]);

const root1 = ReactDOM.createRoot(document.getElementById("root"));
root1.render(parent);

// This will convert the react element object into the html element and put it in the root div
// render will REPLACE the already present elemnt(s)(if any) in the root div with the given element (container in this case)

// const heading1 = React.createElement("h1",{ id: "rootm", abc: "xyz" }," Namaste World from react !");
// root1.render(heading1);
  
