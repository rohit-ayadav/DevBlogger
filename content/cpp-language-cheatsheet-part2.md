# C++ Programming Language Cheatsheet - Part 2: Advanced Concepts

## Table of Contents
- [Object-Oriented Programming](#object-oriented-programming)
- [Templates](#templates)
- [Exception Handling](#exception-handling)
- [Standard Template Library (STL)](#standard-template-library-stl)
- [Memory Management](#memory-management)
- [Namespaces](#namespaces)
- [Preprocessor Directives](#preprocessor-directives)
- [Modern C++ Features](#modern-c-features)
- [Common Pitfalls & Best Practices](#common-pitfalls--best-practices)

*For fundamental concepts, see [C++ Programming Language Cheatsheet - Part 1: Fundamentals](/cpp-language-cheatsheet)*
# C++ Programming Language Cheatsheet - Part 2: Advanced Concepts

## Table of Contents
- [Object-Oriented Programming](#object-oriented-programming)
  - [Classes and Objects](#classes-and-objects)
  - [Access Specifiers](#access-specifiers)
  - [Constructors and Destructors](#constructors-and-destructors)
  - [Inheritance](#inheritance)
  - [Multiple Inheritance](#multiple-inheritance)
  - [Virtual Inheritance](#virtual-inheritance)
  - [Operator Overloading](#operator-overloading)
- [Templates](#templates)
  - [Function Templates](#function-templates)
  - [Class Templates](#class-templates)
  - [Template Specialization](#template-specialization)
  - [Variadic Templates](#variadic-templates)
- [Exception Handling](#exception-handling)
  - [Basic Exception Handling](#basic-exception-handling)
  - [Throwing Exceptions](#throwing-exceptions)
  - [Function Exception Specification](#function-exception-specification)
  - [Resource Management with RAII](#resource-management-with-raii)
- [Standard Template Library (STL)](#standard-template-library-stl)
  - [Containers](#containers)
    - [Sequence Containers](#sequence-containers)
    - [Associative Containers](#associative-containers)
    - [Unordered Containers](#unordered-containers)
    - [Container Adaptors](#container-adaptors)
  - [Iterators](#iterators)
  - [Algorithms](#algorithms)
  - [Function Objects](#function-objects)
- [Memory Management](#memory-management)
  - [Raw Pointers](#raw-pointers)
  - [Smart Pointers](#smart-pointers)
  - [Memory Alignment](#memory-alignment)
- [Namespaces](#namespaces)
  - [Basic Namespace Usage](#basic-namespace-usage)
  - [Namespace Aliases](#namespace-aliases)
- [Preprocessor Directives](#preprocessor-directives)
  - [Basic Directives](#basic-directives)
  - [Predefined Macros](#predefined-macros)
- [Modern C++ Features](#modern-c-features)
  - [C++11 Features](#c11-features)
  - [C++14 Features](#c14-features)
  - [C++17 Features](#c17-features)
  - [C++20 Features](#c20-features)
  - [C++23 Features](#c23-features)
- [Common Pitfalls & Best Practices](#common-pitfalls--best-practices)
  - [Memory Management Pitfalls](#memory-management-pitfalls)
  - [Modern C++ Idioms](#modern-c-idioms)
  - [Performance Considerations](#performance-considerations)
  - [Code Organization](#code-organization)

*For fundamental concepts, see [C++ Programming Language Cheatsheet - Part 1: Fundamentals](/cpp-language-cheatsheet)*

## Object-Oriented Programming

### Classes and Objects
```cpp
// Class declaration
class Person {
private:
    // Private members - accessible only within class methods
    std::string name;
    int age;
    
public:
    // Public members - accessible from anywhere
    // Constructor
    Person(const std::string& n, int a) : name(n), age(a) {}
    
    // Methods
    void setName(const std::string& n) { name = n; }
    void setAge(int a) { age = a; }
    std::string getName() const { return name; }
    int getAge() const { return age; }
    
    // Method with implementation outside class definition
    void displayInfo() const;
};

// Method implementation outside class
void Person::displayInfo() const {
    std::cout << "Name: " << name << ", Age: " << age << std::endl;
}

// Creating and using objects
int main() {
    Person person1("Alice", 30);
    person1.displayInfo();
    
    Person person2("Bob", 25);
    std::cout << person2.getName() << " is " << person2.getAge() << " years old." << std::endl;
    
    return 0;
}
```

### Access Specifiers
```cpp
class MyClass {
public:
    // Accessible from anywhere
    int publicVar;
    
protected:
    // Accessible within this class and derived classes
    int protectedVar;
    
private:
    // Accessible only within this class
    int privateVar;
};
```

### Constructors and Destructors
```cpp
class Rectangle {
private:
    double width;
    double height;
    
public:
    // Default constructor
    Rectangle() : width(0), height(0) {
        std::cout << "Default constructor called" << std::endl;
    }
    
    // Parameterized constructor
    Rectangle(double w, double h) : width(w), height(h) {
        std::cout << "Parameterized constructor called" << std::endl;
    }
    
    // Copy constructor
    Rectangle(const Rectangle& other) : width(other.width), height(other.height) {
        std::cout << "Copy constructor called" << std::endl;
    }
    
    // Move constructor (C++11)
    Rectangle(Rectangle&& other) noexcept : width(other.width), height(other.height) {
        other.width = 0;
        other.height = 0;
        std::cout << "Move constructor called" << std::endl;
    }
    
    // Destructor
    ~Rectangle() {
        std::cout << "Destructor called" << std::endl;
    }
    
    // Copy assignment operator
    Rectangle& operator=(const Rectangle& other) {
        if (this != &other) {
            width = other.width;
            height = other.height;
        }
        std::cout << "Copy assignment called" << std::endl;
        return *this;
    }
    
    // Move assignment operator (C++11)
    Rectangle& operator=(Rectangle&& other) noexcept {
        if (this != &other) {
            width = other.width;
            height = other.height;
            other.width = 0;
            other.height = 0;
        }
        std::cout << "Move assignment called" << std::endl;
        return *this;
    }
    
    // Accessors
    double getWidth() const { return width; }
    double getHeight() const { return height; }
    double getArea() const { return width * height; }
};
```

### Inheritance
```cpp
// Base class
class Shape {
protected:
    double x, y;
    
public:
    Shape(double xPos = 0, double yPos = 0) : x(xPos), y(yPos) {}
    virtual ~Shape() {}  // Virtual destructor for proper cleanup
    
    void setPosition(double xPos, double yPos) {
        x = xPos;
        y = yPos;
    }
    
    // Virtual function - can be overridden in derived classes
    virtual void draw() const {
        std::cout << "Drawing a shape at (" << x << ", " << y << ")" << std::endl;
    }
    
    // Pure virtual function - must be implemented by derived classes
    virtual double area() const = 0;  // Makes Shape an abstract class
};

// Derived class
class Circle : public Shape {
private:
    double radius;
    
public:
    Circle(double r, double xPos = 0, double yPos = 0) 
        : Shape(xPos, yPos), radius(r) {}
    
    // Override base class virtual function
    void draw() const override {
        std::cout << "Drawing a circle at (" << x << ", " << y 
                  << ") with radius " << radius << std::endl;
    }
    
    // Implement the pure virtual function
    double area() const override {
        return M_PI * radius * radius;  // M_PI from <cmath>
    }
};

// Another derived class
class Rectangle : public Shape {
private:
    double width, height;
    
public:
    Rectangle(double w, double h, double xPos = 0, double yPos = 0)
        : Shape(xPos, yPos), width(w), height(h) {}
        
    void draw() const override {
        std::cout << "Drawing a rectangle at (" << x << ", " << y 
                  << ") with width " << width << " and height " << height << std::endl;
    }
    
    double area() const override {
        return width * height;
    }
};

// Using polymorphism
void drawShape(const Shape& shape) {
    shape.draw();  // Calls the appropriate draw() based on the actual object type
}

int main() {
    Circle circle(5, 10, 10);
    Rectangle rectangle(4, 6, 20, 20);
    
    drawShape(circle);     // Calls Circle::draw()
    drawShape(rectangle);  // Calls Rectangle::draw()
    
    // Using pointers
    std::vector<std::unique_ptr<Shape>> shapes;  // Modern C++ approach
    shapes.push_back(std::make_unique<Circle>(3));
    shapes.push_back(std::make_unique<Rectangle>(2, 4));
    
    for (const auto& shape : shapes) {
        shape->draw();
        std::cout << "Area: " << shape->area() << std::endl;
    }
    
    return 0;
}
```

### Multiple Inheritance
```cpp
class A {
public:
    void funcA() { std::cout << "A::funcA()" << std::endl; }
};

class B {
public:
    void funcB() { std::cout << "B::funcB()" << std::endl; }
};

// Multiple inheritance
class C : public A, public B {
public:
    void funcC() { std::cout << "C::funcC()" << std::endl; }
};

// Usage
int main() {
    C c;
    c.funcA();  // From class A
    c.funcB();  // From class B
    c.funcC();  // From class C
    return 0;
}
```

### Virtual Inheritance
```cpp
class Base {
protected:
    int value;
public:
    Base(int v) : value(v) {}
    virtual void display() const {
        std::cout << "Base value: " << value << std::endl;
    }
};

// Virtual inheritance
class Derived1 : virtual public Base {
public:
    Derived1(int v) : Base(v) {}
    void display() const override {
        std::cout << "Derived1 with ";
        Base::display();
    }
};

// Virtual inheritance
class Derived2 : virtual public Base {
public:
    Derived2(int v) : Base(v) {}
    void display() const override {
        std::cout << "Derived2 with ";
        Base::display();
    }
};

// Diamond problem solved with virtual inheritance
class Final : public Derived1, public Derived2 {
public:
    Final(int v) : Base(v), Derived1(v), Derived2(v) {}
    
    void display() const override {
        std::cout << "Final class with value: " << value << std::endl;
    }
};

int main() {
    Final f(42);
    f.display();  // Calls Final::display()
    
    // The following is unambiguous thanks to virtual inheritance
    Derived1& d1 = f;
    d1.display();  // Calls Derived1::display()
    
    Base& b = f;
    b.display();  // Calls Final::display() due to virtual function
    
    return 0;
}
```

### Operator Overloading
```cpp
class Complex {
private:
    double real, imag;
    
public:
    Complex(double r = 0, double i = 0) : real(r), imag(i) {}
    
    // Accessor methods
    double getReal() const { return real; }
    double getImag() const { return imag; }
    
    // Overload + operator
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }
    
    // Overload - operator
    Complex operator-(const Complex& other) const {
        return Complex(real - other.real, imag - other.imag);
    }
    
    // Overload * operator
    Complex operator*(const Complex& other) const {
        return Complex(
            real * other.real - imag * other.imag,
            real * other.imag + imag * other.real
        );
    }
    
    // Overload == operator
    bool operator==(const Complex& other) const {
        return (real == other.real) && (imag == other.imag);
    }
    
    // Overload != operator
    bool operator!=(const Complex& other) const {
        return !(*this == other);
    }
    
    // Unary operators
    Complex operator-() const {
        return Complex(-real, -imag);
    }
    
    // Prefix increment
    Complex& operator++() {
        ++real;
        return *this;
    }
    
    // Postfix increment
    Complex operator++(int) {
        Complex temp(*this);
        ++real;
        return temp;
    }
    
    // Overload << operator as a friend function
    friend std::ostream& operator<<(std::ostream& os, const Complex& c);
};

// Implementation of friend function
std::ostream& operator<<(std::ostream& os, const Complex& c) {
    os << c.real;
    if (c.imag >= 0) {
        os << " + " << c.imag << "i";
    } else {
        os << " - " << -c.imag << "i";
    }
    return os;
}

// Usage
int main() {
    Complex a(1, 2);
    Complex b(3, 4);
    Complex c = a + b;  // Calls a.operator+(b)
    Complex d = a * b;  // Calls a.operator*(b)
    
    std::cout << "a = " << a << std::endl;
    std::cout << "b = " << b << std::endl;
    std::cout << "a + b = " << c << std::endl;
    std::cout << "a * b = " << d << std::endl;
    
    if (a != b) {
        std::cout << "a and b are different" << std::endl;
    }
    
    Complex e = -a;     // Unary minus
    Complex f = ++a;    // Prefix increment
    Complex g = b++;    // Postfix increment
    
    return 0;
}
```

## Templates

### Function Templates
```cpp
// Basic function template
template<typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

// Function template with multiple parameters
template<typename T, typename U>
auto add(T a, U b) -> decltype(a + b) {  // Trailing return type
    return a + b;
}

// Function template with constraints (C++20)
template<typename T>
requires std::is_arithmetic_v<T>
T square(T x) {
    return x * x;
}

// Usage
int main() {
    int maxInt = max<int>(3, 7);        // Explicit type
    double maxDouble = max(3.5, 7.2);   // Type deduced from arguments
    
    auto sum1 = add(5, 3.14);           // int + double = double
    auto sum2 = add(std::string("Hello, "), "World!"); // Concatenation
    
    auto sq1 = square(4);       // int
    auto sq2 = square(4.5);     // double
    // auto sq3 = square("test"); // Error: constraint not satisfied
    
    return 0;
}
```

### Class Templates
```cpp
// Basic class template
template<typename T>
class Box {
private:
    T value;
    
public:
    Box(T val) : value(val) {}
    T getValue() const { return value; }
    void setValue(T val) { value = val; }
};

// Class template with multiple parameters
template<typename T, int Size, typename Allocator = std::allocator<T>>
class FixedVector {
private:
    T elements[Size];
    size_t count = 0;
    
public:
    bool push_back(const T& value) {
        if (count < Size) {
            elements[count++] = value;
            return true;
        }
        return false;
    }
    
    T& operator[](size_t index) {
        return elements[index];
    }
    
    const T& operator[](size_t index) const {
        return elements[index];
    }
    
    size_t size() const {
        return count;
    }
    
    size_t capacity() const {
        return Size;
    }
};

// Usage
int main() {
    Box<int> intBox(42);
    std::cout << intBox.getValue() << std::endl;
    
    Box<std::string> stringBox("Hello, Templates!");
    std::cout << stringBox.getValue() << std::endl;
    
    FixedVector<int, 5> numbers;
    numbers.push_back(1);
    numbers.push_back(2);
    numbers.push_back(3);
    
    for (size_t i = 0; i < numbers.size(); ++i) {
        std::cout << numbers[i] << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Template Specialization
```cpp
// Primary template
template<typename T>
class TypeInfo {
public:
    static const char* name() {
        return "unknown";
    }
};

// Full specialization for int
template<>
class TypeInfo<int> {
public:
    static const char* name() {
        return "int";
    }
};

// Full specialization for double
template<>
class TypeInfo<double> {
public:
    static const char* name() {
        return "double";
    }
};

// Partial specialization for pointers
template<typename T>
class TypeInfo<T*> {
public:
    static const char* name() {
        static std::string result = std::string(TypeInfo<T>::name()) + "*";
        return result.c_str();
    }
};

// Partial specialization for arrays
template<typename T, size_t N>
class TypeInfo<T[N]> {
public:
    static const char* name() {
        static std::string result = std::string(TypeInfo<T>::name()) + 
                                   "[" + std::to_string(N) + "]";
        return result.c_str();
    }
};

// Usage
int main() {
    std::cout << "Type: " << TypeInfo<int>::name() << std::endl;
    std::cout << "Type: " << TypeInfo<double>::name() << std::endl;
    std::cout << "Type: " << TypeInfo<float>::name() << std::endl;
    std::cout << "Type: " << TypeInfo<int*>::name() << std::endl;
    std::cout << "Type: " << TypeInfo<int[10]>::name() << std::endl;
    
    return 0;
}
```

### Variadic Templates
```cpp
// Recursive variadic template
template<typename T>
void print(T value) {
    std::cout << value << std::endl;
}

template<typename First, typename... Rest>
void print(First first, Rest... rest) {
    std::cout << first << ", ";
    print(rest...); // Recursive call with remaining arguments
}

// Sum function using recursion
template<typename T>
T sum(T value) {
    return value;
}

template<typename T, typename... Args>
T sum(T first, Args... args) {
    return first + sum(args...);
}

// Fold expressions (C++17)
template<typename... Args>
auto sum_fold(Args... args) {
    return (... + args); // Unary left fold
}

template<typename... Args>
auto product_fold(Args... args) {
    return (args * ...); // Unary right fold
}

template<typename... Args>
void print_fold(Args... args) {
    ((std::cout << args << " "), ...); // Fold with comma operator
    std::cout << std::endl;
}

// Perfect forwarding with variadic templates
template<typename... Args>
void forward_to_function(Args&&... args) {
    some_function(std::forward<Args>(args)...);
}

// Usage
int main() {
    print(1, 2.5, "Hello", 'A');
    
    std::cout << "Sum: " << sum(1, 2, 3, 4, 5) << std::endl;
    std::cout << "Sum with fold: " << sum_fold(1, 2, 3, 4, 5) << std::endl;
    std::cout << "Product with fold: " << product_fold(1, 2, 3, 4, 5) << std::endl;
    
    print_fold(1, 2.5, "Hello", 'A');
    
    return 0;
}
```

## Exception Handling

### Basic Exception Handling
```cpp
#include <iostream>
#include <stdexcept>
#include <string>
#include <vector>

int main() {
    try {
        // Code that might throw exceptions
        std::vector<int> vec;
        vec.at(5) = 10;  // Throws std::out_of_range
    } 
    catch (const std::out_of_range& e) {
        std::cerr << "Out of range error: " << e.what() << std::endl;
    } 
    catch (const std::runtime_error& e) {
        std::cerr << "Runtime error: " << e.what() << std::endl;
    } 
    catch (const std::exception& e) {
        std::cerr << "Standard exception: " << e.what() << std::endl;
    } 
    catch (...) {
        std::cerr << "Unknown exception caught" << std::endl;
    }
    
    try {
        // Multiple exceptions in one block
        int* arr = new int[1000000000];  // Might throw std::bad_alloc
        throw std::runtime_error("Manual exception");
        delete[] arr;  // Never reached if exception thrown
    } 
    catch (const std::bad_alloc& e) {
        std::cerr << "Memory allocation failed: " << e.what() << std::endl;
    } 
    catch (const std::exception& e) {
        std::cerr << "Exception caught: " << e.what() << std::endl;
    }
    
    return 0;
}
```

### Throwing Exceptions
```cpp
#include <iostream>
#include <stdexcept>
#include <string>

// Throwing standard exceptions
void validatePositive(int value) {
    if (value < 0) {
        throw std::invalid_argument("Value must be non-negative");
    }
}

// Throwing custom exceptions
class DivideByZeroException : public std::exception {
private:
    std::string message;
    
public:
    DivideByZeroException(const std::string& msg = "Division by zero attempted") 
        : message(msg) {}
    
    // Override what() from std::exception
    const char* what() const noexcept override {
        return message.c_str();
    }
};

double safeDivide(double a, double b) {
    if (b == 0) {
        throw DivideByZeroException();
    }
    return a / b;
}

// Rethrowing exceptions
void processValue(int value) {
    try {
        validatePositive(value);
        // Process the value
    } catch (const std::exception& e) {
        std::cerr << "Error in processValue: " << e.what() << std::endl;
        throw; // Rethrow the same exception
    }
}

// Nested exceptions (C++11)
void nestedExceptionExample() {
    try {
        throw std::runtime_error("Original exception");
    } catch (const std::exception& e) {
        std::throw_with_nested(std::logic_error("Additional context"));
    }
}

void handleNestedExceptions() {
    try {
        nestedExceptionExample();
    } catch (const std::exception& e) {
        std::cerr << "Exception: " << e.what() << std::endl;
        
        try {
            std::rethrow_if_nested(e);
        } catch (const std::exception& nested) {
            std::cerr << "Nested exception: " << nested.what() << std::endl;
        }
    }
}

int main() {
    try {
        validatePositive(-5);
    } catch (const std::exception& e) {
        std::cerr << "Exception: " << e.what() << std::endl;
    }
    
    try {
        safeDivide(10, 0);
    } catch (const DivideByZeroException& e) {
        std::cerr << "Custom exception: " << e.what() << std::endl;
    }
    
    try {
        processValue(-10);
    } catch (const std::exception& e) {
        std::cerr << "Rethrown exception: " << e.what() << std::endl;
    }
    
    handleNestedExceptions();
    
    return 0;
}
```

### Function Exception Specification
```cpp
#include <iostream>
#include <string>

// noexcept specification (C++11)
void func1() noexcept {
    // This function guarantees it won't throw any exceptions
    // If it does throw, std::terminate is called
}

// Conditional noexcept (C++11)
template<typename T>
void swap(T& a, T& b) noexcept(noexcept(T(std::declval<T>())))
{
    T temp = std::move(a);
    a = std::move(b);
    b = std::move(temp);
}

// noexcept operator (C++11)
template<typename T>
void process(T& obj) {
    static_assert(noexcept(obj.process()), 
                 "T::process() must be noexcept");
    obj.process();
}

// Dynamic exception specification (deprecated in C++11, removed in C++17)
// void oldStyle() throw(std::runtime_error, std::logic_error); // Don't use this style

int main() {
    // Checking if operations are noexcept
    std::cout << "int addition is noexcept: " 
              << noexcept(1 + 2) << std::endl;
              
    std::cout << "new can throw: " 
              << !noexcept(new int) << std::endl;
              
    return 0;
}
```

### Resource Management with RAII
```cpp
#include <iostream>
#include <fstream>
#include <memory>
#include <stdexcept>

// RAII for file handling
class File {
private:
    std::fstream file;
    
public:
    File(const std::string& filename, std::ios_base::openmode mode)
        : file(filename, mode)
    {
        if (!file) {
            throw std::runtime_error("Failed to open file: " + filename);
        }
    }
    
    ~File() {
        if (file.is_open()) {
            file.close();
        }
    }
    
    // Prevent copying
    File(const File&) = delete;
    File& operator=(const File&) = delete;
    
    // Allow moving
    File(File&& other) noexcept
        : file(std::move(other.file))
    {
    }
    
    File& operator=(File&& other) noexcept {
        if (this != &other) {
            file = std::move(other.file);
        }
        return *this;
    }
    
    // File operations
    void write(const std::string& text) {
        file << text;
        if (!file) {
            throw std::runtime_error("Failed to write to file");
        }
    }
    
    std::string read() {
        std::string content;
        std::string line;
        while (std::getline(file, line)) {
            content += line + "\n";
        }
        return content;
    }
};

// RAII for lock management
class Lock {
private:
    std::mutex& mutex;
    
public:
    explicit Lock(std::mutex& m) : mutex(m) {
        mutex.lock();
    }
    
    ~Lock() {
        mutex.unlock();
    }
    
    // Prevent copying
    Lock(const Lock&) = delete;
    Lock& operator=(const Lock&) = delete;
};

// Usage example
void writeToFile(const std::string& filename, const std::string& content) {
    // File is automatically closed when function returns or throws
    File file(filename, std::ios::out);
    file.write(content);
    // No need to explicitly close the file
}

int main() {
    try {
        writeToFile("example.txt", "Hello, RAII!");
        
        // Use std::lock_guard (built-in RAII for mutex)
        std::mutex m;
        {
            std::lock_guard<std::mutex> lock(m);
            // Critical section...
        } // Mutex automatically unlocked here
        
    } catch (const std::exception& e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## Standard Template Library (STL)

### Containers

#### Sequence Containers
```cpp
#include <vector>
#include <deque>
#include <list>
#include <forward_list>
#include <array>
#include <iostream>

int main() {
    // Vector - dynamic array
    std::vector<int> vec = {1, 2, 3, 4, 5};
    vec.push_back(6);        // Add to end
    vec.pop_back();          // Remove from end
    vec.insert(vec.begin() + 2, 10);  // Insert at position
    vec.erase(vec.begin());  // Remove from position
    std::cout << "Vector size: " << vec.size() << std::endl;
    std::cout << "Vector capacity: " << vec.capacity() << std::endl;
    vec.shrink_to_fit();     // Reduce capacity to fit size
    vec.reserve(100);        // Reserve space for 100 elements
    vec.resize(10);          // Resize to 10 elements (new elements initialized to 0)
    vec.clear();             // Remove all elements
    
    // Deque - double-ended queue
    std::deque<int> dq = {1, 2, 3};
    dq.push_back(4);         // Add to end
    dq.push_front(0);        // Add to beginning
    dq.pop_back();           // Remove from end
    dq.pop_front();          // Remove from beginning
    dq.insert(dq.begin() + 1, 5);  // Insert at position
    dq.erase(dq.end() - 1);  // Remove from position
    
    // List - doubly-linked list
    std::list<int> lst = {1, 2, 3, 4, 5};
    lst.push_back(6);        // Add to end
    lst.push_front(0);       // Add to beginning
    lst.pop_back();          // Remove from end
    lst.pop_front();         // Remove from beginning
    lst.insert(std::next(lst.begin(), 2), 10);  // Insert at position
    lst.remove(3);           // Remove all elements with value 3
    lst.remove_if([](int n) { return n % 2 == 0; });  // Remove all even numbers
    lst.sort();              // Sort elements
    lst.unique();            // Remove consecutive duplicates
    lst.reverse();           // Reverse order of elements
    
    // Forward list - singly-linked list (C++11)
    std::forward_list<int> flist = {1, 2, 3, 4, 5};
    flist.push_front(0);     // Add to beginning
    flist.pop_front();       // Remove from beginning
    flist.insert_after(flist.begin(), 10);  // Insert after position
    flist.erase_after(flist.begin());       // Remove after position
    flist.remove(3);         // Remove all elements with value 3
    flist.sort();            // Sort elements
    flist.unique();          // Remove consecutive duplicates
    flist.reverse();         // Reverse order of elements
    
    // Array - fixed-size array (C++11)
    std::array<int, 5> arr = {1, 2, 3, 4, 5};
    int first = arr.front();  // First element
    int last = arr.back();    // Last element
    int element = arr[2];     // Access by index
    arr.fill(10);             // Set all elements to 10
    std::cout << "Array size: " << arr.size() << std::endl;  // Always 5
    
    return 0;
}
```