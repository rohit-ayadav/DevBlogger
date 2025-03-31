# C++ Programming Language Cheatsheet

## Table of Contents

- [Introduction to C++](#introduction-to-c)
- [Basic Program Structure](#basic-program-structure)
- [Data Types](#data-types)
- [Variables and Constants](#variables-and-constants)
- [Operators](#operators)
- [Control Flow](#control-flow)
- [Functions](#functions)
- [Arrays and Pointers](#arrays-and-pointers)
- [Strings](#strings)
- [Input/Output Operations](#inputoutput-operations)

_For advance concepts, see [C++ Programming Language Cheatsheet - Part 2: Fundamentals](/cpp-language-cheatsheet-part2)_

## Introduction to C++

C++ is a powerful general-purpose programming language that extends the C language with object-oriented features. Created by Bjarne Stroustrup in 1979, C++ supports multiple programming paradigms:

- Procedural programming (like C)
- Object-oriented programming
- Generic programming
- Functional programming (especially in modern C++)

C++ combines low-level memory manipulation capabilities with high-level abstractions, making it suitable for system programming, game development, embedded systems, and performance-critical applications.

<!-- ADSENSE -->

## Basic Program Structure

```cpp
// Include libraries
#include <iostream>  // Standard input/output stream
#include <string>    // String library

// Namespace declaration (avoid prefix for std members)
using namespace std;  // Not always recommended in larger projects

// Function prototype (optional)
void greet(const string& name);

// Main function - program entry point
int main() {
    // Variable declaration and initialization
    string userName = "C++ Learner";

    // Function call
    greet(userName);

    // Return statement
    return 0;  // Zero indicates successful execution
}

// Function definition
void greet(const string& name) {
    cout << "Hello, " << name << "!" << endl;
}
```

### Comments

```cpp
// Single-line comment

/*
   Multi-line
   comment
*/

/// Documentation comment (often used with tools like Doxygen)
/**
 * Documentation comment block
 * @param name Description of parameter
 * @return Description of return value
 */
```

<!-- ADSENSE -->

## Data Types

### Basic Types

| Type       | Description                     | Typical Size     | Example                                |
| ---------- | ------------------------------- | ---------------- | -------------------------------------- |
| `bool`     | Boolean (true/false)            | 1 byte           | `bool isActive = true;`                |
| `char`     | Character/small integer         | 1 byte           | `char grade = 'A';`                    |
| `int`      | Integer                         | 4 bytes          | `int count = 42;`                      |
| `float`    | Single-precision floating point | 4 bytes          | `float price = 10.99f;`                |
| `double`   | Double-precision floating point | 8 bytes          | `double pi = 3.14159265359;`           |
| `void`     | No type/empty                   | -                | Used in functions with no return value |
| `wchar_t`  | Wide character                  | 2 or 4 bytes     | `wchar_t wideChar = L'Ω';`             |
| `char16_t` | UTF-16 character (C++11)        | At least 2 bytes | `char16_t c = u'Ω';`                   |
| `char32_t` | UTF-32 character (C++11)        | At least 4 bytes | `char32_t c = U'Ω';`                   |

### Type Modifiers

| Modifier    | Description                                               | Example                                         |
| ----------- | --------------------------------------------------------- | ----------------------------------------------- |
| `signed`    | Can represent both positive and negative values (default) | `signed int count = -10;`                       |
| `unsigned`  | Can only represent non-negative values                    | `unsigned int count = 10;`                      |
| `short`     | Reduced size integer                                      | `short int num = 100;`                          |
| `long`      | Extended size integer                                     | `long int population = 8000000000L;`            |
| `long long` | Even larger integer (C++11)                               | `long long int bigNum = 9223372036854775807LL;` |

### Fixed-Width Integer Types (C++11)

```cpp
#include <cstdint>

int8_t a = 127;             // 8-bit signed integer
uint8_t b = 255;            // 8-bit unsigned integer
int16_t c = 32767;          // 16-bit signed integer
uint16_t d = 65535;         // 16-bit unsigned integer
int32_t e = 2147483647;     // 32-bit signed integer
uint32_t f = 4294967295;    // 32-bit unsigned integer
int64_t g = 9223372036854775807;  // 64-bit signed integer
uint64_t h = 18446744073709551615U;  // 64-bit unsigned integer
```

### Type Aliases

```cpp
// Traditional typedef
typedef unsigned long ulong;
ulong counter = 0;

// Modern type alias (C++11)
using Integer = int;
using IntVector = std::vector<int>;
```

### Type Conversion

```cpp
// Implicit conversion
int i = 42;
double d = i;  // Automatically converts int to double

// C-style explicit cast (not recommended in C++)
float f = 3.14f;
int i1 = (int)f;  // Truncates to 3

// C++ style casts (preferred)
double value = 3.14159;
int i2 = static_cast<int>(value);            // Most common cast, compile-time checked
const int* ptr = &i2;
int* mutable_ptr = const_cast<int*>(ptr);    // Removes const qualifier
struct Base { virtual ~Base() {} };
struct Derived : Base { };
Base* base_ptr = new Derived();
Derived* derived_ptr = dynamic_cast<Derived*>(base_ptr);  // Safe downcasting, runtime checked
int addr = reinterpret_cast<int>(base_ptr);   // Low-level reinterpretation, use with caution
```

<!-- ADSENSE -->

## Variables and Constants

### Variable Declaration and Initialization

```cpp
// Declaration
int count;

// Initialization
int value = 10;          // C-style initialization
int value2(10);          // Constructor initialization
int value3{10};          // Uniform initialization (C++11, preferred)

// Multiple declarations
int x = 1, y = 2, z = 3;

// Auto type deduction (C++11)
auto i = 42;             // int
auto d = 3.14;           // double
auto s = "Hello";        // const char*
auto v = std::vector<int>{1, 2, 3};  // std::vector<int>

// Decltype (C++11)
int a = 10;
decltype(a) b = 20;      // b is an int
```

### Constants

```cpp
// Constant variables (cannot be changed after initialization)
const int MAX_VALUE = 100;
const double PI = 3.14159;

// Constexpr (compile-time constants, C++11)
constexpr int ARRAY_SIZE = 10;
constexpr double LIGHT_SPEED = 299792458.0;

// Enumeration
enum Color { RED, GREEN, BLUE };  // RED=0, GREEN=1, BLUE=2
Color myColor = RED;

// Scoped enumeration (C++11)
enum class Fruit { APPLE, BANANA, ORANGE };
Fruit myFruit = Fruit::APPLE;  // Must use scope resolution
```

### Storage Classes

| Class          | Description                                                                        | Lifetime         | Scope             |
| -------------- | ---------------------------------------------------------------------------------- | ---------------- | ----------------- |
| `auto`         | Default for local variables (keyword repurposed in C++11)                          | Function block   | Function block    |
| `static`       | Preserves value between function calls, single instance for all objects of a class | Program lifetime | Function or class |
| `extern`       | References variable defined in another file                                        | Program lifetime | Global            |
| `thread_local` | Each thread has its own copy (C++11)                                               | Thread lifetime  | Thread            |
| `mutable`      | Can be modified even in const objects                                              | Object lifetime  | Class             |

<!-- ADSENSE -->

## Operators

### Arithmetic Operators

| Operator | Description         | Example                         |
| -------- | ------------------- | ------------------------------- |
| `+`      | Addition            | `a + b`                         |
| `-`      | Subtraction         | `a - b`                         |
| `*`      | Multiplication      | `a * b`                         |
| `/`      | Division            | `a / b`                         |
| `%`      | Modulus (remainder) | `a % b`                         |
| `++`     | Increment           | `a++` (postfix), `++a` (prefix) |
| `--`     | Decrement           | `a--` (postfix), `--a` (prefix) |

### Comparison Operators

| Operator | Description                  | Example   |
| -------- | ---------------------------- | --------- |
| `==`     | Equal to                     | `a == b`  |
| `!=`     | Not equal to                 | `a != b`  |
| `>`      | Greater than                 | `a > b`   |
| `<`      | Less than                    | `a < b`   |
| `>=`     | Greater than or equal to     | `a >= b`  |
| `<=`     | Less than or equal to        | `a <= b`  |
| `<=>`    | Three-way comparison (C++20) | `a <=> b` |

### Logical Operators

| Operator | Description | Example    |
| -------- | ----------- | ---------- |
| `&&`     | Logical AND | `a && b`   |
| `\|\|`   | Logical OR  | `a \|\| b` |
| `!`      | Logical NOT | `!a`       |

### Bitwise Operators

| Operator | Description        | Example  |
| -------- | ------------------ | -------- |
| `&`      | Bitwise AND        | `a & b`  |
| `\|`     | Bitwise OR         | `a \| b` |
| `^`      | Bitwise XOR        | `a ^ b`  |
| `~`      | Bitwise complement | `~a`     |
| `<<`     | Left shift         | `a << n` |
| `>>`     | Right shift        | `a >> n` |

### Assignment Operators

| Operator | Description            | Equivalent   |
| -------- | ---------------------- | ------------ |
| `=`      | Simple assignment      | `a = b`      |
| `+=`     | Add and assign         | `a = a + b`  |
| `-=`     | Subtract and assign    | `a = a - b`  |
| `*=`     | Multiply and assign    | `a = a * b`  |
| `/=`     | Divide and assign      | `a = a / b`  |
| `%=`     | Modulus and assign     | `a = a % b`  |
| `&=`     | Bitwise AND and assign | `a = a & b`  |
| `\|=`    | Bitwise OR and assign  | `a = a \| b` |
| `^=`     | Bitwise XOR and assign | `a = a ^ b`  |
| `<<=`    | Left shift and assign  | `a = a << b` |
| `>>=`    | Right shift and assign | `a = a >> b` |

### Other Operators

| Operator   | Description                   | Example                      |
| ---------- | ----------------------------- | ---------------------------- |
| `?:`       | Ternary conditional           | `condition ? expr1 : expr2`  |
| `,`        | Comma (sequence evaluation)   | `expr1, expr2`               |
| `sizeof`   | Size of object or type        | `sizeof(int)`, `sizeof var`  |
| `alignof`  | Alignment requirement (C++11) | `alignof(int)`               |
| `typeid`   | Type information              | `typeid(var).name()`         |
| `new`      | Dynamic memory allocation     | `int* p = new int(10)`       |
| `delete`   | Dynamic memory deallocation   | `delete p`                   |
| `new[]`    | Allocate array                | `int* arr = new int[5]`      |
| `delete[]` | Deallocate array              | `delete[] arr`               |
| `::`       | Scope resolution              | `std::cout`, `Class::member` |
| `.`        | Member access (object)        | `obj.member`                 |
| `->`       | Member access (pointer)       | `ptr->member`                |
| `.*`       | Pointer to member (object)    | `obj.*memberPtr`             |
| `->*`      | Pointer to member (pointer)   | `ptr->*memberPtr`            |

<!-- ADSENSE -->

## Control Flow

### Conditional Statements

```cpp
// If statement
if (condition) {
    // Code executed if condition is true
}

// If-else statement
if (condition) {
    // Code executed if condition is true
} else {
    // Code executed if condition is false
}

// If-else if-else chain
if (condition1) {
    // Code executed if condition1 is true
} else if (condition2) {
    // Code executed if condition1 is false and condition2 is true
} else {
    // Code executed if all conditions are false
}

// Switch statement
switch (expression) {
    case value1:
        // Code executed if expression equals value1
        break;
    case value2:
        // Code executed if expression equals value2
        break;
    default:
        // Code executed if no case matches
        break;
}

// Ternary conditional operator
result = (condition) ? valueIfTrue : valueIfFalse;

// C++17 initialization in if statements
if (int value = getValue(); value > 0) {
    // value is in scope here
} else {
    // value is still in scope here
}

// C++17 constexpr if (compile-time conditional)
if constexpr (std::is_integral<T>::value) {
    // This branch is compiled only when T is an integral type
} else {
    // This branch is compiled only when T is not an integral type
}
```

### Loops

```cpp
// While loop
while (condition) {
    // Code executed while condition is true
}

// Do-while loop (executes at least once)
do {
    // Code executed at least once and then while condition is true
} while (condition);

// For loop
for (initialization; condition; update) {
    // Code executed while condition is true
}

// Range-based for loop (C++11)
for (const auto& element : container) {
    // Process element
}

// Infinite loop
for (;;) {
    // Code executed indefinitely
    if (exitCondition) break;
}
```

### Jump Statements

```cpp
break;      // Exit loop or switch
continue;   // Skip to next iteration
return;     // Exit function (with optional value)
goto label; // Jump to label (use sparingly)

// Example with label
someLabel:
    // Code
    if (condition) goto someLabel;
```

<!-- ADSENSE -->

## Functions

### Function Declaration and Definition

```cpp
// Function prototype (declaration)
returnType functionName(parameterType1 parameter1, parameterType2 parameter2);

// Function definition
returnType functionName(parameterType1 parameter1, parameterType2 parameter2) {
    // Function body
    return value;  // If non-void return type
}

// Example
int add(int a, int b) {
    return a + b;
}
```

### Default Parameters

```cpp
void printMessage(std::string message, bool newLine = true) {
    std::cout << message;
    if (newLine) std::cout << std::endl;
}

// Call with or without the optional parameter
printMessage("Hello");          // Prints with newline
printMessage("Hello", false);   // Prints without newline
```

### Function Overloading

```cpp
// Multiple functions with the same name but different parameters
void display(int value) {
    std::cout << "Integer: " << value << std::endl;
}

void display(double value) {
    std::cout << "Double: " << value << std::endl;
}

void display(std::string value) {
    std::cout << "String: " << value << std::endl;
}

// Compiler selects the appropriate function based on arguments
display(5);        // Calls display(int)
display(3.14);     // Calls display(double)
display("Hello");  // Calls display(std::string)
```

### Inline Functions

```cpp
// Hint to compiler to replace function call with function body
inline int square(int x) {
    return x * x;
}
```

### Lambda Expressions (C++11)

```cpp
// Basic lambda
auto add = [](int a, int b) { return a + b; };
int sum = add(2, 3);  // sum = 5

// Lambda with capture clause
int multiplier = 3;
auto multiply = [multiplier](int value) { return value * multiplier; };
int result = multiply(5);  // result = 15

// Capturing by reference
int counter = 0;
auto increment = [&counter]() { counter++; };
increment();  // counter = 1

// Capturing all local variables
auto captureAll = [=]() { return multiplier * 2; };  // By value
auto captureAllRef = [&]() { counter++; };          // By reference

// Lambda with explicit return type
auto divide = [](double a, double b) -> double { return a / b; };

// Generic lambda (C++14)
auto genericAdd = [](auto a, auto b) { return a + b; };
```

### Function Pointers

```cpp
// Function pointer declaration
returnType (*pointerName)(parameterTypes);

// Example
int (*funcPtr)(int, int);
funcPtr = add;  // Points to add function
int result = funcPtr(3, 4);  // Calls add(3, 4)

// Using std::function (C++11, more flexible)
#include <functional>
std::function<int(int, int)> func = add;
int result2 = func(5, 6);
```

### Parameter Passing

```cpp
// Pass by value (creates a copy)
void incrementByValue(int x) {
    x++;  // Only modifies the local copy
}

// Pass by reference
void incrementByReference(int& x) {
    x++;  // Modifies the original value
}

// Pass by const reference (cannot modify)
void printByConstRef(const std::string& str) {
    std::cout << str;  // Cannot modify str
}

// Pass by pointer
void incrementByPointer(int* x) {
    (*x)++;  // Modifies the pointed value
}

// Pass by rvalue reference (C++11, for move semantics)
void processVector(std::vector<int>&& vec) {
    // Takes ownership of the resources
}
```

### Variadic Templates (C++11)

```cpp
// Function that accepts any number of arguments
template<typename... Args>
void printAll(Args... args) {
    (std::cout << ... << args) << std::endl;  // C++17 fold expression
}

// Usage
printAll(1, 2.5, "Hello", 'c');  // Prints: 12.5Helloc
```

<!-- ADSENSE -->

## Arrays and Pointers

### Arrays

```cpp
// Declaration and initialization
int numbers[5];            // Uninitialized array of 5 integers
int values[3] = {1, 2, 3}; // Initialized array
int scores[] = {75, 80, 95, 88}; // Size determined by initializer

// Multi-dimensional arrays
int matrix[3][4];  // 3 rows, 4 columns
int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};

// Accessing elements
int first = values[0];  // First element (index 0)
values[1] = 10;         // Modify second element
```

### Modern Array Alternatives

```cpp
// std::array (C++11, fixed-size container)
#include <array>
std::array<int, 3> arr = {1, 2, 3};
int second = arr[1];
int size = arr.size();

// std::vector (dynamic-size container)
#include <vector>
std::vector<int> vec = {1, 2, 3, 4, 5};
vec.push_back(6);  // Add element
int vecSize = vec.size();
```

### Pointers

```cpp
// Declaration and initialization
int* ptr;                // Declaration (uninitialized)
int value = 42;
int* ptr2 = &value;      // Points to value's address
int* ptr3 = nullptr;     // C++11 null pointer (preferred over NULL)

// Dereferencing (accessing the value)
int x = *ptr2;           // x = 42
*ptr2 = 100;             // Changes value to 100

// Pointer arithmetic
int arr[5] = {10, 20, 30, 40, 50};
int* p = arr;            // Points to first element
int second = *(p + 1);   // Access second element (20)
int third = p[2];        // Array-like syntax (30)
p++;                     // Points to second element

// Pointers to functions
int (*funcPtr)(int, int) = add;
int result = funcPtr(3, 4);  // result = 7
```

### Smart Pointers (C++11)

```cpp
#include <memory>

// Unique pointer (exclusive ownership)
std::unique_ptr<int> uptr = std::make_unique<int>(42);  // C++14
int value1 = *uptr;  // Dereference
// std::unique_ptr<int> uptr2 = uptr;  // ERROR: Cannot copy
std::unique_ptr<int> uptr3 = std::move(uptr);  // Transfer ownership

// Shared pointer (shared ownership, reference counted)
std::shared_ptr<int> sptr1 = std::make_shared<int>(100);
std::shared_ptr<int> sptr2 = sptr1;  // Both point to same object
int value2 = *sptr1;
int count = sptr1.use_count();  // Reference count (2)

// Weak pointer (non-owning reference to shared object)
std::weak_ptr<int> wptr = sptr1;
if (auto temp = wptr.lock()) {  // Get shared_ptr if still alive
    std::cout << *temp << std::endl;
}
```

### Dynamic Arrays

```cpp
// C-style dynamic array (avoid in modern C++)
int* dynamicArray = new int[5];
dynamicArray[0] = 10;
delete[] dynamicArray;  // Must use delete[] for arrays

// Modern approach: std::vector
std::vector<int> vec(5, 0);  // 5 elements initialized to 0
vec[0] = 10;
// No explicit delete needed
```

<!-- ADSENSE -->

## Strings

### C-style Strings

```cpp
// Null-terminated character arrays
char str1[10] = "Hello";
char str2[] = "World";
char str3[6] = {'H', 'e', 'l', 'l', 'o', '\0'};

// String functions (include <cstring>)
size_t len = strlen(str1);
char dest[20];
strcpy(dest, str1);
strcat(dest, " ");
strcat(dest, str2);
int cmp = strcmp(str1, str2);
```

### std::string

```cpp
#include <string>

// Creation and initialization
std::string s1 = "Hello";
std::string s2("World");
std::string s3(5, 'a');    // "aaaaa"

// String operations
std::string combined = s1 + " " + s2;  // Concatenation
int length = s1.length();              // or s1.size()
char first = s1[0];                    // Access character
s1[1] = 'E';                           // Modify character
std::string sub = s1.substr(1, 3);     // Substring: "Ell"

// Finding and replacing
size_t pos = s1.find('l');             // First 'l'
size_t rpos = s1.rfind('l');           // Last 'l'
s1.replace(1, 2, "oo");                // Replace "El" with "oo"

// Comparing
if (s1 == s2) { /* equal */ }
if (s1 < s2) { /* less than */ }
int result = s1.compare(s2);

// Converting
std::string numStr = "42";
int num = std::stoi(numStr);           // String to int
std::string strFromNum = std::to_string(100);  // Int to string
```

### std::string_view (C++17)

```cpp
#include <string_view>

// Non-owning reference to a string (more efficient than std::string for read-only operations)
std::string_view sv = "Hello World";
std::string_view subsv = sv.substr(6, 5);  // "World" (no copying)
```

<!-- ADSENSE -->

## Input/Output Operations

### Console I/O

```cpp
#include <iostream>

// Standard output
std::cout << "Hello" << " " << "World!" << std::endl;

// Standard input
int age;
std::cout << "Enter your age: ";
std::cin >> age;

// Error output
std::cerr << "Error message" << std::endl;

// Input with spaces
std::string fullName;
std::cout << "Enter your full name: ";
std::cin.ignore();  // Clear newline from previous input
std::getline(std::cin, fullName);

// Formatted output
#include <iomanip>
std::cout << std::fixed << std::setprecision(2) << 3.14159;  // 3.14
std::cout << std::setw(10) << std::right << "Hello";  // "     Hello"
```

### File I/O

```cpp
#include <fstream>

// Writing to a file
std::ofstream outFile("output.txt");
if (outFile.is_open()) {
    outFile << "Hello, File I/O!" << std::endl;
    outFile.close();
}

// Reading from a file
std::ifstream inFile("input.txt");
if (inFile.is_open()) {
    std::string line;
    while (std::getline(inFile, line)) {
        std::cout << line << std::endl;
    }
    inFile.close();
}

// Binary file I/O
std::ofstream binFile("data.bin", std::ios::binary);
int data[3] = {1, 2, 3};
binFile.write(reinterpret_cast<char*>(data), 3 * sizeof(int));
binFile.close();

std::ifstream binIn("data.bin", std::ios::binary);
int readData[3];
binIn.read(reinterpret_cast<char*>(readData), 3 * sizeof(int));
binIn.close();
```

### String Streams

```cpp
#include <sstream>

// String output stream
std::ostringstream oss;
oss << "Age: " << 25 << ", Score: " << 95.5;
std::string result = oss.str();  // "Age: 25, Score: 95.5"

// String input stream
std::string data = "42 3.14 Hello";
std::istringstream iss(data);
int num;
double pi;
std::string word;
iss >> num >> pi >> word;  // num=42, pi=3.14, word="Hello"
```

<!-- ADSENSE -->

## Part 2

[Click here](/cpp-language-cheatsheet-part2) to read the part 2.