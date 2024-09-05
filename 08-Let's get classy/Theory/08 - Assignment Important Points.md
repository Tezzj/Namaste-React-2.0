## Namaste React Course by Akshay Saini

# Episode 08 - Let's get Classy

## Q: What is the order of life cycle method calls in `Class Based Components`?

A: Following is the order of lifecycle methods calls in `Class Based Components`:

1. constructor()
2. render ()
3. componentDidMount()
4. componentDidUpdate() (componentDidUpdate is called after every re-render triggered by changes in state or props.)
5. componentWillUnmount()

For more reference [React-Lifecycle-methods-Diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## Q: Why do we use `componentDidMount`?

A: The `componentDidMount()` method allows us to execute the React code when the component is already placed in the DOM (Document Object Model). This method is called during the Mounting phase of the React Life-cycle i.e after the component is rendered.
Wwe can run any piece of react code to modify the components. For ex. It's the best place to `make API calls`.

## Q: Why do we use `componentWillUnmount`? Show with example.

A: `componentWillUnmount()` is useful for the cleanup of the application when we switch routes from one place to another. Since we are working with a SPA(Single Page Application) the component process always runs in the background even if we switch to another route. So it is required to stop those processes before leaving the page. If we revisit the same page, a new process starts that affects the browser performance.
For example, in Repo class, during `componentDidMount()` a timer is set with an interval of every one second to print in console. When the component is unmounted (users moves to a different page), the timer will be running in the background, which we might not even realize and causing huge performance issue. To avoid such situations the cleanup function can be done in componentWillUnmount, in this example `clearInterval`(timer) to clear the timer interval before unmounting Repo component.

## Q: (Research) Why do we use `super(props)` in constructor?

A: `super(props)` is used to inherit the properties and access of variables of the React parent class when we initialize our component.
super() is used inside constructor of a class to derive the parent's all properties inside the class that extended it. If super() is not used, then Reference Error : Must call super constructor in derived classes before accessing 'this' or returning from derived constructor is thrown in the console.
The main difference between super() and super(props) is the this.props is undefined in child's constructor in super() but this.props contains the passed props if super(props) is used.

## Q: (Research) Why can't we have the `callback function` of `useEffect async`?

A: `useEffect` expects it's callback function to return nothing or return a function (cleanup function that is called when the component is unmounted). If we make the callback function as `async`, it will return a `promise` and the promise will affect the clean-up function from being called.

## Q: Behind the scenes working of shallow merge, in the updation of state variables in class based components?
A: The object you pass to `setState()` is shallowly merged into the current state. This means that only the properties you specify are updated, while the other state properties remain unchanged.

Shallow merging is a process in which only the top-level properties of an object are merged, while nested objects or arrays within those properties are not deeply merged. In the context of React's setState() method, this means that when you update the state, React only merges the properties at the first level of the state object.

Suppose you have a state object like this:
```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "John",
        age: 30,
      },
      isLoggedIn: true,
    };
  }

  updateState = () => {
    this.setState({
      user: { age: 31 },
    });
  }

  render() {
    return (
      <div>
        <p>Name: {this.state.user.name}</p>
        <p>Age: {this.state.user.age}</p>
      </div>
    );
  }
}
```

If you call this.setState({ user: { age: 31 } }), React will perform a shallow merge of the state:

Before the update:

```json
{
  user: {
    name: "John",
    age: 30
  },
  isLoggedIn: true
}
```
After the update:
```json
{
  user: { 
    age: 31 
  },
  isLoggedIn: true
}
```
Key Points:

Top-level merge only: The user object is replaced entirely, not merged with the previous user object. As a result, the name property is lost, and only age remains in the new user object.

Shallow merge: Only the properties at the first level are merged. If you need to preserve nested properties, you must manually include them in the update, like this:

```jsx
this.setState({
  user: { 
    ...this.state.user,  // Spread operator to preserve the other properties
    age: 31 
  }
});
```
This shallow merging behavior helps to avoid unnecessary deep merges, which could be computationally expensive, but it requires developers to be mindful of how state updates are structured.

## Q: return function in useEffect?
A: In useEffect, the return function is known as a cleanup function. It's used to clean up any side effects or subscriptions created by the effect, such as timers, event listeners, or API subscriptions, before the component is removed or when dependencies change.

How it works:
The cleanup function runs before the component is unmounted (like componentWillUnmount in class components).
If the useEffect has a dependency array, the cleanup function runs before the effect re-runs due to a change in dependencies.

Syntax:
```javascript
useEffect(() => {
  // Effect logic (e.g., API call, subscription)

  return () => {
    // Cleanup logic (e.g., clear timer, unsubscribe)
  };
}, [dependencies]);
```

Example:
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Interval running');
  }, 1000);

  // Cleanup function to clear the interval
  return () => {
    clearInterval(timer);
    console.log('Cleanup called');
  };
}, []);  // Empty array, so this runs only once and cleanup on unmount
```

When the cleanup function is called:
When the component unmounts: The cleanup function is invoked when the component is removed from the DOM.

Before the effect re-runs: If the effect has dependencies and one of them changes, the cleanup function will run before the next effect execution.
It's useful for preventing memory leaks or unwanted side effects.

The cleanup function is automatically invoked by React, but it is up to you to specify what should be cleaned up. In the case of setInterval, clearInterval must be explicitly called to stop the interval from continuing after the component unmounts.

The setInterval function will keep running even after the component unmounts because setInterval sets up a timer that runs on a separate thread managed by the browser. 

Component Lifecycle: When a React component unmounts, it does not automatically stop any timers, intervals, or asynchronous operations that were set up in that component. React’s cleanup logic does not inherently know about these browser-level operations; it only provides a mechanism for you to clean them up.

Automatic Unmounting: React will unmount the component and call the cleanup function, but it does not automatically manage browser-level operations like timers.

