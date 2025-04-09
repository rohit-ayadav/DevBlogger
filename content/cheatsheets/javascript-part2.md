# JavaScript Interview Preparation Cheatsheet Part II: Advanced Concepts


## Introduction

Welcome to the second part of our comprehensive JavaScript interview preparation guide. This cheatsheet covers advanced JavaScript concepts that frequently appear in technical interviews. Whether you're preparing for a front-end, full-stack, or Node.js position, mastering these topics will significantly boost your confidence and performance during coding interviews.

In this guide, we'll explore DOM manipulation, error handling, design patterns, performance optimization, testing methodologies, and many other advanced JavaScript topics. Each section includes practical code examples that you can use as reference during your interview preparation.


## Table of Contents

- [DOM Manipulation](#dom-manipulation)
- [Error Handling](#error-handling)
- [JavaScript Design Patterns](#javascript-design-patterns)
- [Performance Optimization](#performance-optimization)
- [Testing](#testing)
- [Common Interview Questions](#common-interview-questions)
- [Performance Optimization Techniques](#performance-optimization-techniques)
- [Security Best Practices](#security-best-practices)
- [Accessibility (A11y)](#accessibility-a11y)
- [Modern JavaScript Features](#modern-javascript-features-es2021-2023)
- [Regular Expressions](#regular-expressions)
- [Developer Tools and Debugging](#developer-tools-and-debugging)
- [Node.js Essentials](#nodejs-essentials)



## DOM Manipulation

The Document Object Model (DOM) is a programming interface for HTML documents. Understanding how to efficiently manipulate the DOM is crucial for front-end development and often tested in interviews.

### Selecting Elements

Element selection is the foundation of DOM manipulation. JavaScript provides multiple ways to select elements from the document:

```javascript
// By ID
const element = document.getElementById("myId");

// By class name
const elements = document.getElementsByClassName("myClass");

// By tag name
const divs = document.getElementsByTagName("div");

// CSS selector (returns first match)
const header = document.querySelector("header");

// CSS selector (returns all matches)
const buttons = document.querySelectorAll("button.primary");

// Relative selections
const parent = element.parentElement;
const children = element.children;
const next = element.nextElementSibling;
const previous = element.previousElementSibling;
```

### Manipulating Elements

Once you've selected elements, you'll need to know how to create, modify, and remove them from the DOM:

```javascript
// Creating elements
const div = document.createElement("div");
const text = document.createTextNode("Hello");

// Appending elements
element.appendChild(div);
element.append(div, text); // Can append multiple nodes
element.prepend(div); // Insert at beginning

// Inserting elements
element.insertBefore(newElement, referenceElement);
element.insertAdjacentElement("beforebegin", newElement);
element.insertAdjacentHTML("afterend", "<p>New paragraph</p>");

// Replacing elements
element.replaceChild(newElement, oldElement);
oldElement.replaceWith(newElement);

// Removing elements
element.removeChild(childElement);
childElement.remove();

// Cloning elements
const clone = element.cloneNode(true); // true includes all descendants
```

### Manipulating Content

Working with element content is a common task in DOM manipulation:

```javascript
// Reading content
const text = element.textContent; // All text content
const html = element.innerHTML; // HTML content
const outerHtml = element.outerHTML; // Element and its HTML content
const value = inputElement.value; // For form elements

// Setting content
element.textContent = "New text";
element.innerHTML = "<strong>Bold text</strong>";
element.outerHTML = "<div>Replaced element</div>";
inputElement.value = "New value";
```

### Working with Attributes

Element attributes store additional information and control element behavior:

```javascript
// Get attribute
const id = element.getAttribute("id");
const href = linkElement.href; // Direct property access

// Set attribute
element.setAttribute("id", "newId");
element.id = "newId"; // Direct property access
element.className = "newClass";

// Check attribute
const hasAttr = element.hasAttribute("data-id");

// Remove attribute
element.removeAttribute("id");

// Data attributes
element.dataset.userId = "123"; // Sets data-user-id="123"
const userId = element.dataset.userId; // Gets data-user-id
```

### Manipulating CSS

Modifying the visual presentation of elements is another essential DOM manipulation skill:

```javascript
// Get computed style
const style = window.getComputedStyle(element);
const color = style.color;

// Inline styles
element.style.color = "red";
element.style.fontSize = "16px";
element.style.backgroundColor = "blue";

// Add/remove classes
element.classList.add("active");
element.classList.remove("disabled");
element.classList.toggle("visible");
element.classList.contains("active");
element.classList.replace("old", "new");

// Multiple classes
element.className = "btn primary";
```

### Event Handling

Event handling is crucial for creating interactive web applications:

```javascript
// Add event listener
element.addEventListener("click", function(event) {
  console.log("Clicked!", event);
});

// Remove event listener
function handleClick(event) {
  console.log("Clicked!");
}
element.addEventListener("click", handleClick);
element.removeEventListener("click", handleClick);

// Event with options
element.addEventListener("click", handleClick, {
  once: true, // Only trigger once
  capture: true, // Use capture phase
  passive: true // Indicates no preventDefault()
});

// Prevent default action
form.addEventListener("submit", function(event) {
  event.preventDefault();
});

// Stop propagation
child.addEventListener("click", function(event) {
  event.stopPropagation();
});

// Event delegation
document.getElementById("parent").addEventListener("click", function(event) {
  if (event.target.matches(".button")) {
    console.log("Button clicked:", event.target);
  }
});

// Custom events
const customEvent = new CustomEvent("myEvent", {
  bubbles: true,
  cancelable: true,
  detail: { name: "John" }
});
element.dispatchEvent(customEvent);
```

### Browser Window and Document

Understanding how to interact with the browser window and document is important for creating responsive web applications:

```javascript
// Window dimensions
const width = window.innerWidth;
const height = window.innerHeight;

// Scroll
window.scrollTo(0, 100);
window.scrollBy(0, 100);
element.scrollIntoView({ behavior: "smooth" });

// Location
window.location.href = "https://example.com";
window.location.reload();
window.location.pathname;

// History
window.history.back();
window.history.forward();
window.history.pushState({ page: 1 }, "Title", "/page1");

// Cookies
document.cookie = "name=value; expires=Thu, 01 Jan 2023 00:00:00 UTC; path=/";

// Local and session storage
localStorage.setItem("key", "value");
const value = localStorage.getItem("key");
localStorage.removeItem("key");
localStorage.clear();

// Similar methods for sessionStorage
```

<!-- ADSENSE -->

## Error Handling

Proper error handling is a hallmark of robust JavaScript applications. Interviewers often evaluate how well candidates manage errors and edge cases.

### Try-Catch-Finally

The try-catch-finally statement is the fundamental error handling mechanism in JavaScript:

```javascript
try {
  // Code that might throw an error
  throw new Error("Something went wrong");
} catch (error) {
  // Handle the error
  console.error(error.message);
} finally {
  // Always executes, regardless of error
  console.log("Cleanup code");
}
```

### Error Types

JavaScript has several built-in error types for different scenarios:

```javascript
// Built-in error types
new Error("Generic error");
new SyntaxError("Invalid syntax");
new ReferenceError("Variable not defined");
new TypeError("Invalid type");
new RangeError("Value out of range");
new URIError("Invalid URI");
new EvalError("Invalid eval() usage");

// Custom error
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.code = "INVALID_INPUT";
  }
}

throw new ValidationError("Invalid email format");
```

### Async Error Handling

Handling errors in asynchronous code requires different approaches:

```javascript
// Promise catch
fetchData()
  .then(data => processData(data))
  .catch(error => console.error(error));

// Async/await try-catch
async function getData() {
  try {
    const data = await fetchData();
    return processData(data);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw or handle
  }
}

// Global unhandled rejection
window.addEventListener("unhandledrejection", event => {
  console.error("Unhandled rejection:", event.reason);
});

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
  console.error("Global error:", error);
  return true; // Prevents default error handling
};
```

<!-- ADSENSE -->

## JavaScript Design Patterns

Design patterns are reusable solutions to common problems in software design. Understanding these patterns demonstrates a deeper knowledge of JavaScript programming.

### Singleton Pattern

The Singleton pattern ensures a class has only one instance and provides a global point of access to it:

```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.data = [];
  }
  
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true
```

### Factory Pattern

The Factory pattern creates objects without exposing the instantiation logic:

```javascript
class UserFactory {
  createUser(type) {
    switch (type) {
      case "admin":
        return new AdminUser();
      case "customer":
        return new CustomerUser();
      default:
        return new GuestUser();
    }
  }
}

const factory = new UserFactory();
const admin = factory.createUser("admin");
```

### Observer Pattern

The Observer pattern defines a dependency between objects so that when one object changes state, all its dependents are notified:

```javascript
class Observable {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
    return () => this.unsubscribe(observer); // Return unsubscribe function
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log("Received update:", data);
  }
}
```

### Module Pattern

The Module pattern encapsulates private functionality and exposes a public API:

```javascript
// ES6 Modules (already covered)

// Revealing Module Pattern (old style)
const calculator = (function() {
  // Private
  let result = 0;
  
  function add(a, b) {
    result = a + b;
    return result;
  }
  
  function multiply(a, b) {
    result = a * b;
    return result;
  }
  
  // Public API
  return {
    add,
    multiply,
    getResult: () => result
  };
})();
```

### Decorator Pattern

The Decorator pattern extends object behavior dynamically:

```javascript
function withLogging(wrappedFunction) {
  return function(...args) {
    console.log(`Calling function with args: ${args}`);
    const result = wrappedFunction.apply(this, args);
    console.log(`Function returned: ${result}`);
    return result;
  };
}

const add = (a, b) => a + b;
const addWithLogging = withLogging(add);

addWithLogging(2, 3); // Logs input and output

// Class decorators (with TypeScript)
@logged
class User {
  // ...
}
```

### Proxy Pattern

The Proxy pattern provides a surrogate for another object to control access to it:

```javascript
const user = {
  name: "John",
  age: 30
};

const userProxy = new Proxy(user, {
  get(target, property) {
    console.log(`Reading property: ${property}`);
    return target[property];
  },
  
  set(target, property, value) {
    console.log(`Setting property: ${property} to ${value}`);
    if (property === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }
    target[property] = value;
    return true;
  }
});
```

<!-- ADSENSE -->

## Performance Optimization

Performance optimization is a critical skill for JavaScript developers. Interviews often include questions about optimizing code execution and memory usage.

### Memory Management

Proper memory management prevents leaks and ensures efficient resource usage:

```javascript
// Memory leaks in closures
function createClosure() {
  const largeData = new Array(1000000).fill("x");
  return function() {
    return largeData[0]; // Holds reference to largeData
  };
}

// Proper cleanup
function addListener() {
  const element = document.getElementById("button");
  const handler = () => console.log("Clicked");
  element.addEventListener("click", handler);
  
  // Return cleanup function
  return () => {
    element.removeEventListener("click", handler);
  };
}

// Weak references
const cache = new WeakMap();
const user = { id: 1 };
cache.set(user, userData);
// When 'user' is garbage collected, userData will also be collected
```

### Efficient DOM Manipulation

DOM operations are expensive, so it's important to minimize them:

```javascript
// Inefficient
for (let i = 0; i < 1000; i++) {
  document.body.appendChild(document.createElement("div"));
}

// Efficient (Document Fragment)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  fragment.appendChild(document.createElement("div"));
}
document.body.appendChild(fragment);

// Efficient (Batch updates)
function batchDOMUpdates() {
  // Schedule updates for next repaint
  requestAnimationFrame(() => {
    // Update DOM here
  });
}
```

### Event Debouncing and Throttling

Debouncing and throttling improve performance by controlling how frequently functions execute:

```javascript
// Debounce
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedSearch = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 300);

// Throttle
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const throttledScroll = throttle(() => {
  console.log("Scroll event");
}, 100);
```

### Web Workers

Web Workers enable concurrent JavaScript execution:

```javascript
// In main script
const worker = new Worker('worker.js');

worker.postMessage({ data: 'Some data' });

worker.onmessage = function(event) {
  console.log('Worker result:', event.data);
};

worker.onerror = function(error) {
  console.error('Worker error:', error);
};

// In worker.js
self.onmessage = function(event) {
  const result = performHeavyComputation(event.data);
  self.postMessage(result);
};
```

<!-- ADSENSE -->

## Testing

Testing knowledge is a significant differentiator in JavaScript interviews. Understanding testing methodologies demonstrates a professional approach to development.

### Unit Testing with Jest

Jest is a popular JavaScript testing framework:

```javascript
// Function to test
function sum(a, b) {
  return a + b;
}

// Test case
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// Testing async code
test('fetchData returns correct data', async () => {
  const data = await fetchData();
  expect(data).toEqual({ name: 'John' });
});

// Mocking
jest.mock('./api');
import { fetchUsers } from './api';
fetchUsers.mockResolvedValue([{ id: 1, name: 'John' }]);

// Snapshot testing
test('renders correctly', () => {
  const tree = renderer.create(<Component />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

### Test-Driven Development (TDD)

Test-Driven Development is a methodology where tests are written before implementation:

```javascript
// 1. Write a failing test
test('should calculate correct total', () => {
  const cart = new ShoppingCart();
  cart.addItem({ price: 10 });
  cart.addItem({ price: 20 });
  expect(cart.getTotal()).toBe(30);
});

// 2. Implement the code to make it pass
class ShoppingCart {
  constructor() {
    this.items = [];
  }
  
  addItem(item) {
    this.items.push(item);
  }
  
  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}

// 3. Refactor if needed
```

<!-- ADSENSE -->

## Common Interview Questions

These are frequently asked JavaScript concepts in technical interviews.

### Closures

Closures are functions that remember the environment in which they were created:

```javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

### this Context

The `this` keyword behavior is a common source of confusion:

```javascript
const user = {
  name: 'John',
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  },
  sayHiArrow: () => {
    console.log(`Hi, I'm ${this.name}`); // 'this' is not bound to user
  }
};

user.sayHi(); // Hi, I'm John
const hi = user.sayHi;
hi(); // Hi, I'm undefined (or window.name in browsers)
```

### Event Loop

Understanding the event loop is crucial for async JavaScript:

```javascript
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
// Output: 1, 4, 3, 2
```

### Prototypal Inheritance

JavaScript's inheritance model is prototype-based:

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a noise.`;
};

function Dog(name) {
  Animal.call(this, name);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  return `${this.name} barks.`;
};

const dog = new Dog('Rex');
console.log(dog.speak()); // Rex barks.
```

### Promise Implementation

Understanding Promise internals demonstrates advanced JavaScript knowledge:

```javascript
function myPromise(executor) {
  let state = 'pending';
  let value = null;
  const callbacks = [];

  function resolve(result) {
    if (state !== 'pending') return;
    state = 'fulfilled';
    value = result;
    callbacks.forEach(cb => cb.onFulfilled(value));
  }

  function reject(error) {
    if (state !== 'pending') return;
    state = 'rejected';
    value = error;
    callbacks.forEach(cb => cb.onRejected(value));
  }

  this.then = function(onFulfilled, onRejected) {
    return new myPromise((resolve, reject) => {
      const callback = {
        onFulfilled: function(value) {
          try {
            const result = onFulfilled(value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
        onRejected: function(reason) {
          try {
            const result = onRejected(reason);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }
      };
      
      if (state === 'pending') {
        callbacks.push(callback);
      } else if (state === 'fulfilled') {
        callback.onFulfilled(value);
      } else {
        callback.onRejected(value);
      }
    });
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
```

### Debounce Implementation

Implementing debounce showcases practical JavaScript skills:

```javascript
function debounce(func, wait = 100) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// Usage
const debouncedSearch = debounce(search, 300);
inputElement.addEventListener('input', e => debouncedSearch(e.target.value));
```

### Deep Clone Implementation

Implementing deep clone demonstrates understanding of recursion and object traversal:

```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  if (obj instanceof Object) {
    const copy = {};
    Object.keys(obj).forEach(key => {
      copy[key] = deepClone(obj[key]);
    });
    return copy;
  }
  
  throw new Error("Unable to copy obj");
}
```

### Memoization Implementation

Memoization optimizes recursive or expensive functions:

```javascript
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Fast calculation
```

### Currying Implementation

Currying transforms functions with multiple arguments into a sequence of functions:

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// Usage
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1, 2, 3)); // 6
```

<!-- ADSENSE -->

## Performance Optimization Techniques

Optimizing web performance is crucial in modern web development. These techniques can significantly improve user experience.

### Critical Rendering Path

Optimizing the critical rendering path improves page load performance:

```javascript
// Defer non-critical JavaScript
<script src="non-critical.js" defer></script>

// Async loading when order doesn't matter
<script src="analytics.js" async></script>

// Preload critical resources
<link rel="preload" href="critical.css" as="style">
```

### Code Splitting

Code splitting reduces initial load time by loading code on demand:

```javascript
// Dynamic imports (ES2020)
button.addEventListener('click', async () => {
  const module = await import('./feature.js');
  module.default();
});
```

### Tree Shaking

Tree shaking eliminates unused code from the final bundle:

```javascript
// Only imports what's used (with bundlers like webpack)
import { useState, useEffect } from 'react'; // Only imports these specific functions
```

### Virtualization

Virtualization improves performance when rendering large lists:

```javascript
// Only render visible items in long lists
function VirtualList({ items }) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
  
  function handleScroll() {
    // Calculate new visible range based on scroll position
    // ...
    setVisibleRange(newRange);
  }
  
  return (
    <div onScroll={handleScroll}>
      {items.slice(visibleRange.start, visibleRange.end).map(item => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  );
}
```

<!-- ADSENSE -->

## Security Best Practices

Web security is an increasingly important aspect of JavaScript development. Understanding security best practices is essential for building secure applications.

### Content Security Policy

Content Security Policy (CSP) helps prevent various types of attacks:

```javascript
// Set CSP header
// Content-Security-Policy: default-src 'self'; script-src 'self' trusted-scripts.com

// Or in HTML
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

### Preventing XSS

Cross-Site Scripting (XSS) protection is fundamental web security:

```javascript
// Escape user input
function escapeHTML(text) {
  return text.replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

// Use textContent instead of innerHTML
element.textContent = userProvidedContent; // Safe
```

### CSRF Protection

Cross-Site Request Forgery (CSRF) protection secures your application's endpoints:

```javascript
// Add CSRF token to forms
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
const formData = new FormData(form);
formData.append('_csrf', csrfToken);

// Add CSRF token to fetch requests
fetch('/api/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify(data)
});
```

### Secure Authentication

Proper authentication practices protect user accounts:

```javascript
// Store tokens in HttpOnly cookies
document.cookie = "token=value; HttpOnly; Secure; SameSite=Strict";

// Use HTTPS
if (location.protocol !== 'https:') {
  location.replace(`https:${location.href.substring(location.protocol.length)}`);
}
```

<!-- ADSENSE -->

## Accessibility (A11y)

Accessibility ensures web applications are usable by everyone. It's increasingly becoming a requirement for professional web development.

### Semantic HTML

Using semantic HTML improves accessibility and SEO:

```javascript
// Prefer semantic HTML elements
const template = `
  <header>
    <h1>Page Title</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <article>
      <section>
        <h2>Section Title</h2>
        <p>Content goes here</p>
      </section>
    </article>
  </main>
  <footer>
    <p>&copy; 2025</p>
  </footer>
`;
```

### ARIA Attributes

ARIA (Accessible Rich Internet Applications) attributes enhance accessibility:

```javascript
// Add ARIA attributes for accessibility
button.setAttribute('aria-label', 'Close dialog');
button.setAttribute('aria-expanded', 'false');
menu.setAttribute('aria-hidden', 'true');

// Update ARIA attributes dynamically
function toggleMenu() {
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !isExpanded);
  menu.setAttribute('aria-hidden', isExpanded);
}
```

### Focus Management

Proper focus management is crucial for keyboard navigation:

```javascript
// Trap focus in modal dialogs
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', event => {
    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  });
}

// Set initial focus
function openModal(modal) {
  modal.style.display = 'block';
  const firstFocusable = modal.querySelector('button, [href], input');
  firstFocusable?.focus();
  trapFocus(modal);
}
```

### Keyboard Accessibility

Supporting keyboard interaction improves accessibility:

```javascript
// Handle keyboard events for custom controls
const slider = document.querySelector('.custom-slider');
let value = 50;

slider.setAttribute('role', 'slider');
slider.setAttribute('aria-valuemin', '0');
slider.setAttribute('aria-valuemax', '100');
slider.setAttribute('aria-valuenow', value);
slider.setAttribute('tabindex', '0');

slider.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      value = Math.min(value + 10, 100);
      break;
    case 'ArrowLeft':
    case 'ArrowDown':
      value = Math.max(value - 10, 0);
      break;
    case 'Home':
      value = 0;
      break;
    case 'End':
      value = 100;
      break;
    default:
      return;
  }
  
  slider.setAttribute('aria-valuenow', value);
  slider.style.setProperty('--value', `${value}%`);
  event.preventDefault();
});
```

<!-- ADSENSE -->

## Modern JavaScript Features (ES2021-2023)

Staying current with the latest JavaScript features demonstrates your commitment to continuous learning.

### Numeric Separators (ES2021)

Numeric separators improve readability of large numbers:

```javascript
// Make large numbers more readable
const billion = 1_000_000_000;
const nibble = 0b1010_0001;
const bytes = 0xFF_FF_FF_FF;
```

<!-- ### Logical Assignment Operators -->

<!-- ADSENSE -->

## Logical Assignment Operators (ES2021)

Logical assignment operators provide shorthand syntax for common logical operations:

```javascript
// OR assignment
x ||= y; // x = x || y

// AND assignment
x &&= y; // x = x && y

// Nullish coalescing assignment
x ??= y; // x = x ?? y
```

### String.prototype.replaceAll (ES2021)

The replaceAll method makes it easier to replace all occurrences of a substring:

```javascript
// Replace all occurrences without using regex global flag
const sentence = "JavaScript is awesome. JavaScript is fun.";
const newSentence = sentence.replaceAll("JavaScript", "TypeScript");
// "TypeScript is awesome. TypeScript is fun."
```

### Promise.any (ES2021)

Promise.any resolves when any of the provided promises resolves:

```javascript
// Resolves when any promise resolves, rejects only if all reject
Promise.any([
  fetch('https://api.example.com/endpoint-1'),
  fetch('https://api.example.com/endpoint-2'),
  fetch('https://api.example.com/endpoint-3')
])
  .then(result => console.log(result))
  .catch(errors => console.log(errors)); // AggregateError
```

### WeakRef (ES2021)

WeakRef provides a way to hold a weak reference to an object:

```javascript
// Create a weak reference that doesn't prevent garbage collection
const target = {};
const weakRef = new WeakRef(target);

// Access the target object later, if it still exists
const obj = weakRef.deref();
if (obj) {
  console.log("Object still exists");
}
```

### Class Fields (ES2022)

Class fields simplify class definitions by allowing property declarations directly in the class:

```javascript
class Counter {
  // Public field
  count = 0;
  
  // Private field
  #privateValue = 42;
  
  // Static field
  static instances = 0;
  
  constructor() {
    Counter.instances++;
  }
  
  increment() {
    this.count++;
    return this.#privateValue;
  }
}
```

### Class Static Blocks (ES2022)

Static initialization blocks provide a way to perform one-time initialization for a class:

```javascript
class Service {
  static instances = [];
  static config = {};
  
  // Static initialization block
  static {
    const data = loadConfigFromLocalStorage();
    Service.config = data;
    console.log('Service initialized');
  }
  
  constructor(name) {
    this.name = name;
    Service.instances.push(this);
  }
}
```

### Error Cause (ES2022)

Error cause provides a standardized way to capture and preserve error chain information:

```javascript
try {
  // Some operation
} catch (error) {
  throw new Error('Failed to process data', { cause: error });
}

// Later in error handling
try {
  processData();
} catch (error) {
  console.error('Main error:', error);
  console.error('Original cause:', error.cause);
}
```

### Object.hasOwn (ES2022)

Object.hasOwn is a safer replacement for Object.prototype.hasOwnProperty:

```javascript
// Safer replacement for Object.prototype.hasOwnProperty
const object = { prop: 'exists' };
Object.hasOwn(object, 'prop'); // true
Object.hasOwn(object, 'toString'); // false
Object.hasOwn(null, 'anything'); // Doesn't throw, returns false
```

### Array.prototype.at (ES2022)

The at method provides a more convenient way to access array elements, especially from the end:

```javascript
const array = [10, 20, 30, 40, 50];

// Access from the end
array.at(-1); // 50
array.at(-2); // 40

// Same as normal indexing for positive indices
array.at(0); // 10
array.at(1); // 20
```

### Top-level await (ES2022)

Top-level await allows using await outside of async functions in modules:

```javascript
// In modules, await can be used outside of async functions
const response = await fetch('https://api.example.com/data');
const data = await response.json();
export { data };
```

### Temporal (Proposal)

Temporal is a new date/time API that is still in the proposal stage:

```javascript
// Modern date/time API (Still in proposal stage)
const now = Temporal.now.instant();
const nyc = Temporal.TimeZone.from('America/New_York');
const nycTime = now.toZonedDateTimeISO(nyc);

// Duration
const duration = Temporal.Duration.from({ hours: 2, minutes: 30 });
const later = nycTime.add(duration);
```

<!-- ADSENSE -->

## Regular Expressions

Regular expressions (regex) are a powerful tool for pattern matching and text manipulation. They are frequently used in string validation, parsing, and transformation.

### Basic Patterns

Understanding the basic regex patterns is essential:

```javascript
// Character classes
/[abc]/ // Matches 'a', 'b', or 'c'
/[^abc]/ // Matches any character except 'a', 'b', or 'c'
/[a-z]/ // Matches any lowercase letter
/[A-Z]/ // Matches any uppercase letter
/[0-9]/ // Matches any digit

// Shorthand character classes
/\d/ // Matches any digit: [0-9]
/\D/ // Matches any non-digit: [^0-9]
/\w/ // Matches any word character: [a-zA-Z0-9_]
/\W/ // Matches any non-word character
/\s/ // Matches any whitespace character: [ \t\n\r\f\v]
/\S/ // Matches any non-whitespace character

// Anchors
/^start/ // Matches 'start' at the beginning of a string
/end$/ // Matches 'end' at the end of a string
/\bword\b/ // Matches 'word' with word boundaries

// Quantifiers
/a*/ // Matches 0 or more 'a's
/a+/ // Matches 1 or more 'a's
/a?/ // Matches 0 or 1 'a's
/a{3}/ // Matches exactly 3 'a's
/a{3,}/ // Matches 3 or more 'a's
/a{3,5}/ // Matches between 3 and 5 'a's

// Groups
/(abc)/ // Captures 'abc'
/(?:abc)/ // Non-capturing group
/(?<name>abc)/ // Named capturing group (ES2018)
```

### RegExp Methods

JavaScript provides several methods for working with regular expressions:

```javascript
// test() - returns boolean
/pattern/.test('string'); // true or false

// exec() - returns array with match information or null
/(\d{3})-(\d{4})/.exec('Call 555-1234 now');
// ['555-1234', '555', '1234', index: 5, input: 'Call 555-1234 now', groups: undefined]

// match() - returns array of matches
'Hello world'.match(/o/g); // ['o', 'o']

// matchAll() - returns iterator of all matches (ES2020)
const matches = 'test1 test2'.matchAll(/test(\d)/g);
for (const match of matches) {
  console.log(match); // ['test1', '1', index: 0, input: 'test1 test2', groups: undefined], etc.
}

// replace() - replaces matches
'Hello world'.replace(/o/g, 'a'); // 'Hella warld'

// replaceAll() - replaces all matches (ES2021)
'Hello world'.replaceAll('o', 'a'); // 'Hella warld'

// search() - returns index of first match or -1
'Hello world'.search(/o/); // 4

// split() - splits string at matches
'apple,orange,banana'.split(/,/); // ['apple', 'orange', 'banana']
```

### Regex Flags

Regular expression flags modify how the pattern is interpreted:

```javascript
/pattern/g // Global - match all occurrences
/pattern/i // Case-insensitive
/pattern/m // Multiline - ^ and $ match start/end of lines
/pattern/s // DotAll - . matches newlines too (ES2018)
/pattern/u // Unicode
/pattern/y // Sticky - match at lastIndex position only
```

### Advanced Patterns

Advanced regex features provide more powerful pattern matching capabilities:

```javascript
// Lookaheads and lookbehinds
/abc(?=def)/ // Positive lookahead: 'abc' followed by 'def'
/abc(?!def)/ // Negative lookahead: 'abc' not followed by 'def'
/(?<=def)abc/ // Positive lookbehind: 'abc' preceded by 'def' (ES2018)
/(?<!def)abc/ // Negative lookbehind: 'abc' not preceded by 'def' (ES2018)

// Unicode property escapes (ES2018)
/\p{Script=Greek}/u // Matches Greek script characters
/\p{Letter}/u // Matches any letter

// Named capture groups (ES2018)
const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = regex.exec('2025-03-28');
console.log(match.groups.year); // '2025'
console.log(match.groups.month); // '03'
```

<!-- ADSENSE -->

## Developer Tools and Debugging

Effective debugging is a critical skill for JavaScript developers. Understanding the available tools and techniques can significantly improve your productivity.

### Console Methods

The console object provides various methods for debugging:

```javascript
// Basic logging
console.log('Basic message');
console.error('Error message'); // Red in console
console.warn('Warning message'); // Yellow in console
console.info('Info message'); // Blue in console

// Grouping
console.group('Group name');
console.log('Message inside group');
console.groupEnd();

// Collapsible group
console.groupCollapsed('Collapsed group');
console.log('Hidden by default');
console.groupEnd();

// Tables
console.table([
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
]);

// Time measurement
console.time('operation');
// ...some code to measure
console.timeEnd('operation'); // "operation: 1.23ms"

// Assertions
console.assert(value === 5, 'Value should be 5'); // Only logs if condition is false

// Style in console
console.log('%cStyled Text', 'color: red; font-size: 20px;');

// Count occurrences
console.count('label'); // "label: 1"
console.count('label'); // "label: 2"
console.countReset('label'); // Resets counter

// Stack traces
console.trace('Trace message'); // Shows stack trace
```

### Debugger Statement

The debugger statement pauses execution and calls the debugging function:

```javascript
function problematicFunction() {
  let x = 5;
  debugger; // Execution pauses here when DevTools is open
  x = x + calculateSomething();
  return x;
}
```

### Performance Measurement

Performance measurement helps identify bottlenecks in your code:

```javascript
// Manual performance tracking
const start = performance.now();
// ...code to measure
const end = performance.now();
console.log(`Operation took ${end - start} milliseconds`);

// Performance timeline markers
performance.mark('start');
// ...code to measure
performance.mark('end');
performance.measure('Operation', 'start', 'end');
console.log(performance.getEntriesByName('Operation')[0].duration);
```

<!-- ADSENSE -->

## Node.js Essentials

Node.js is a JavaScript runtime for server-side development. Understanding Node.js is essential for full-stack JavaScript developers.

### CommonJS Modules

CommonJS is the module system used in Node.js:

```javascript
// Exporting in module.js
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// Or export individual items
exports.multiply = (a, b) => a * b;

// Importing in another file
const math = require('./module.js');
console.log(math.add(5, 3)); // 8

// Destructuring import
const { subtract } = require('./module.js');
console.log(subtract(5, 3)); // 2
```

### File System Operations

File system operations are a core part of Node.js applications:

```javascript
const fs = require('fs');

// Synchronous file reading
try {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}

// Asynchronous with callback
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// Promise-based with fs.promises (Node.js 10+)
const fsPromises = require('fs').promises;

async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

### HTTP Server

Creating HTTP servers is a fundamental skill for Node.js development:

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  
  if (req.url === '/api/users' && req.method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify({ users: ['John', 'Jane'] }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Process and Environment

The process object provides information about, and control over, the current Node.js process:

```javascript
// Command line arguments
console.log(process.argv); // Array of arguments

// Environment variables
console.log(process.env.NODE_ENV);

// Set environment variable
process.env.MY_VARIABLE = 'value';

// Exit process
process.exit(1); // Exit with error code

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  // Perform cleanup
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  // Perform cleanup
  process.exit(1);
});
```

<!-- ADSENSE -->

## Conclusion

This comprehensive JavaScript interview preparation cheatsheet has covered the most important advanced concepts you're likely to encounter in technical interviews. By mastering these topics, you'll be well-equipped to tackle challenging JavaScript questions and demonstrate your expertise.

Remember that understanding the underlying principles is more important than memorizing syntax. Practice implementing these concepts in real projects, work on coding challenges, and build a strong mental model of how JavaScript works.

As you prepare for interviews, focus on:

1. **Clear communication**: Explain your thought process and approach.
2. **Code quality**: Write clean, readable, and maintainable code.
3. **Problem-solving**: Break down complex problems into manageable steps.
4. **Optimization**: Consider performance and efficiency in your solutions.
5. **Edge cases**: Anticipate and handle unexpected inputs and scenarios.

With dedicated practice and a solid understanding of the concepts in this cheatsheet, you'll be well-prepared to excel in JavaScript technical interviews and advance your career as a JavaScript developer.

<!-- ADSENSE -->
<!-- ADSENSE -->

## Key Terms and Keywords

JavaScript, ECMAScript, ES6+, DOM manipulation, event handling, error handling, design patterns, performance optimization, testing, closures, this context, event loop, prototypal inheritance, promises, async/await, debounce, throttle, memoization, currying, code splitting, tree shaking, content security policy, XSS prevention, CSRF protection, semantic HTML, ARIA attributes, accessibility, modern JavaScript features, regular expressions, debugging, Node.js, HTTP server, file system operations, web development, front-end development, full-stack development, technical interview, coding interview, web performance, memory management, Web Workers, Jest, TDD, Test-Driven Development.
ADSENSE