# JavaScript Interview Preparation Cheatsheet

## Table of Contents
- [JavaScript Fundamentals](#javascript-fundamentals)
- [Variables and Data Types](#variables-and-data-types)
- [Operators](#operators)
- [Control Flow](#control-flow)
- [Functions](#functions)
- [Objects and Object-Oriented Programming](#objects-and-object-oriented-programming)
- [Arrays and Array Methods](#arrays-and-array-methods)
- [ES6+ Features](#es6-features)
- [Asynchronous JavaScript](#asynchronous-javascript)
- [DOM Manipulation](#dom-manipulation)
- [Error Handling](#error-handling)
- [JavaScript Design Patterns](#javascript-design-patterns)
- [Performance Optimization](#performance-optimization)
- [Testing](#testing)
- [Common Interview Questions](#common-interview-questions)

## JavaScript Fundamentals

### JavaScript Execution Context
- **Global Execution Context**: Created when a JavaScript script starts running
- **Function Execution Context**: Created when a function is called
- **Eval Execution Context**: Created when code is executed inside an eval function

### Hoisting
Variables and function declarations are moved to the top of their scope during compilation.

```javascript
// Function declaration - hoisted
console.log(sum(5, 10)); // Works: 15
function sum(a, b) {
  return a + b;
}

// Variable declaration - hoisted, but not initialization
console.log(x); // undefined (not error)
var x = 5;

// let and const are hoisted but not initialized (Temporal Dead Zone)
console.log(y); // ReferenceError
let y = 10;
```

### Scope
- **Global Scope**: Variables available throughout the code
- **Function Scope**: Variables available only within the function
- **Block Scope**: Variables available only within the block (introduced with let/const)

```javascript
var globalVar = "I'm global";

function myFunction() {
  var functionVar = "I'm function-scoped";
  
  if (true) {
    var varInBlock = "I'm function-scoped too";
    let letInBlock = "I'm block-scoped";
    const constInBlock = "I'm block-scoped too";
  }
  
  console.log(varInBlock); // Accessible
  console.log(letInBlock); // ReferenceError
}
```

### Closures
A closure is a function that has access to its outer function's variables even after the outer function has returned.

```javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

### this Keyword
The value of `this` depends on how a function is called:

```javascript
// In a method, 'this' refers to the owner object
const person = {
  name: 'John',
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};
person.greet(); // Hello, my name is John

// In a function, 'this' refers to the global object (or undefined in strict mode)
function standalone() {
  console.log(this);
}
standalone(); // Window object or undefined in strict mode

// In an event, 'this' refers to the element that received the event
button.addEventListener('click', function() {
  console.log(this); // The button element
});

// With call, apply, or bind, 'this' is explicitly set
function introduce(greeting) {
  console.log(`${greeting}, I'm ${this.name}`);
}

introduce.call({name: 'Alice'}, 'Hello'); // Hello, I'm Alice
introduce.apply({name: 'Bob'}, ['Hi']); // Hi, I'm Bob
const boundFn = introduce.bind({name: 'Charlie'});
boundFn('Hey'); // Hey, I'm Charlie
```
<!-- ADSENSE -->
## Variables and Data Types

### Variable Declaration
```javascript
// var: function-scoped, can be redeclared, hoisted
var x = 10;

// let: block-scoped, cannot be redeclared in same scope, hoisted but not initialized
let y = 20;

// const: block-scoped, cannot be reassigned, hoisted but not initialized
const z = 30;
```

### Primitive Data Types
```javascript
// String
const name = "JavaScript";

// Number
const num = 42;
const float = 3.14;
const infinity = Infinity;
const notANumber = NaN;

// Boolean
const isTrue = true;
const isFalse = false;

// null (explicitly nothing)
const empty = null;

// undefined (value not assigned)
let notDefined;
console.log(notDefined); // undefined

// Symbol (unique and immutable)
const uniqueKey = Symbol('description');

// BigInt (for large integers)
const bigNumber = 9007199254740991n;
```

### Reference Data Types
```javascript
// Object
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30
};

// Array
const fruits = ["apple", "banana", "orange"];

// Function
const greet = function(name) {
  return `Hello, ${name}!`;
};

// Date
const today = new Date();

// RegExp
const pattern = /\d+/g;

// Map
const map = new Map();
map.set('key', 'value');

// Set
const set = new Set([1, 2, 3]);
```

### Type Conversion
```javascript
// String to Number
Number("42"); // 42
parseInt("42px", 10); // 42
parseFloat("3.14"); // 3.14
+"42"; // 42 (unary plus)

// Number to String
String(42); // "42"
(42).toString(); // "42"
42 + ""; // "42" (concatenation)

// To Boolean
Boolean(0); // false
Boolean(""); // false
Boolean(null); // false
Boolean(undefined); // false
Boolean(NaN); // false
Boolean(false); // false
// Everything else is true

// Explicit vs Implicit
"42" - 0; // 42 (implicit)
"42" + 0; // "420" (string concatenation)
```

### Type Checking
```javascript
// typeof operator
typeof "string"; // "string"
typeof 42; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof Symbol(); // "symbol"
typeof 42n; // "bigint"
typeof {}; // "object"
typeof []; // "object" (arrays are objects)
typeof null; // "object" (historical bug)
typeof function(){}; // "function"

// instanceof operator (checks prototype chain)
[] instanceof Array; // true
new Date() instanceof Date; // true

// Array.isArray()
Array.isArray([]); // true
```
<!-- ADSENSE -->
## Operators

### Arithmetic Operators
```javascript
// Addition
5 + 3; // 8

// Subtraction
5 - 3; // 2

// Multiplication
5 * 3; // 15

// Division
5 / 3; // 1.6666...

// Modulus (remainder)
5 % 3; // 2

// Exponentiation
5 ** 3; // 125

// Increment
let a = 5;
a++; // Post-increment: returns 5, then a becomes 6
++a; // Pre-increment: a becomes 7, then returns 7

// Decrement
let b = 5;
b--; // Post-decrement: returns 5, then b becomes 4
--b; // Pre-decrement: b becomes 3, then returns 3
```

### Comparison Operators
```javascript
// Equal (value)
5 == "5"; // true (type coercion)

// Not Equal (value)
5 != "6"; // true

// Strict Equal (value and type)
5 === "5"; // false

// Strict Not Equal (value and type)
5 !== "5"; // true

// Greater Than
5 > 3; // true

// Less Than
5 < 10; // true

// Greater Than or Equal
5 >= 5; // true

// Less Than or Equal
5 <= 10; // true
```

### Logical Operators
```javascript
// AND
true && false; // false

// OR
true || false; // true

// NOT
!true; // false

// Nullish Coalescing
null ?? "default"; // "default"
undefined ?? "default"; // "default"
0 ?? "default"; // 0
"" ?? "default"; // ""

// Optional Chaining
const user = { address: { street: "Main St" } };
user?.address?.zipCode; // undefined (no error)
```

### Assignment Operators
```javascript
// Basic Assignment
let x = 5;

// Addition Assignment
x += 3; // x = x + 3

// Subtraction Assignment
x -= 2; // x = x - 2

// Multiplication Assignment
x *= 2; // x = x * 2

// Division Assignment
x /= 4; // x = x / 4

// Modulus Assignment
x %= 2; // x = x % 2

// Exponentiation Assignment
x **= 2; // x = x ** 2

// Logical AND Assignment
x &&= 1; // x = x && 1

// Logical OR Assignment
x ||= 5; // x = x || 5

// Nullish Coalescing Assignment
x ??= 10; // x = x ?? 10
```

### Bitwise Operators
```javascript
// AND
5 & 3; // 1 (0101 & 0011 = 0001)

// OR
5 | 3; // 7 (0101 | 0011 = 0111)

// XOR
5 ^ 3; // 6 (0101 ^ 0011 = 0110)

// NOT
~5; // -6 (~0101 = 1010 = -6 in two's complement)

// Left Shift
5 << 1; // 10 (0101 << 1 = 1010)

// Right Shift
5 >> 1; // 2 (0101 >> 1 = 0010)

// Unsigned Right Shift
-5 >>> 1; // 2147483645 (fills with zeros)
```

### Ternary Operator
```javascript
// condition ? expressionIfTrue : expressionIfFalse
const age = 20;
const message = age >= 18 ? "Adult" : "Minor";
```
<!-- ADSENSE -->
## Control Flow

### Conditional Statements
```javascript
// if statement
if (condition) {
  // code to execute if condition is true
}

// if...else statement
if (condition) {
  // code to execute if condition is true
} else {
  // code to execute if condition is false
}

// if...else if...else statement
if (condition1) {
  // code to execute if condition1 is true
} else if (condition2) {
  // code to execute if condition2 is true
} else {
  // code to execute if all conditions are false
}

// switch statement
switch (expression) {
  case value1:
    // code to execute if expression === value1
    break;
  case value2:
    // code to execute if expression === value2
    break;
  default:
    // code to execute if no case matches
}
```

### Loops
```javascript
// for loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// for...in loop (for object properties)
const person = { name: "John", age: 30 };
for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}

// for...of loop (for iterable objects)
const numbers = [1, 2, 3];
for (const num of numbers) {
  console.log(num);
}

// while loop
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// do...while loop
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);

// break statement (exits the loop)
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // 0, 1, 2, 3, 4
}

// continue statement (skips the current iteration)
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i); // 0, 1, 3, 4
}

// labeled statements
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop; // Breaks out of both loops
    }
    console.log(`${i}, ${j}`);
  }
}
```
<!-- ADSENSE -->
## Functions

### Function Declaration
```javascript
// Function declaration (hoisted)
function add(a, b) {
  return a + b;
}

// Function expression (not hoisted)
const subtract = function(a, b) {
  return a - b;
};

// Arrow function
const multiply = (a, b) => a * b;

// Immediately Invoked Function Expression (IIFE)
(function() {
  console.log("This runs immediately");
})();

// Named function expression
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};
```

### Function Parameters
```javascript
// Default parameters
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// Destructuring parameters
function printPerson({ name, age }) {
  console.log(`${name} is ${age} years old`);
}

// Arguments object (not available in arrow functions)
function logArgs() {
  console.log(arguments);
}
```

### Higher-Order Functions
```javascript
// Function that returns a function
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
const double = createMultiplier(2);
console.log(double(5)); // 10

// Function that takes a function as an argument
function applyOperation(a, b, operation) {
  return operation(a, b);
}
const result = applyOperation(5, 3, (x, y) => x + y); // 8
```

### Recursion
```javascript
// Factorial example
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Tail recursion (optimized)
function factorialTail(n, accumulator = 1) {
  if (n <= 1) return accumulator;
  return factorialTail(n - 1, n * accumulator);
}
```

### Function Methods
```javascript
// call method
function greet() {
  console.log(`Hello, ${this.name}!`);
}
greet.call({ name: "John" }); // Hello, John!

// apply method
function introduce(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}
introduce.apply({ name: "Alice" }, ["Hi", "!"]); // Hi, Alice!

// bind method
const person = { name: "Bob" };
const greetBob = greet.bind(person);
greetBob(); // Hello, Bob!
```
<!-- ADSENSE -->
## Objects and Object-Oriented Programming

### Object Creation
```javascript
// Object literal
const person = {
  name: "John",
  age: 30,
  greet() {
    return `Hello, my name is ${this.name}`;
  }
};

// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    return `Hello, my name is ${this.name}`;
  };
}
const john = new Person("John", 30);

// ES6 Classes
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hello, my name is ${this.name}`;
  }
  
  // Static method
  static compare(user1, user2) {
    return user1.age - user2.age;
  }
}
const alice = new User("Alice", 25);

// Object.create()
const personProto = {
  greet() {
    return `Hello, my name is ${this.name}`;
  }
};
const bob = Object.create(personProto);
bob.name = "Bob";
bob.age = 35;
```

### Object Properties and Methods
```javascript
// Accessing properties
person.name; // Dot notation
person["name"]; // Bracket notation

// Property descriptors
Object.defineProperty(person, "id", {
  value: 123,
  writable: false,
  enumerable: true,
  configurable: false
});

// Computed property names
const propName = "occupation";
const employee = {
  [propName]: "Developer"
};

// Method shorthand
const calculator = {
  add(a, b) {
    return a + b;
  }
};

// Getter and setter
const product = {
  _price: 0,
  get price() {
    return `$${this._price}`;
  },
  set price(value) {
    if (value < 0) throw new Error("Price cannot be negative");
    this._price = value;
  }
};
```

### Prototypes and Inheritance
```javascript
// Constructor function with prototype
function Animal(name) {
  this.name = name;
}

Animal.prototype.makeSound = function() {
  return "Some sound";
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override method
Dog.prototype.makeSound = function() {
  return "Woof!";
};

// Add new method
Dog.prototype.fetch = function() {
  return `${this.name} is fetching`;
};

const max = new Dog("Max", "Labrador");
console.log(max.makeSound()); // Woof!
```

### Class Inheritance (ES6)
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  makeSound() {
    return "Some sound";
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  makeSound() {
    return "Woof!";
  }
  
  fetch() {
    return `${this.name} is fetching`;
  }
}

const max = new Dog("Max", "Labrador");
```

### Object Methods
```javascript
// Object.keys()
Object.keys(person); // ["name", "age"]

// Object.values()
Object.values(person); // ["John", 30]

// Object.entries()
Object.entries(person); // [["name", "John"], ["age", 30]]

// Object.assign()
const merged = Object.assign({}, obj1, obj2);

// Object.freeze() - prevents modifications
const frozen = Object.freeze({ name: "Frozen" });

// Object.seal() - prevents adding/removing properties
const sealed = Object.seal({ name: "Sealed" });

// Object.is() - similar to === but handles NaN and -0/+0 differently
Object.is(NaN, NaN); // true (unlike NaN === NaN)
```
<!-- ADSENSE -->
## Arrays and Array Methods

### Creating Arrays
```javascript
// Array literal
const fruits = ["apple", "banana", "orange"];

// Array constructor
const numbers = new Array(1, 2, 3);

// Array.of()
const items = Array.of(1, 2, 3);

// Array.from()
const chars = Array.from("hello"); // ["h", "e", "l", "l", "o"]
```

### Array Methods (Modifying the Original Array)
```javascript
// push() - adds elements to the end
fruits.push("grape"); // returns new length

// pop() - removes the last element
fruits.pop(); // returns removed element

// unshift() - adds elements to the beginning
fruits.unshift("pear"); // returns new length

// shift() - removes the first element
fruits.shift(); // returns removed element

// splice() - changes array by removing/replacing elements
fruits.splice(1, 1, "kiwi"); // returns removed elements

// sort() - sorts elements in place
fruits.sort(); // returns sorted array

// reverse() - reverses order of elements
fruits.reverse(); // returns reversed array

// fill() - fills array with static value
new Array(3).fill("a"); // ["a", "a", "a"]
```

### Array Methods (Creating New Arrays)
```javascript
// concat() - merges arrays
const combined = fruits.concat(["grape", "kiwi"]);

// slice() - extracts a section
const subset = fruits.slice(1, 3); // elements at index 1 and 2

// map() - creates new array with results of callback
const doubled = [1, 2, 3].map(x => x * 2); // [2, 4, 6]

// filter() - creates new array with elements passing test
const evens = [1, 2, 3, 4].filter(x => x % 2 === 0); // [2, 4]

// reduce() - applies function to reduce to single value
const sum = [1, 2, 3].reduce((acc, cur) => acc + cur, 0); // 6

// flatMap() - map followed by flat
const nested = [[1], [2, 3]].flatMap(x => x); // [1, 2, 3]
```

### Array Methods (Finding Elements)
```javascript
// indexOf() - finds first index of element
fruits.indexOf("banana"); // index or -1 if not found

// lastIndexOf() - finds last index of element
fruits.lastIndexOf("apple");

// includes() - checks if array includes element
fruits.includes("banana"); // true or false

// find() - returns first element passing test
[1, 2, 3].find(x => x > 1); // 2

// findIndex() - returns index of first element passing test
[1, 2, 3].findIndex(x => x > 1); // 1

// findLast() - returns last element passing test (ES2023)
[1, 2, 3].findLast(x => x > 1); // 3

// findLastIndex() - returns index of last element passing test (ES2023)
[1, 2, 3].findLastIndex(x => x > 1); // 2
```

### Array Methods (Testing Elements)
```javascript
// every() - tests if all elements pass test
[2, 4, 6].every(x => x % 2 === 0); // true

// some() - tests if any element passes test
[1, 2, 3].some(x => x % 2 === 0); // true
```

### Array Methods (Others)
```javascript
// join() - joins elements into string
fruits.join(", "); // "apple, banana, orange"

// flat() - creates new array with sub-arrays concatenated
[1, [2, [3]]].flat(2); // [1, 2, 3]

// forEach() - executes function for each element
fruits.forEach(fruit => console.log(fruit));

// Array.isArray() - checks if value is array
Array.isArray(fruits); // true
```
<!-- ADSENSE -->
## ES6+ Features

### let and const
```javascript
// Block-scoped variables
let x = 10;
const y = 20; // Cannot be reassigned
```

### Template Literals
```javascript
const name = "John";
const greeting = `Hello, ${name}!`; // String interpolation

// Multi-line strings
const multiLine = `Line 1
Line 2
Line 3`;

// Tagged templates
function tag(strings, ...values) {
  return strings.reduce((result, str, i) => 
    `${result}${str}${values[i] || ''}`, '');
}
const result = tag`Hello, ${name}!`;
```

### Destructuring
```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
const { name, age, address: { city } = {} } = person;

// Default values
const [a = 1, b = 2] = [5];

// Parameter destructuring
function printPerson({ name, age }) {
  console.log(`${name} is ${age} years old`);
}
```

### Spread Operator
```javascript
// Array spread
const newArray = [...oldArray, newItem];

// Object spread
const newObj = { ...oldObj, newProp: value };

// Function arguments
const numbers = [1, 2, 3];
console.log(Math.max(...numbers));
```

### Rest Parameters
```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
```

### Arrow Functions
```javascript
// Basic syntax
const add = (a, b) => a + b;

// Multi-line
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// No parameters
const greet = () => "Hello!";

// Single parameter (parentheses optional)
const double = num => num * 2;

// Returning an object
const createPerson = (name, age) => ({ name, age });
```

### Default Parameters
```javascript
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}
```

### Classes
```javascript
class Person {
  // Private field (prefixed with #)
  #privateField = "private";
  
  // Class field
  species = "human";
  
  // Static field
  static count = 0;
  
  constructor(name, age) {
    this.name = name;
    this.age = age;
    Person.count++;
  }
  
  // Method
  greet() {
    return `Hello, I'm ${this.name}`;
  }
  
  // Getter
  get info() {
    return `${this.name}, ${this.age}`;
  }
  
  // Setter
  set info(value) {
    [this.name, this.ageStr] = value.split(",");
    this.age = parseInt(this.ageStr);
  }
  
  // Private method
  #privateMethod() {
    return "private";
  }
  
  // Static method
  static createAnonymous() {
    return new Person("Anonymous", 0);
  }
}

// Inheritance
class Employee extends Person {
  constructor(name, age, position) {
    super(name, age);
    this.position = position;
  }
  
  // Override method
  greet() {
    return `${super.greet()}, I work as a ${this.position}`;
  }
}
```

### Enhanced Object Literals
```javascript
const name = "John";
const age = 30;

// Property shorthand
const person = { name, age };

// Method shorthand
const calculator = {
  add(a, b) {
    return a + b;
  }
};

// Computed property names
const propName = "occupation";
const employee = {
  [propName]: "Developer"
};
```

### Modules
```javascript
// Named exports
export const PI = 3.14159;
export function square(x) {
  return x * x;
}

// Default export
export default class Calculator {
  // ...
}

// Import
import Calculator, { PI, square } from './math.js';
import * as math from './math.js';
```

### Promises
```javascript
// Creating a promise
const promise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;
  if (success) {
    resolve("Operation successful");
  } else {
    reject(new Error("Operation failed"));
  }
});

// Consuming a promise
promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));

// Promise.all - waits for all promises to resolve
Promise.all([promise1, promise2])
  .then(([result1, result2]) => console.log(result1, result2))
  .catch(error => console.error(error));

// Promise.race - resolves/rejects when first promise resolves/rejects
Promise.race([promise1, promise2])
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Promise.allSettled - waits for all promises to settle
Promise.allSettled([promise1, promise2])
  .then(results => console.log(results));

// Promise.any - resolves when first promise resolves
Promise.any([promise1, promise2])
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### Iterators and Generators
```javascript
// Iterator
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    let current = this.from;
    return {
      next: () => {
        if (current <= this.to) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Generator
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const generator = generateSequence(1, 5);
for (const num of generator) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Generator with yield*
function* combineSequences() {
  yield* generateSequence(1, 3);
  yield* generateSequence(4, 5);
}
```

### Map and Set
```javascript
// Map
const map = new Map();
map.set("key1", "value1");
map.set("key2", "value2");

map.get("key1"); // "value1"
map.has("key2"); // true
map.delete("key1");
map.size; // 1
map.clear();

// Map iteration
for (const [key, value] of map) {
  console.log(key, value);
}

// Set
const set = new Set([1, 2, 3, 3, 3]); // {1, 2, 3}
set.add(4);
set.has(2); // true
set.delete(1);
set.size; // 3
set.clear();

// Set iteration
for (const value of set) {
  console.log(value);
}
```

### WeakMap and WeakSet
```javascript
// WeakMap - keys must be objects, doesn't prevent garbage collection
const weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, "value");
obj = null; // The entry in weakMap will be removed automatically

// WeakSet - values must be objects, doesn't prevent garbage collection
const weakSet = new WeakSet();
let obj2 = {};
weakSet.add(obj2);
obj2 = null; // The object in weakSet will be removed automatically
```

### Symbol
```javascript
// Creating symbols
const id = Symbol("id");
const id2 = Symbol("id"); // Different from id
console.log(id === id2); // false

// Well-known symbols
const iterable = {
  [Symbol.iterator]() {
    // implementation
  }
};

// Symbol.for - global symbol registry
const globalSym = Symbol.for("globalId");
const sameGlobalSym = Symbol.for("globalId");
console.log(globalSym === sameGlobalSym); // true

// Symbol.keyFor - retrieves key for global symbols
console.log(Symbol.keyFor(globalSym)); // "globalId"
```

### Optional Chaining
```javascript
const user = { 
  address: { 
    street: "Main St" 
  } 
};

// Without optional chaining
const zipCode = user && user.address && user.address.zipCode; // undefined

// With optional chaining
const zipCode2 = user?.address?.zipCode; // undefined, no error
```

### Nullish Coalescing
```javascript
// || returns first truthy value
const value1 = 0 || "default"; // "default" (0 is falsy)

// ?? returns first defined value
const value2 = 0 ?? "default"; // 0
const value3 = null ?? "default"; // "default"
const value4 = undefined ?? "default"; // "default"
```

### Logical Assignment Operators
```javascript
// OR assignment
let x = null;
x ||= 5; // x = x || 5

// AND assignment
let y = 10;
y &&= 5; // y = y && 5

// Nullish coalescing assignment
let z = undefined;
z ??= 5; // z = z ?? 5
```
<!-- ADSENSE -->
## Asynchronous JavaScript

### Callbacks
```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "John" };
    callback(null, data); // Error-first callback pattern
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
});
```

### Promises
```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ name: "John" });
      } else {
        reject(new Error("Failed to fetch data"));
      }
    }, 1000);
  });
}

fetchData()
  .then(data => {
    console.log(data);
    return processData(data);
  })
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log("Operation completed");
  });

// Promise combinators
Promise.all([fetchUsers(), fetchPosts()])
  .then(([users, posts]) => {
    // Both promises resolved
  });

Promise.race([fetchWithTimeout(), fetchWithFallback()])
  .then(result => {
    // First promise that resolves
  });

Promise.allSettled([fetchUsers(), fetchPosts()])
  .then(results => {
    // Results contains status and value/reason for each promise
  });

Promise.any([fetchFromAPI1(), fetchFromAPI2()])
  .then(result => {
    // First promise that fulfills
  })
  .catch(error => {
    // All promises rejected
    console.log(error.errors); // Array of errors
  });
```

### Async/Await
```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Re-throw to allow calling code to handle it
  }
}

// Calling async function
(async () => {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();

// Parallel execution with await
async function fetchMultiple() {
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts()
  ]);
  return { users, posts };
}

// Error handling
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Retrying (${i + 1}/${retries})...`);
    }
  }
}
```

### setTimeout and setInterval
```javascript
// Delayed execution
const timeoutId = setTimeout(() => {
  console.log("Executed after 1 second");
}, 1000);

// Cancel timeout
clearTimeout(timeoutId);

// Repeated execution
const intervalId = setInterval(() => {
  console.log("Executed every 1 second");
}, 1000);

// Cancel interval
clearInterval(intervalId);

// Zero delay setTimeout for async tasks
setTimeout(() => {
  console.log("Executed after current execution context");
}, 0);
```

### Event Loop
```javascript
console.log("Start"); // 1. This runs first (Call Stack)

setTimeout(() => {
  console.log("Timeout"); // 4. This runs fourth (from Callback Queue)
}, 0);

Promise.resolve()
  .then(() => {
    console.log("Promise"); // 3. This runs third (from Microtask Queue)
  });

console.log("End"); // 2. This runs second (Call Stack)

// Output: Start, End, Promise, Timeout
```
<!-- ADSENSE -->
## DOM Manipulation

### Selecting Elements
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

### Try-Catch-Finally
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

### Singleton Pattern
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

### Memory Management
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

### Unit Testing with Jest
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

### Closures
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
```javascript
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
// Output: 1, 4, 3, 2
```

### Prototypal Inheritance
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

<!-- --- -->
<!-- ADSENSE -->
## SEO Keywords

JavaScript, ECMAScript, ES6, ES2015, front-end development, web development, programming language, JavaScript fundamentals, JavaScript interview questions, closures, promises, async/await, DOM manipulation, event handling, object-oriented programming, functional programming, JavaScript design patterns, JavaScript performance optimization, JavaScript frameworks, React, Vue, Angular, Node.js, JavaScript runtime, event loop, hoisting, scope, context, this keyword, prototype inheritance, JavaScript testing, unit testing, TDD, web APIs, JSON, AJAX, fetch API, JavaScript ES modules, npm, webpack, babel, JavaScript best practices, JavaScript clean code, JavaScript debugging, JavaScript memory management, JavaScript garbage collection, JavaScript algorithms, JavaScript data structures, JavaScript error handling, JavaScript iterators, JavaScript generators, modern JavaScript, JavaScript coding interview, JavaScript cheatsheet.

<!-- --- -->
<!-- ADSENSE -->
## Performance Optimization Techniques

### Critical Rendering Path
```javascript
// Defer non-critical JavaScript
<script src="non-critical.js" defer></script>

// Async loading when order doesn't matter
<script src="analytics.js" async></script>

// Preload critical resources
<link rel="preload" href="critical.css" as="style">
```

### Code Splitting
```javascript
// Dynamic imports (ES2020)
button.addEventListener('click', async () => {
  const module = await import('./feature.js');
  module.default();
});
```

### Tree Shaking
```javascript
// Only imports what's used (with bundlers like webpack)
import { useState, useEffect } from 'react'; // Only imports these specific functions
```

### Virtualization
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

### Content Security Policy
```javascript
// Set CSP header
// Content-Security-Policy: default-src 'self'; script-src 'self' trusted-scripts.com

// Or in HTML
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

### Preventing XSS
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

### Semantic HTML
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

### Numeric Separators (ES2021)
```javascript
// Make large numbers more readable
const billion = 1_000_000_000;
const nibble = 0b1010_0001;
const bytes = 0xFF_FF_FF_FF;
```

### Logical Assignment Operators (ES2021)
```javascript
// OR assignment
x ||= y; // x = x || y

// AND assignment
x &&= y; // x = x && y

// Nullish coalescing assignment
x ??= y; // x = x ?? y
```

### String.prototype.replaceAll (ES2021)
```javascript
// Replace all occurrences without using regex global flag
const sentence = "JavaScript is awesome. JavaScript is fun.";
const newSentence = sentence.replaceAll("JavaScript", "TypeScript");
// "TypeScript is awesome. TypeScript is fun."
```

### Promise.any (ES2021)
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
```javascript
// Safer replacement for Object.prototype.hasOwnProperty
const object = { prop: 'exists' };
Object.hasOwn(object, 'prop'); // true
Object.hasOwn(object, 'toString'); // false
Object.hasOwn(null, 'anything'); // Doesn't throw, returns false
```

### Array.prototype.at (ES2022)
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
```javascript
// In modules, await can be used outside of async functions
const response = await fetch('https://api.example.com/data');
const data = await response.json();
export { data };
```

### Temporal (Proposal)
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

### Basic Patterns
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
```javascript
/pattern/g // Global - match all occurrences
/pattern/i // Case-insensitive
/pattern/m // Multiline - ^ and $ match start/end of lines
/pattern/s // DotAll - . matches newlines too (ES2018)
/pattern/u // Unicode
/pattern/y // Sticky - match at lastIndex position only
```

### Advanced Patterns
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

### Console Methods
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
```javascript
function problematicFunction() {
  let x = 5;
  debugger; // Execution pauses here when DevTools is open
  x = x + calculateSomething();
  return x;
}
```

### Performance Measurement
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

### CommonJS Modules
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
## Final Words

This comprehensive JavaScript cheatsheet covers the essential concepts, syntax, and patterns that you might encounter in technical interviews. Remember to not only memorize the syntax but also understand the underlying principles. JavaScript is a dynamically evolving language, so staying up-to-date with the latest features and best practices is crucial for success in interviews and real-world development.

Practice implementing these concepts in real code, work on small projects, and solve algorithmic challenges to strengthen your JavaScript skills. During interviews, focus on writing clean, readable, and maintainable code while explaining your thought process clearly.

Good luck with your JavaScript interview preparation!
<!-- ADSENSE -->