# C Programming Language Cheatsheet

## Table of Contents
- [Basics](#basics)
- [Data Types](#data-types)
- [Variables](#variables)
- [Operators](#operators)
- [Control Flow](#control-flow)
- [Functions](#functions)
- [Arrays](#arrays)
- [Pointers](#pointers)
- [Strings](#strings)
- [Structures](#structures)
- [Memory Management](#memory-management)
- [File Handling](#file-handling)
- [Preprocessor Directives](#preprocessor-directives)
- [Common C Library Functions](#common-c-library-functions)
- [Common Pitfalls](#common-pitfalls)

## Basics

### Program Structure
```c
#include <stdio.h>  // Include header files

int main() {        // Entry point of the program
    // Your code here
    
    return 0;       // Return value to the OS (0 means success)
}
```

### Comments
```c
// Single-line comment

/*
   Multi-line
   comment
*/
```

### Input/Output
```c
printf("Hello, %s! You are %d years old.\n", name, age);  // Output
scanf("%d", &num);                                        // Input
```

#### Format Specifiers
| Specifier | Description |
|-----------|-------------|
| `%d` or `%i` | Integer |
| `%f` | Float |
| `%lf` | Double |
| `%c` | Character |
| `%s` | String |
| `%p` | Pointer address |
| `%x` or `%X` | Hexadecimal |
| `%o` | Octal |
| `%u` | Unsigned integer |
| `%e` or `%E` | Scientific notation |
| `%g` or `%G` | Shorter of %f or %e |

<!-- ADSENSE -->
## Data Types

### Basic Types
| Type | Description | Size (typically) | Format Specifier |
|------|-------------|------------------|------------------|
| `char` | Character/small integer | 1 byte | `%c` or `%d` |
| `int` | Integer | 2 or 4 bytes | `%d` or `%i` |
| `float` | Single-precision floating point | 4 bytes | `%f` |
| `double` | Double-precision floating point | 8 bytes | `%lf` |
| `void` | No type | - | - |

### Type Modifiers
| Modifier | Description |
|----------|-------------|
| `signed` | Can represent negative values (default) |
| `unsigned` | Can only represent non-negative values |
| `short` | Reduces size of int (typically 2 bytes) |
| `long` | Increases size of int or double |
| `long long` | Even larger integer (C99 and later) |

### Type Casting
```c
float f = 5.67;
int i = (int)f;  // Explicit type casting, i = 5
```

<!-- ADSENSE -->
## Variables

### Declaration and Initialization
```c
int count;            // Declaration
int count = 10;       // Declaration with initialization
int x, y, z;          // Multiple declarations
const double PI = 3.14159;  // Constant (cannot be modified)
```

### Storage Classes
| Class | Description | Lifetime | Scope | Default Value |
|-------|-------------|----------|-------|---------------|
| `auto` | Default for local variables | Function block | Function block | Garbage value |
| `register` | Hint to store in CPU register | Function block | Function block | Garbage value |
| `static` | Preserves value between function calls | Program lifetime | Function block or file | Zero |
| `extern` | References variable defined elsewhere | Program lifetime | Global | Zero |

<!-- ADSENSE -->
## Operators

### Arithmetic Operators
| Operator | Description | Example |
|----------|-------------|---------|
| `+` | Addition | `a + b` |
| `-` | Subtraction | `a - b` |
| `*` | Multiplication | `a * b` |
| `/` | Division | `a / b` |
| `%` | Modulus (remainder) | `a % b` |
| `++` | Increment | `a++` or `++a` |
| `--` | Decrement | `a--` or `--a` |

### Relational Operators
| Operator | Description | Example |
|----------|-------------|---------|
| `==` | Equal to | `a == b` |
| `!=` | Not equal to | `a != b` |
| `>` | Greater than | `a > b` |
| `<` | Less than | `a < b` |
| `>=` | Greater than or equal to | `a >= b` |
| `<=` | Less than or equal to | `a <= b` |

### Logical Operators
| Operator | Description | Example |
|----------|-------------|---------|
| `&&` | Logical AND | `a && b` |
| `\|\|` | Logical OR | `a \|\| b` |
| `!` | Logical NOT | `!a` |

### Bitwise Operators
| Operator | Description | Example |
|----------|-------------|---------|
| `&` | Bitwise AND | `a & b` |
| `\|` | Bitwise OR | `a \| b` |
| `^` | Bitwise XOR | `a ^ b` |
| `~` | Bitwise complement | `~a` |
| `<<` | Left shift | `a << n` |
| `>>` | Right shift | `a >> n` |

### Assignment Operators
| Operator | Description | Equivalent |
|----------|-------------|------------|
| `=` | Simple assignment | `a = b` |
| `+=` | Add and assign | `a = a + b` |
| `-=` | Subtract and assign | `a = a - b` |
| `*=` | Multiply and assign | `a = a * b` |
| `/=` | Divide and assign | `a = a / b` |
| `%=` | Modulus and assign | `a = a % b` |
| `&=` | Bitwise AND and assign | `a = a & b` |
| `\|=` | Bitwise OR and assign | `a = a \| b` |
| `^=` | Bitwise XOR and assign | `a = a ^ b` |
| `<<=` | Left shift and assign | `a = a << b` |
| `>>=` | Right shift and assign | `a = a >> b` |

### Other Operators
| Operator | Description |
|----------|-------------|
| `sizeof()` | Returns size in bytes |
| `&` | Address operator (returns memory address) |
| `*` | Dereference operator (accesses value at address) |
| `? :` | Ternary operator (condition ? result_if_true : result_if_false) |
| `,` | Comma operator (evaluates multiple expressions) |

<!-- ADSENSE -->
## Control Flow

### Conditional Statements
```c
// If statement
if (condition) {
    // Code if condition is true
}

// If-else statement
if (condition) {
    // Code if condition is true
} else {
    // Code if condition is false
}

// If-else if-else statement
if (condition1) {
    // Code if condition1 is true
} else if (condition2) {
    // Code if condition2 is true
} else {
    // Code if all conditions are false
}

// Switch statement
switch (expression) {
    case value1:
        // Code if expression equals value1
        break;
    case value2:
        // Code if expression equals value2
        break;
    default:
        // Code if expression doesn't match any case
}
```

### Loops
```c
// While loop
while (condition) {
    // Code executed while condition is true
}

// Do-while loop (executes at least once)
do {
    // Code executed at least once and then while condition is true
} while (condition);

// For loop
for (initialization; condition; increment/decrement) {
    // Code executed while condition is true
}

// Infinite loop
for (;;) {
    // Code runs indefinitely
}
```

### Loop Control
```c
break;      // Exits the loop or switch
continue;   // Skips the rest of the loop and moves to the next iteration
goto label; // Jumps to the specified label
```

<!-- ADSENSE -->
## Functions

### Function Declaration and Definition
```c
// Function prototype (declaration)
return_type function_name(parameter_type parameter1, parameter_type parameter2, ...);

// Function definition
return_type function_name(parameter_type parameter1, parameter_type parameter2, ...) {
    // Function body
    return value;  // Optional return statement
}

// Example
int add(int a, int b) {
    return a + b;
}
```

### Parameter Passing
```c
// Pass by value (creates a copy)
void increment(int x) {
    x++;  // Only modifies the local copy
}

// Pass by reference (using pointers)
void increment(int *x) {
    (*x)++;  // Modifies the original value
}
```

### Function Pointers
```c
return_type (*pointer_name)(parameter_types);

// Example
int (*operation)(int, int);
operation = &add;  // Assign function address
result = operation(5, 3);  // Call via pointer (result = 8)
```

### Recursion
```c
int factorial(int n) {
    if (n <= 1) {
        return 1;  // Base case
    }
    return n * factorial(n - 1);  // Recursive call
}
```

### Inline Functions (C99)
```c
inline int square(int x) {
    return x * x;
}
```

<!-- ADSENSE -->
## Arrays

### Declaration and Initialization
```c
// Declaration
data_type array_name[size];

// Initialization
int numbers[5] = {1, 2, 3, 4, 5};
int partial[5] = {1, 2};  // Remaining elements set to 0
int auto_sized[] = {1, 2, 3};  // Size determined by initializer
```

### Multi-dimensional Arrays
```c
// Declaration
data_type array_name[size1][size2]...[sizeN];

// Initialization
int matrix[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
```

### Array Access
```c
int x = numbers[0];  // Access first element (1)
numbers[1] = 10;     // Modify second element
```

### Array as Function Parameters
```c
void processArray(int arr[], int size) {
    // arr is actually a pointer
}

// With multi-dimensional arrays
void processMatrix(int matrix[][COLS], int rows) {
    // All dimensions except the first must be specified
}
```

<!-- ADSENSE -->
## Pointers

### Declaration and Initialization
```c
data_type *pointer_name;      // Declaration
int *ptr;                     // Pointer to int
int *ptr1, *ptr2;             // Multiple pointer declarations

ptr = &variable;              // Assign address of variable to pointer
int *ptr = &variable;         // Declaration with initialization
```

### Pointer Operations
```c
*ptr = 10;          // Dereferencing (accessing/modifying the value)
ptr++;              // Pointer arithmetic (moves to next memory location)
ptr += n;           // Move n elements forward
ptr -= n;           // Move n elements backward
ptr1 - ptr2;        // Difference between pointers (in number of elements)
```

### Pointers and Arrays
```c
int arr[5] = {1, 2, 3, 4, 5};
int *ptr = arr;     // Points to first element
// arr[i] is equivalent to *(arr + i)
```

### Pointer to Pointer
```c
int **pptr;         // Pointer to a pointer to int
pptr = &ptr;        // Assign address of ptr to pptr
**pptr = 20;        // Access value through double pointer
```

### Void Pointers
```c
void *ptr;          // Generic pointer (can point to any data type)
ptr = &variable;    // No type casting needed
int *int_ptr = (int *)ptr;  // Requires explicit casting when dereferencing
```

### Null Pointer
```c
int *ptr = NULL;    // Points to nothing (address 0)
if (ptr != NULL) {  // Check before dereferencing
    *ptr = 10;
}
```

### Function Pointers
```c
return_type (*ptr_name)(parameter_types);
int (*func_ptr)(int, int);  // Pointer to function taking two ints and returning int
func_ptr = &add;            // Assign function address
result = (*func_ptr)(5, 3); // Call via pointer
```

<!-- ADSENSE -->
## Strings

### String Declaration and Initialization
```c
char str[10];                // Declare string of size 10
char str[] = "Hello";        // Initialize with string literal
char *str = "Hello";         // Using pointer (not recommended)
char str[10] = "Hello";      // With specific size
```

### String Operations
```c
#include <string.h>

strlen(str);                 // String length (excluding null terminator)
strcpy(dest, src);           // Copy string
strncpy(dest, src, n);       // Copy at most n characters
strcat(dest, src);           // Concatenate strings
strncat(dest, src, n);       // Concatenate at most n characters
strcmp(str1, str2);          // Compare strings (0 if equal)
strncmp(str1, str2, n);      // Compare at most n characters
strchr(str, char);           // Find first occurrence of char
strrchr(str, char);          // Find last occurrence of char
strstr(haystack, needle);    // Find first occurrence of substring
```

### String Input/Output
```c
printf("%s", str);           // Print string
scanf("%s", str);            // Read string (stops at whitespace)
fgets(str, size, stdin);     // Read line (includes newline)
gets(str);                   // Read line (unsafe, avoid using)
puts(str);                   // Print string with newline
```

<!-- ADSENSE -->
## Structures

### Declaration and Initialization
```c
// Structure declaration
struct structure_name {
    data_type member1;
    data_type member2;
    // ...
};

// Creating structure variables
struct structure_name variable_name;

// Initialization
struct structure_name variable_name = {value1, value2, ...};

// Example
struct Person {
    char name[50];
    int age;
    float height;
};

struct Person person1 = {"John", 25, 1.75};
```

### Accessing Structure Members
```c
variable_name.member_name;        // Using dot operator
struct Person person1;
person1.age = 30;                 // Accessing and modifying

struct Person *ptr = &person1;
ptr->age = 35;                    // Using arrow operator with pointers
(*ptr).age = 35;                  // Equivalent to above
```

### Nested Structures
```c
struct Address {
    char street[50];
    char city[30];
};

struct Person {
    char name[50];
    int age;
    struct Address addr;  // Nested structure
};

person1.addr.city = "New York";  // Accessing nested member
```

### Structure Arrays
```c
struct Person people[10];  // Array of structures
people[0].age = 25;        // Accessing array elements
```

### Passing Structures to Functions
```c
// By value (makes a copy)
void displayPerson(struct Person p) {
    printf("%s, %d\n", p.name, p.age);
}

// By reference (more efficient)
void modifyPerson(struct Person *p) {
    p->age = 40;
}
```

### Typedef with Structures
```c
typedef struct {
    char name[50];
    int age;
} Person;

Person person1;  // No need for 'struct' keyword
```

<!-- ADSENSE -->
## Memory Management

### Dynamic Memory Allocation
```c
#include <stdlib.h>

void *malloc(size_t size);             // Allocate specified bytes
void *calloc(size_t num, size_t size); // Allocate and initialize to zero
void *realloc(void *ptr, size_t size); // Resize allocation
void free(void *ptr);                  // Release allocated memory

// Examples
int *ptr = (int *)malloc(5 * sizeof(int));  // Allocate memory for 5 integers
int *ptr = (int *)calloc(5, sizeof(int));   // Allocate and initialize to zero
ptr = (int *)realloc(ptr, 10 * sizeof(int)); // Resize to fit 10 integers
free(ptr);  // Release memory when done
```

### Memory Management Best Practices
1. Always check if allocation succeeded: `if (ptr == NULL) { /* handle error */ }`
2. Always free memory when done to avoid memory leaks
3. Don't access memory after freeing it (dangling pointer)
4. Don't free memory twice (double free)
5. Use calloc when you need zero-initialized memory
6. When using realloc, always assign to a temporary pointer first

<!-- ADSENSE -->
## File Handling

### File Operations
```c
#include <stdio.h>

FILE *fopen(const char *filename, const char *mode); // Open file
int fclose(FILE *stream);                           // Close file
int fflush(FILE *stream);                           // Flush buffered data

// Modes
// "r"  - Read (file must exist)
// "w"  - Write (creates new or truncates existing)
// "a"  - Append (creates new or appends to existing)
// "r+" - Read/Write (file must exist)
// "w+" - Read/Write (creates new or truncates existing)
// "a+" - Read/Append (creates new or appends to existing)
// Add "b" for binary mode (e.g., "rb", "wb")

// Example
FILE *file = fopen("data.txt", "r");
if (file == NULL) {
    // Handle error
}
// Use file...
fclose(file);
```

### Reading from Files
```c
int fgetc(FILE *stream);                              // Read character
char *fgets(char *str, int n, FILE *stream);          // Read string
int fscanf(FILE *stream, const char *format, ...);    // Read formatted data
size_t fread(void *ptr, size_t size, size_t n, FILE *stream); // Read binary data

// Examples
char ch = fgetc(file);
char line[100];
fgets(line, 100, file);
int num;
fscanf(file, "%d", &num);
fread(buffer, sizeof(int), 10, file);  // Read 10 integers
```

### Writing to Files
```c
int fputc(int c, FILE *stream);                               // Write character
int fputs(const char *str, FILE *stream);                     // Write string
int fprintf(FILE *stream, const char *format, ...);           // Write formatted data
size_t fwrite(const void *ptr, size_t size, size_t n, FILE *stream); // Write binary data

// Examples
fputc('A', file);
fputs("Hello, World!", file);
fprintf(file, "Number: %d", 42);
fwrite(array, sizeof(int), 10, file);  // Write 10 integers
```

### File Positioning
```c
int fseek(FILE *stream, long offset, int whence);  // Move file position indicator
long ftell(FILE *stream);                          // Get current position
void rewind(FILE *stream);                         // Move to beginning of file

// whence values:
// SEEK_SET - Beginning of file
// SEEK_CUR - Current position
// SEEK_END - End of file

// Examples
fseek(file, 10, SEEK_SET);  // Move to 10th byte from beginning
fseek(file, -5, SEEK_CUR);  // Move 5 bytes backward from current position
fseek(file, 0, SEEK_END);   // Move to end of file
long pos = ftell(file);     // Get current position
rewind(file);               // Go back to beginning
```

### Error Handling
```c
int ferror(FILE *stream);      // Check for errors
int feof(FILE *stream);        // Check for end-of-file
void clearerr(FILE *stream);   // Clear error indicators
```

<!-- ADSENSE -->
## Preprocessor Directives

### Include Files
```c
#include <stdio.h>      // Standard library header
#include "myheader.h"   // User-defined header
```

### Macro Definitions
```c
#define PI 3.14159                      // Simple macro
#define SQUARE(x) ((x) * (x))           // Function-like macro
#define MAX(a,b) ((a) > (b) ? (a) : (b)) // Macro with parameters
#undef PI                               // Undefine a macro
```

### Conditional Compilation
```c
#if condition
    // Code if condition is true
#elif condition2
    // Code if condition2 is true
#else
    // Code if all conditions are false
#endif

#ifdef MACRO        // If MACRO is defined
    // Code
#endif

#ifndef MACRO       // If MACRO is not defined
    // Code
#endif

#if defined(MACRO)  // Alternative to #ifdef
    // Code
#endif
```

### Other Directives
```c
#pragma token        // Implementation-specific instructions
#error message       // Forces compilation error with message
#line number "file"  // Changes line number and file name for errors
```

### Predefined Macros
| Macro | Description |
|-------|-------------|
| `__FILE__` | Current source file name |
| `__LINE__` | Current line number |
| `__DATE__` | Compilation date (MMM DD YYYY) |
| `__TIME__` | Compilation time (HH:MM:SS) |
| `__STDC__` | 1 if compiler conforms to the standard |
| `__func__` | Current function name (C99) |

<!-- ADSENSE -->
## Common C Library Functions

### Standard I/O Functions (stdio.h)
```c
printf(), scanf(), fprintf(), fscanf(), sprintf(), sscanf()
fopen(), fclose(), fread(), fwrite(), fseek(), ftell(), rewind()
getchar(), putchar(), gets(), puts()
```

### String Handling Functions (string.h)
```c
strlen(), strcpy(), strncpy(), strcat(), strncat(), strcmp(), strncmp()
strchr(), strrchr(), strstr(), strtok()
memcpy(), memmove(), memcmp(), memset()
```

### Character Handling Functions (ctype.h)
```c
isalpha(), isdigit(), isalnum(), isspace(), islower(), isupper()
tolower(), toupper()
```

### Math Functions (math.h)
```c
sqrt(), pow(), exp(), log(), log10()
sin(), cos(), tan(), asin(), acos(), atan()
floor(), ceil(), fabs(), fmod()
```

### Utility Functions (stdlib.h)
```c
malloc(), calloc(), realloc(), free()
atoi(), atol(), atof(), strtol(), strtod()
rand(), srand()
abs(), labs(), div(), ldiv()
exit(), abort()
qsort(), bsearch()
```

### Time Functions (time.h)
```c
time(), clock(), difftime()
localtime(), gmtime(), mktime()
asctime(), ctime(), strftime()
```

<!-- ADSENSE -->
## Common Pitfalls

### Memory Management
1. Memory leaks (forgetting to free allocated memory)
2. Dangling pointers (using memory after it's freed)
3. Double free (freeing memory twice)
4. Buffer overflows (writing beyond allocated memory)

### Array Handling
1. Off-by-one errors (accessing beyond array bounds)
2. Forgetting that arrays are zero-indexed
3. Confusing array size with the highest index
4. Not allocating enough memory for strings (forgetting null terminator)

### Pointers
1. Dereferencing NULL pointers
2. Dereferencing uninitialized pointers
3. Improper casting of pointers
4. Pointer arithmetic beyond array bounds

### Control Flow
1. Forgetting to add `break` in switch statements (fall-through)
2. Infinite loops (incorrect termination conditions)
3. Unreachable code after return, break, or continue

### Operator Precedence
1. Confusing `=` (assignment) with `==` (equality)
2. Forgetting operator precedence (e.g., `a & b == c` vs `a & (b == c)`)
3. Missing parentheses in complex expressions

### Other Common Errors
1. Integer division truncation (`5/2` equals `2`, not `2.5`)
2. Not checking return values from functions
3. Ignoring compiler warnings
4. Using uninitalized variables
5. String literals are immutable (cannot be modified)

<!-- ADSENSE -->