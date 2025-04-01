# Ultimate React Interview Cheatsheet

## Table of Contents

- [Part 1: Introduction & Fundamentals](#part-1-introduction--fundamentals)
  - [Why React?](#why-react)
  - [Core Concepts](#core-concepts)
  - [JSX Basics](#jsx-basics)
  - [Components & Props](#components--props)
  - [State & Lifecycle](#state--lifecycle)
- [Part 2: Hooks & Advanced Concepts](#part-2-hooks--advanced-concepts)
  - [React Hooks](#react-hooks)
  - [Context API](#context-api)
  - [Performance Optimization](#performance-optimization)
  - [Error Boundaries](#error-boundaries)
- [Part 3: Routing, State Management & Best Practices](#part-3-routing-state-management--best-practices)
  - [React Router](#react-router)
  - [State Management Solutions](#state-management-solutions)
  - [Testing React Applications](#testing-react-applications)
  - [Best Practices & Patterns](#best-practices--patterns)
  - [Common Interview Questions](#common-interview-questions)

---

## Part 1: Introduction & Fundamentals

[Jump to Part 2: Hooks & Advanced Concepts](#part-2-hooks--advanced-concepts) | [Jump to Part 3: Routing, State Management & Best Practices](#part-3-routing-state-management--best-practices)

### Why React?

React is a popular JavaScript library for building user interfaces, particularly single-page applications. Here's why React is widely used:

- **Declarative:** React makes it easy to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render the right components when your data changes.
- **Component-Based:** Build encapsulated components that manage their own state, then compose them to make complex UIs.
- **Learn Once, Write Anywhere:** React doesn't make assumptions about the rest of your technology stack, so you can develop new features without rewriting existing code.
- **Virtual DOM:** React creates a lightweight representation of the real DOM in memory, which improves performance by minimizing direct manipulation of the DOM.
- **One-way Data Flow:** Properties flow down from parent to child, making the code more predictable and easier to debug.
- **Rich Ecosystem:** React has a vast ecosystem of libraries, tools, and extensions.

### Core Concepts

#### 1. Virtual DOM

- React maintains a lightweight representation of the real DOM in memory (Virtual DOM).
- When state changes, React creates a new Virtual DOM tree.
- React then compares (diffs) this new tree with the previous one to find the minimal set of operations needed to update the real DOM.
- This process is called "reconciliation" and makes React apps more efficient.

#### 2. Components

- Components are the building blocks of any React application.
- They are reusable, self-contained pieces of code that return a React element describing how a section of the UI should appear.

#### 3. Props

- Props (short for properties) are read-only inputs to components.
- They are passed from parent to child components.
- Props cannot be modified within a component (immutability).

#### 4. State

- State represents data that changes over time within a component.
- Unlike props, state can be modified using the `setState()` method or state updater functions with hooks.
- State changes trigger re-renders of the component.

### JSX Basics

JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code within JavaScript.

```jsx
const element = <h1>Hello, world!</h1>;
```

Key JSX rules:

- JSX elements must have a closing tag (`<img />` or `<div></div>`).
- JSX attributes use camelCase (`onClick` not `onclick`).
- JSX uses `className` instead of `class` and `htmlFor` instead of `for`.
- JSX expressions must be wrapped in curly braces: `{expression}`.
- Adjacent JSX elements must be wrapped in a parent element or fragment: `<></>`.

```jsx
function Greeting() {
  const name = 'John';
  return (
    <>
      <h1 className="greeting">Hello, {name}!</h1>
      <p>Welcome to React</p>
    </>
  );
}
```

### Components & Props

#### Function Components

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

#### Class Components

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

#### Using Components

```jsx
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
    </div>
  );
}
```

#### Props

- Props are passed to components like HTML attributes.
- Props are read-only and should never be modified within a component.
- Always use destructuring for cleaner code:

```jsx
function Welcome({ name, age }) {
  return (
    <h1>
      Hello, {name}. You are {age} years old.
    </h1>
  );
}
```

#### Children Props

The `children` prop allows you to pass components as data to other components:

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function App() {
  return (
    <Card title="Welcome">
      <p>This is the card content</p>
    </Card>
  );
}
```

### State & Lifecycle

#### Class Component State

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({ date: new Date() });
  }

  render() {
    return <h2>It is {this.state.date.toLocaleTimeString()}.</h2>;
  }
}
```

#### State Updates

State updates may be asynchronous, so don't rely on previous state values directly:

```jsx
// Wrong
this.setState({ counter: this.state.counter + 1 });

// Correct
this.setState((prevState) => ({ counter: prevState.counter + 1 }));
```

#### Lifecycle Methods

1. **Mounting:**
   - `constructor()`
   - `static getDerivedStateFromProps()`
   - `render()`
   - `componentDidMount()`

2. **Updating:**
   - `static getDerivedStateFromProps()`
   - `shouldComponentUpdate()`
   - `render()`
   - `getSnapshotBeforeUpdate()`
   - `componentDidUpdate()`

3. **Unmounting:**
   - `componentWillUnmount()`

4. **Error Handling:**
   - `static getDerivedStateFromError()`
   - `componentDidCatch()`

---

[Back to Top](#ultimate-react-interview-cheatsheet) | [Jump to Part 2: Hooks & Advanced Concepts](#part-2-hooks--advanced-concepts) | [Jump to Part 3: Routing, State Management & Best Practices](#part-3-routing-state-management--best-practices)

## Part 2: Hooks & Advanced Concepts

[Jump to Part 1: Introduction & Fundamentals](#part-1-introduction--fundamentals) | [Jump to Part 3: Routing, State Management & Best Practices](#part-3-routing-state-management--best-practices)

### React Hooks

Hooks allow you to use state and other React features without writing a class.

#### useState

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

#### useEffect

Used for side effects in function components:

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    
    // Clean up (similar to componentWillUnmount)
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

#### useContext

```jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}
```

#### useReducer

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

#### useCallback

```jsx
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // This function is memoized and only changes if count changes
  const handleClick = useCallback(() => {
    console.log(`Clicked count: ${count}`);
  }, [count]);

  return <ChildComponent onClick={handleClick} />;
}
```

#### useMemo

```jsx
import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ num }) {
  // This calculation is memoized and only re-computed if num changes
  const result = useMemo(() => {
    console.log('Computing...');
    let sum = 0;
    for (let i = 0; i < num; i++) {
      sum += i;
    }
    return sum;
  }, [num]);

  return <div>Result: {result}</div>;
}
```

#### useRef

```jsx
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```

#### Custom Hooks

Custom hooks let you extract component logic into reusable functions:

```jsx
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return width;
}

function MyComponent() {
  const width = useWindowWidth();
  return <div>Window width: {width}</div>;
}
```

### Context API

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

```jsx
// 1. Create a context
const ThemeContext = React.createContext('light');

// 2. Create a provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Use the context in a component
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#333' : '#fff' }}
    >
      Toggle Theme
    </button>
  );
}

// 4. Wrap your app or component tree with the provider
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}
```

### Performance Optimization

#### React.memo

Prevents unnecessary re-renders for function components:

```jsx
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

#### useMemo and useCallback

- Use `useMemo` to memoize expensive calculations
- Use `useCallback` to memoize functions passed to child components

#### PureComponent and shouldComponentUpdate

For class components:

```jsx
class MyComponent extends React.PureComponent {
  // PureComponent implements shouldComponentUpdate with a shallow prop and state comparison
  render() {
    return <div>{this.props.name}</div>;
  }
}

// Or manually:
class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.name !== this.props.name;
  }
  
  render() {
    return <div>{this.props.name}</div>;
  }
}
```

#### Code Splitting with React.lazy and Suspense

```jsx
import React, { Suspense, lazy } from 'react';

const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}
```

### Error Boundaries

Error boundaries are React components that catch JavaScript errors in their child component tree, log those errors, and display a fallback UI.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

---

[Back to Top](#ultimate-react-interview-cheatsheet) | [Jump to Part 1: Introduction & Fundamentals](#part-1-introduction--fundamentals) | [Jump to Part 3: Routing, State Management & Best Practices](#part-3-routing-state-management--best-practices)

## Part 3: Routing, State Management & Best Practices

[Jump to Part 1: Introduction & Fundamentals](#part-1-introduction--fundamentals) | [Jump to Part 2: Hooks & Advanced Concepts](#part-2-hooks--advanced-concepts)

### React Router

#### Basic Setup (React Router v6)

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users">Users</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

#### Hooks for Routing

```jsx
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function UserProfile() {
  // Get URL parameters
  const { userId } = useParams();
  
  // Navigation
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/dashboard');
  };
  
  // Get current location
  const location = useLocation();
  console.log(location.pathname);
  
  return (
    <div>
      <h1>User ID: {userId}</h1>
      <button onClick={handleClick}>Go to Dashboard</button>
    </div>
  );
}
```

#### Nested Routes

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="users" element={<Users />}>
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div>
      <nav>{/* navigation links */}</nav>
      <Outlet /> {/* Renders the child route's element */}
    </div>
  );
}
```

### State Management Solutions

#### Context API + useReducer

For simpler applications, combine Context API with useReducer for a Redux-like pattern:

```jsx
// 1. Create context
const TodoContext = React.createContext();

// 2. Define reducer
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
}

// 3. Create provider
function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

// 4. Use in components
function TodoList() {
  const { todos, dispatch } = useContext(TodoContext);
  
  return (
    <ul>
      {todos.map(todo => (
        <li
          key={todo.id}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

#### Redux

Redux is a predictable state container that helps manage application state outside of components:

```jsx
// 1. Define action types
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// 2. Define action creators
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), text, completed: false }
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

// 3. Create reducer
const initialState = [];

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
}

// 4. Set up store and provider
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

const store = createStore(todosReducer);

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

// 5. Connect components
function TodoApp() {
  const todos = useSelector(state => state);
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText('');
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => dispatch(toggleTodo(todo.id))}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Zustand (Modern Alternative)

Zustand is a small, fast state-management solution:

```jsx
import create from 'zustand';

// Create store
const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (text) => set((state) => ({
    todos: [...state.todos, { id: Date.now(), text, completed: false }]
  })),
  toggleTodo: (id) => set((state) => ({
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }))
}));

// Use in component
function TodoApp() {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const [text, setText] = useState('');
  
  // Component implementation similar to Redux example
}
```

### Testing React Applications

#### Jest and React Testing Library

```jsx
// Button.jsx
function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with correct text', () => {
  render(<Button text="Click me" onClick={() => {}} />);
  const buttonElement = screen.getByText(/click me/i);
  expect(buttonElement).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button text="Click me" onClick={handleClick} />);
  const buttonElement = screen.getByText(/click me/i);
  
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

#### Snapshot Testing

```jsx
import { render } from '@testing-library/react';
import Card from './Card';

test('renders Card component correctly', () => {
  const { asFragment } = render(
    <Card title="Test Card">
      <p>Test content</p>
    </Card>
  );
  expect(asFragment()).toMatchSnapshot();
});
```

#### Testing Hooks

```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

### Best Practices & Patterns

#### Component Organization

- **Atomic Design:** Organize components as atoms, molecules, organisms, templates, and pages.
- **Feature-Based Structure:** Group related components, hooks, tests, and styles by feature.

#### Conditional Rendering

```jsx
function ConditionalComponent({ isLoggedIn }) {
  // Using ternary operator
  return isLoggedIn ? <UserDashboard /> : <LoginForm />;
  
  // Using && operator (for simple cases)
  return isLoggedIn && <UserDashboard />;
  
  // Using early return
  if (!isLoggedIn) return <LoginForm />;
  return <UserDashboard />;
}
```

#### Composition over Inheritance

```jsx
// Instead of inheritance:
function Button({ color, ...props }) {
  return <button className={`btn btn-${color}`} {...props} />;
}

function PrimaryButton(props) {
  return <Button color="primary" {...props} />;
}

function DangerButton(props) {
  return <Button color="danger" {...props} />;
}
```

#### Controlled vs. Uncontrolled Components

**Controlled:**
```jsx
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

**Uncontrolled:**
```jsx
function UncontrolledInput() {
  const inputRef = useRef(null);
  
  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };
  
  return (
    <>
      <input type="text" ref={inputRef} defaultValue="initial value" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

#### Render Props Pattern

```jsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return render(position);
}

// Usage
function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <div>
          Mouse position: ({x}, {y})
        </div>
      )}
    />
  );
}
```

#### HOC (Higher-Order Component) Pattern

```jsx
function withUser(WrappedComponent) {
  return function WithUser(props) {
    const user = useContext(UserContext);
    
    return <WrappedComponent user={user} {...props} />;
  };
}

// Usage
function UserProfile({ user }) {
  return <div>Hello, {user.name}!</div>;
}

const UserProfileWithUser = withUser(UserProfile);
```

### Common Interview Questions

1. **What is React and what are its main features?**
   - React is a JavaScript library for building user interfaces
   - Main features: Virtual DOM, component-based architecture, unidirectional data flow, JSX

2. **What is JSX?**
   - JSX is a syntax extension for JavaScript that looks similar to HTML
   - It allows us to write HTML-like code in JavaScript
   - JSX is compiled to regular JavaScript by tools like Babel

3. **What is the difference between state and props?**
   - Props are passed from parent to child components and are immutable
   - State is managed within a component and can be updated using setState or useState

4. **What are controlled and uncontrolled components?**
   - Controlled components: Form elements whose values are controlled by React state
   - Uncontrolled components: Form elements that maintain their own internal state

5. **What are React Hooks? Name some built-in hooks.**
   - Hooks let you use state and other React features without writing classes
   - Built-in hooks: useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef

6. **What is the Context API used for?**
   - It provides a way to pass data through the component tree without having to pass props down manually at every level

7. **Explain the Virtual DOM and how it works.**
   - Virtual DOM is a lightweight copy of the actual DOM
   - When state changes, React creates a new Virtual DOM tree
   - It compares this new tree with the previous one (diffing)
   - It then updates only the parts of the actual DOM that need to change

8. **What are keys in React lists and why are they important?**
   - Keys help React identify which items have changed, been added, or been removed
   - They should be unique among siblings
   - Using array indices as keys is not recommended if the order might change

9. **What is code splitting in React?**
   - Code splitting is a technique to split your code into smaller chunks
   - It allows loading only the required code for a particular route or component
   - Implemented using React.lazy and Suspense

10. **How do you optimize performance in React applications?**
    - Use React.memo, PureComponent, or shouldComponentUpdate to prevent unnecessary renders
    - Implement code splitting with React.lazy
    - Use useMemo and useCallback hooks to memoize values and functions
    - Use production builds
    - Implement virtualized lists for long lists (react-window, react-virtualized)

11. **Explain the component lifecycle in React.**
    - Class components: mounting, updating, and unmounting phases
    - Functional components with hooks: useEffect replaces most lifecycle methods

12. **What are error boundaries in React?**
    - Components that catch JavaScript errors in children components
    - They log errors and display fallback UI

13. **How would you pass data between sibling components?**
    - Lift state up to a common parent
    - Use Context API
    - Use a state management library like Redux

14. **What is Redux and when would you use it?**
    - Redux is a predictable state container for JavaScript apps
    - Use it for complex state management across many components
    - Useful for large applications with complex data flows

15. **What is the difference between Element and Component in React?**
    - Element: Plain object describing what to render (lightweight)
    - Component: Function or class that accepts props and returns React elements

---

[Back to Top](#ultimate-react-interview-cheatsheet) | [Jump to Part 1: Introduction & Fundamentals](#part-1-introduction--fundamentals) | [Jump to Part 2: Hooks & Advanced Concepts](#part-2-hooks--advanced-concepts)