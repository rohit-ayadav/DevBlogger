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
- [Part 2](javascript-cheatsheet-part2)

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