# JavaScript & TypeScript

## JavaScript essentials

JavaScript is a programming language that contains many features for building web applications.
In this section, we will revisit and refresh our knowledge of some of the most basic ones as they are
directly correlated with TypeScript and Angular development. TypeScript is a syntactic superset
of JavaScript, meaning that it adds features such as types, interfaces, and generics. We will look
at the following JavaScript features in more detail:

- Variable declaration

- Function parameters

- Arrow functions

- Optional chaining

- Nullish coalescing

- Classes

- Modules

You can run all the code samples in this section in the following ways:

- Enter the code in a browser console window

- Type the code in a JavaScript file and use Node.js to execute it

## Variable declaration

Traditionally, JavaScript developers have used the keyword `var` to declare objects, variables, and
other artifacts. The reason was that the old semantics of the language only had a function scope
where variables were unique within its context:

```js
function myFunc() {
  var x = 0;
}
```

In the preceding function, no other variable can be declared as `x` inside its body. If you do declare
one, then you effectively redefine it. However, there are cases in which scoping is not applied,
such as in loops:

```js
var x = 20;
for (var x = 0; x < 10; x++) {}
```

In the preceding snippet, the `x` variable outside the loop will not affect the `x` variable inside
because they have a different scope. To overcome the scope limitation, JavaScript introduced the
`let` keyword:

```js
function myFunc() {
  let x = 0;
  x = 10;
}
```

The `let` keyword allows us to change the reference of a variable multiple times in the code.

Another way to define variables in JavaScript is the `const` keyword, which indicates that a variable
should never change. As a code base grows, changes may happen by mistake, which can be costly.
The `const` keyword can prevent these types of mistakes. Consider the following code snippet:

```js
const price = 100;
price = 50;
```

If we try to execute it, it will throw the following error message:
`TypeError: Assignment to constant variable.`

The preceding error will come up only at the top level. You need to be aware of this if you declare
objects as constants, like so:

```js
const product = { price: 100 };
product.price = 50;
```

Declaring the `product` variable as a constant does not prevent the entire object but rather its
_reference_ from being edited. So, the preceding code is valid. If we try to change the reference of
the variable, we will get the same type of error as before:

```js
const product = { price: 100 };
product = { price: 50 };
```

It is preferable to use the `const` keyword when we are sure that the properties of an object will
not change during its lifetime because it prevents the object from accidentally changing.

When we want to combine variables, we can use the **spread parameter** syntax. A spread parameter
uses the ellipsis (`...`) to expand the values of a variable:

```js
const category = "Computing";
const categories = ["Gaming", "Multimedia"];
const productCategories = [...categories, category];
```

In the preceding snippet, we combine the `categories` array and the `category` item to create a
new array. The `categories` array still contains two items, whereas the new array contains three.
The current behavior is called **immutability**, which means not changing a variable but creating
a new one that comes from the original.

_An object is not immutable if its properties can be changed or its properties are an object whose properties can be changed._

We can also use a spread parameter on objects:

```js
const product = {
  name: "Keyboard",
  price: 75,
};

const newProduct = {
  ...product,
  price: 100,
  category: "Computing",
};
```

In the preceding snippet, we didn’t change the original `product` object but created a merge
between the two. The value of the `newProduct` object will be:

```js
{
name: 'Keyboard',
price: 100,
category: 'Computing'
}
```

The `newProduct` object takes the properties from the `product` object, adds new values on top of
it, and replaces the existing ones.

## Function parameters

Functions in JavaScript are the processing machines we use to analyze input, digest information,
and apply the necessary transformations to data. They use parameters to provide data for
transforming the state of our application or returning an output that will be used to shape our
application’s business logic or user interactivity.

We can declare a function to accept default parameters so that the function assumes a default
value when it’s not explicitly passed upon execution:

```js
function addtoCart(productId, quantity = 1) {
  const product = {
    id: productId,
    qty: quantity,
  };
}
```

If we do not pass a value for the `quantity` parameter while calling the function, we will get a
`product` object with `qty` set to 1.

_Default parameters must be defined after all **required** parameters in the function signature._

One significant advantage of JavaScript flexibility when defining functions is accepting an
unlimited, non-declared array of parameters called **rest parameters**. Essentially, we can define an
additional parameter at the end of the arguments list prefixed by an ellipsis (`...`):

```js
function addProduct(name, ...categories) {
  const product = {
    name,
    categories: categories.join(","),
  };
}
```

In the preceding function, we use the `join` method to create a comma-separated string from the
`categories` parameter. We pass each parameter separately when calling the function:
`addProduct('Keyboard', 'Computing', 'Peripherals');`

Rest parameters are beneficial when we don’t know how many arguments will be passed as parameters.
The `name` property is also set using another useful feature of the JavaScript language.
Instead of setting the property in the `product` object explicitly, we used the property name directly.
The following snippet is equivalent to the initial declaration of the `addProduct` function:

```js
function addProduct(name, ...categories) {
  const product = {
    name: name,
    categories: categories.join(","),
  };
}
```

The shorthand syntax for assigning property values can be used only when the parameter name
matches the property name of an object.

## Arrow functions

In JavaScript, we can create functions in an alternate way called **arrow functions**. The purpose
of an arrow function is to simplify the general function syntax and provide a bulletproof way
to handle the function scope, which is traditionally handled by the `this` object. Consider the
following example, which calculates a product discount given its price:

```js
const discount = (price) => {
  return (price / 100) * 10;
};
```

The preceding code does not have a `function` keyword, and the function body is defined by an
arrow (`=>`). Arrow functions can be simplified further using the following best practices:

- Omit the parentheses in the function parameters when the signature contains one parameter only.

- Omit the curly braces in the function body and the `return` keyword if the function has
  only one statement.

The resulting function will look much simpler and easier to read:

```js
const discount = (price) => (price / 100) * 10;
```

Let’s explain now how arrow functions are related to scope handling. The value of the `this`
object can point to a different context, depending on where we execute a function. When we use it
inside a callback, we lose track of the upper context, which usually leads us to use conventions
such as assigning its value to an external variable. Consider the following function, which logs a
product name using the native `setTimeout` function:

```js
function createProduct(name) {
  this.name = name;
  this.getName = function () {
    setTimeout(function () {
      console.log("Product name is:", this.name);
    });
  };
}
```

Execute the `getName` function using the following snippet and observe the console output:

```js
const product = new createProduct("Monitor");
product.getName();
```

The preceding snippet will not print the `Monitor` product name as expected because our code
modifies the scope of the `this` object when evaluating the function inside the `setTimeout` callback.
To fix it, convert the `setTimeout` function to use an arrow function instead:

```js
setTimeout(() => {
  console.log("Product name is:", this.name);
});
```

Our code is now simpler and we can use the function scope safely.

## Optional chaining

Optional chaining is a powerful feature that can help us with refactoring and simplifying our
code. In a nutshell, it can guide our code to ignore the execution of a statement unless a value has
been provided somewhere in that statement. Let’s look at optional chaining with an example:

```js
const getOrder = () => {
  return {
    product: {
      name: "Keyboard",
    },
  };
};
```

In the preceding snippet, we define a `getOrder` function that returns the product of a particular
order. Next, let’s fetch the value of the product property, making sure that an `order` exists before
reading it:

```js
const order = getOrder();
if (order !== undefined) {
  const product = order.product;
}
```

The previous snippet is a precautionary step in case our object has been modified. If we do not
check the object and it has become `undefined`, JavaScript will throw an error. However, we can
use optional chaining to improve the previous statement:

```js
const order = getOrder();
const product = order?.product;
```

The character `?` after the `order` object ensures that the `product` property will be accessed only
if the object has a value. Optional chaining also works in more complicated scenarios, such as:

```js
const name = order?.product?.name;
```

In the preceding snippet, we also check if the `product` object has a value before accessing its
`name` property.

## Nullish coalescing

Nullish coalescing is related to providing a default value when a variable is not set. Consider the
following example, which assigns a value to the `quantity` variable only if the `qty` variable exists:

```js
const quantity = qty ? qty : 1;
```

The previous statement is called a **ternary operator** and operates like a conditional statement.
If the `qty` variable does not have a value, the `quantity` variable will be initialized to the default
value of `1`. We can rewrite the previous expression using nullish coalescing as:

```js
const quantity = qty ?? 1;
```

Nullish coalescing helps us make our code readable and smaller.

## Classes

JavaScript classes allow us to structure our application code and create instances of each class. A
class can have property members, a constructor, methods, and property accessors. The following
code snippet illustrates what a class looks like:

```js
class User {
  firstName = "";
  lastName = "";
  #isActive = false;
  constructor(firstName, lastName, isActive = true) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.#isActive = isActive;
  }
  getFullname() {
    return `${this.firstName} ${this.lastName}`;
  }
  get active() {
    return this.#isActive;
  }
}
```

The class statement wraps several elements that we can break down:

- `Member`: The `User` class contains the `firstName` , `lastName`, and `#isActive` members. Class
  members will only be accessible from within the class itself. Instances of the `User` class
  will have access only to the _public_ properties `firstName` and `lastName`. The `#isActive`
  property will not be available because it is _private_, as denoted by the `#` character in front
  of the property name.

- `Constructor`: The `constructor` is executed when we create an instance of the class. It
  is usually used to initialize the class members inside it with the parameters provided in
  the signature. We can also provide default values for parameters such as the `isActive`
  parameter.

- `Method`: A method represents a function and may return a value, such as the `getFullname`
  method, which constructs the full name of a user. It can also be defined as _private_, similar
  to class members.

- `Property accessor`: A property accessor is defined by prefixing a method with the `set`
  keyword to make it _writable_ and the `get` keyword to make it _readable_, followed by the
  property name we want to expose. The `active` method is a property accessor that returns
  the value of the `#isActive` member.

A class can also extend members and functionality of other classes. We can make a class inherit
from another by appending the `extends` keyword to the class definition followed by the class
we want to inherit:

```js
class Customer extends User {
  taxNumber = "";
  constructor(firstName, lastName) {
    super(firstName, lastName);
  }
}
```

In the preceding snippet, the `Customer` class extends the `User` class, which exposes `firstName`
and `lastName` properties. Any instance of the `Customer` class can use those properties by default.
We can also _override_ methods from the `User` class by appending a method with the same name.
The `constructor` is required to call the `super` method, which points to the `constructor` of the
`User` class.

## Modules

As our applications scale and grow, there will be a time when we need to organize our code better
and make it sustainable and reusable. Modules are a great way to accomplish these tasks, so let’s
look at how they work and how we can implement them in our application.

In the preceding section, we learned how to work with classes. Having both classes in the same
file is not scalable, and maintaining it won’t be easy. Imagine how much code you must process
to make a simple change in one of the classes. Modules allow us to separate our application code
into single files, enforcing the **Single Responsibility Pattern** (**SRP**). Each file is a different module
concerned with a specific feature or functionality.

_A good indication to split a module into multiple files is when the module starts to occupy different domains. For example, a products module cannot contain logic for customers._

Let’s refactor the code described in the previous section so that the `User` and `Customer` classes
belong to separate modules:

1. Open VSCode and create a new JavaScript file named `user.js`.

2. Enter the contents of the `User` class and add the `export` keyword in the class definition.
   The `export` keyword makes the module available to other modules and forms the public
   API of the module.

3. Create a new JavaScript file named `customer.js` and add the contents of the `Customer`
   class. The `Customer` class cannot recognize the `User` class because they are in different files.

4. Import the `User` class into the `customer.js` file by adding the following statement at the
   top of the file:
   `import { User } from './user';`
   We use the `import` keyword and the relative path of the module file without the extension
   to import the `User` class. If a module exports more than one artifact, we place them inside
   curly braces separated by a comma, such as:
   `import { User, UserPreferences } from './user';`

Exploring modules concludes our journey of the JavaScript essentials. In the following section,
we will learn about TypeScript and how it helps us build web applications.

## What is TypeScript?

Transforming small web applications into thick monolithic clients was impossible due to the
limitations of earlier JavaScript versions. In a nutshell, large-scale JavaScript applications suffered
from serious maintainability and scalability problems as soon as they grew in size and complexity.
This issue became more relevant as new libraries and modules required seamless integration into
our applications. The lack of proper mechanisms for interoperability led to cumbersome solutions.

To overcome those difficulties, Microsoft built a superset of the JavaScript language that would
help build enterprise applications with a lower error footprint using static type checking, better
tooling, and code analysis. TypeScript 1.0 was introduced in 2014. It ran ahead of JavaScript,
implemented the same features, and provided a stable environment for building large-scale applications.
It introduced optional static typing through type annotations, thereby ensuring type
checking at compile time and catching errors early in the development process. Its support for
declaration files also enabled developers to describe the interface of their modules so that other
developers could better integrate them into their code workflow and tooling.

The official TypeScript website can be reached at <https://www.typescriptlang.org>.
It contains extensive language documentation and a playground that gives us
access to a quick tutorial to get up to speed with the language in no time. It includes
some ready-made code examples that cover some of the most common traits of the
language.

As a superset of JavaScript, one of the main advantages of embracing TypeScript in your next
project is the low entry barrier. If you know JavaScript, you are pretty much all set since all the
additional features in TypeScript are optional. You can pick and introduce any of them to achieve
your goal. Overall, there is a long list of solid arguments for using TypeScript in your next project,
and all apply to Angular.

Here is a short rundown of some of the advantages:

- Annotating your code with types ensures the consistent integration of your different code
  units and improves code readability and comprehension.
- The built-in type-checker analyzes your code at compile time and helps you prevent errors
  before executing your code.
- The use of types ensures consistency across your application. Combined with the previous
  two, the overall code error footprint is minimized in the long run.
- Interfaces ensure the smooth and seamless integration of your libraries in other systems
  and code bases.
- Language support across different IDEs is amazing, and you can benefit from features
  such as highlighting code, real-time type checking, and automatic compilation at no cost.
- The syntax is familiar to developers from other OOP-based backgrounds, such as Java,
  C#, and C++.

## Types

Working with TypeScript or any other coding language means working with data, and this data
can represent different sorts of content, called **types**. Types are used to represent the fact that
data can be text, an integer value, or an array of these value types, among others.

_Types disappear during transpilation and are not included in the final JavaScript code._

You may have already encountered types in JavaScript since we have always worked implicitly
with them. In JavaScript, any given variable could assume (or return, in the case of functions)
any value. Sometimes, this leads to errors and exceptions in our code because of type collisions
between what our code returned and what we expected to return type-wise. However, statically
typing our variables gives our IDE and us a good picture of what kind of data we should find in
each code instance. It becomes an invaluable way to help debug our applications at compile time
before the code is executed.

### String

One of the most widely used primitive types is the `string` , which populates a variable with text:

```ts
const product: string = "Keyboard";
```

The type is defined by adding a colon and the type name next to the variable.

### Boolean

The `boolean` type defines a variable that can have a value of either `true` or `false`:

```ts
const isActive: boolean = true;
```

The result of a boolean variable represents the fulfillment of a conditional statement.

### Number

The `number` type is probably the other most widely used primitive data type, along with `string`
and `boolean`:

```ts
const price: number = 100;
```

We can use the `number` type to define a floating-point number and hexadecimal, decimal, binary,
and octal literals.

### Array

The **array** type defines a list of items that contain a certain type only. Handling exceptions that
arise from errors, such as assigning wrong member types in a list, can now be easily avoided with
this type. We can define arrays using the square bracket syntax or the `Array` keyword:

```ts
const categories: string[] = ["Computing", "Multimedia"];
const categories: Array<string> = ["Computing", "Multimedia"];
```

_Agreeing with your team on either syntax and sticking with it during application development is advisable._

If we try to add a new item to the `categories` array with a type other than `string`, TypeScript will
throw an error, ensuring our typed members remain consistent and that our code is error-free.

### any

In all preceding cases, typing is optional because TypeScript is smart enough to infer the data
types of variables from their values with a certain level of accuracy.

_Letting the typing system infer the types is very important, instead of typing it manually. The type system is never wrong, but the developer can be._

However, if it is not possible, the typing system will automatically assign the dynamic `any` type
to the loosely typed data at the cost of reducing type checking to a bare minimum. Additionally,
we can add the `any` type in our code manually when it is hard to infer the data type from the
information we have at any given point. The `any` type includes all the other existing types, so we
can type any data value with it and assign any value to it later:

```ts
let order: any;
function setOrderNo() {
  order = "0001";
}
```

TypeScript contains another type, similar to the `any` type, called `unknown`. A variable
of the `unknown` type can have a value of any type. The main difference is that Type-Script
will not let us apply arbitrary operations to `unknown` values, such as calling
a method, unless we perform type checking first.

However, with great power comes great responsibility. If we bypass the convenience of static type
checking, we open the door to type errors when piping data through our application. It is up to
us to ensure type safety throughout our application.

### Custom types

In TypeScript, you can come up with your own type if you need to by using the `type` keyword in
the following way:

```ts
type Categories = "computing" | "multimedia";
```

We can then create a variable of a specific type as follows:

```ts
const category: Categories = "computing";
```

The preceding code is perfectly valid as `computing` is one of the allowed values and works as
intended. Custom types are an excellent way to add types with a finite number of allowed values.

When we want to create a custom type from an object, we can use the `keyof` operator. The `keyof`
operator enables us to iterate over the properties of an object and extract them into a new type:

```ts
type Category = {
  computing: string;
  multimedia: string;
};

type CategoryType = keyof Category;
```

In the preceding snippet, the CategoryType produced the same result as the Categories type.

The typing system of TypeScript is mainly used to annotate JavaScript code with types. It improves
the developer experience by providing intelliSense and preventing bugs early in development. In
the following section, we will learn more about adding type annotations in functions.

## Functions

Functions in TypeScript are not that different from regular JavaScript, except that, like everything
else in TypeScript, they can be annotated with static types. Thus, they improve the compiler by
providing the information it expects in their signature and the data type it aims to return, if any.

The following example showcases how a regular function is annotated in TypeScript:

```ts
function getProduct(): string {
  return "Keyboard";
}
```

In the preceding snippet, we annotated the returned value of the function by adding the `string`
type to the function declaration. We can also add types in function parameters, such as:

```ts
function getFullname(firstName: string, lastName: string): string {
  return `${this.firstName} ${this.lastName}`;
}
```

In the preceding snippet, we annotated the parameters declared in the function signature, which
makes sense since the compiler will want to check whether the data provided holds the correct type.

_As mentioned in the previous section, the TypeScript compiler is smart enough to infer types when no annotation is provided. In both preceding functions, we could omit the type because the compiler could infer it from the arguments provided and the returned statements._

When a function does not return a type, we can annotate it using the `void` type:

```ts
function printFullname(firstName: string, lastName: string): void {
  console.log(`${this.firstName} ${this.lastName}`);
}
```

We have already learned how to use default and rest parameters in JavaScript functions. Type-Script
extends functions’ capabilities by introducing optional parameters. Parameters are defined
as optional by adding the character `?` after the parameter name:

```ts
function addtoCart(productId: number, quantity?: number) {
  const product = {
    id: productId,
    qty: quantity ?? 1,
  };
}
```

In the preceding function, we have defined `quantity` as an optional parameter. We have also used
the nullish coalescing syntax to set the `qty` property of the product object if quantity is not passed.

We can invoke the `addToCart` function by passing only the `productId` parameter or both.

_Optional parameters should be placed last in a function signature._

We have already learned how JavaScript classes can help us structure our application code. In the
following section, we will see how to use them in TypeScript to improve our application further.

## Classes

Consider the `User` class that we defined in the `user.js` file:

```js
export class User {
  firstName = "";
  lastName = "";
  #isActive = false;

  constructor(firstName, lastName, isActive = true) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.#isActive = isActive;
  }

  getFullname() {
    return `${this.firstName} ${this.lastName}`;
  }

  get active() {
    return this.#isActive;
  }
}
```

We will take simple, small steps to add types throughout the class:

1. Convert the file to TypeScript by renaming it `user.ts`.

2. Add the following types to all class properties:

   ```ts
   firstName: string = '';
   lastName: string = '';
   private isActive: boolean = false;
   ```

   In the preceding snippet, we also used the `private` modifier to define the `isActive`
   property as private.

3. Modify the `constructor` by adding types to parameters:

   ```ts
   constructor(firstName: string, lastName: string, isActive: boolean =
   true) {
   this.firstName = firstName;
   this.lastName = lastName;
   this.isActive = isActive;
   }
   ```

   Alternatively, we could omit class properties and have the `constructor`
   create them automatically by declaring parameters as `private`:

   ```ts
   constructor(private firstName: string, private lastName: string, private isActive: boolean = true) {}
   ```

4. Finally, add types in the `active` property accessor and the `getFullname` method:

   ```ts
   getFullname(): string {
   return `${this.firstName} ${this.lastName}`;
   }

   get active(): boolean {
   return this.isActive;
   }
   ```

Converting a JavaScript class into TypeScript and adding types is an important step toward taking
advantage of the typing feature in TypeScript.

Another great feature of TypeScript related to classes is the `instanceOf` keyword. It allows us to
check the class instance type and provides the correct properties according to the related class.
Let’s explore it with the `Customer` class defined in the `customer.js` file:

1. Convert the file to TypeScript by renaming it `customer.ts`.
2. Rewrite the `Customer` class as follows to add types:

   ```ts
   class Customer extends User {
     taxNumber: number;

     constructor(firstName: string, lastName: string) {
       super(firstName, lastName);
     }
   }
   ```

3. Create an object outside of the class that can be of both the `User` and `Customer` type:

   ```ts
   const account: User | Customer = undefined;
   ```

4. We can now use the `instanceOf` keyword to access different properties of the `account`
   object according to the underlying class:

   ```ts
   if (account instanceof Customer) {
     const taxNo = account.taxNumber;
   } else {
     const name = account.getFullname();
   }
   ```

   TypeScript is smart enough to understand that the `account` object in the `else` statement
   does not have a `taxNumber` property because it is of the `User` type. Even if we try to access
   it by mistake, VSCode will throw an error: `Property 'taxNumber'  does not exist on type 'User'`

TypeScript classes help us write well-structured code, can be instantiated, contain business logic,
and provide static typing in our application. As applications scale and more classes are created,
we need to find ways to ensure consistency and rule compliance in our code. As we will learn in
the following section, one of the best ways to address the consistency and validation of types is
to create **interfaces**.

## Interfaces

An interface is a code contract that defines a particular schema. Any artifacts like classes and
functions implementing an interface should comply with this schema. Interfaces are beneficial
when we want to enforce strict typing on classes generated by factories or when we define function
signatures to ensure that a particular typed property is found in the payload.

_Interfaces disappear during transpilation and are not included in the final JavaScript code._

In the following snippet, we define an interface for managing products:

```ts
interface Product {
  name: string;
  price: number;
  getCategories: () => string[];
}
```

_Interfaces are the recommended approach when working with data from a backend API or other source._

An interface can contain properties and methods. In the preceding snippet, the `Product` interface
contained the `name` and `price` properties. It also defined the `getCategories` method. A class can
use an interface by adding the `implements` keyword and the interface name in the class declaration:

```ts
class Keyboard implements Product {
  name: string = "Keyboard";
  price: number = 20;

  getCategories(): string[] {
    return ["Computing", "Peripherals"];
  }
}
```

In the preceding snippet, the `Keyboard` class must implement all members of the `Product` interface;
otherwise, TypeScript will throw an error. If we do not want to implement an interface member,
we can define it as optional using the `?` character:

```ts
interface Product {
  name: string;
  price: number;
  getCategories: () => string[];
  description?: string;
}
```

We can also use interfaces to change the type of a variable from one type to another, called
**type casting**. Type casting is useful when working with dynamic data or when TypeScript cannot
infer the type of a variable automatically. In the following code, we instruct TypeScript to treat
the `product` object as a `Product` type:

```ts
const product = {
  name: "Keyboard",
  price: 20,
} as Product;
```

However, type casting should be used with caution. In the preceding snippet, we intentionally
omitted to add the `getCategories` method, but TypeScript did not throw an error. When we use
type casting, we tell TypeScript that a variable pretends to be of a specific type.

_It is recommended to avoid type casting if possible and define types explicitly._

Interfaces can be combined with **generics** to provide a general code behavior regardless of the
data type, as we will learn in the following section.

## Generics

Generics are used when we want to use dynamic types in other TypeScript artifacts, such as
methods.

Suppose that we want to create a function for saving a `Product` object in the local storage of the
browser:

```ts
function save(data: Product) {
  localStorage.setItem("Product", JSON.stringify(data));
}
```

In the preceding code, we explicitly define the `data` parameter as a `Product`. If we also want to
save `Keyboard` objects, we should modify the save method as follows:

```ts
function save(data: Product | Keyboard) {
  localStorage.setItem("Product", JSON.stringify(data));
}
```

However, the preceding approach does not scale well if we would like to add other types in the
future. Instead, we can use generics to let the consumer of the `save` method decide upon the
data type passed:

```ts
function save<T>(data: T) {
  localStorage.setItem("Product", JSON.stringify(data));
}
```

In the preceding example, the type of `T` is not evaluated until we use the method. We use `T` as a
convention to define generics, but you can also use other letters. We can execute the `save` method
for a `Product` object as follows:

```ts
save<Product>({
  name: "Microphone",
  price: 45,
  getCategories: () => ["Peripherals", "Multimedia"],
});
```

As you can see, its type varies, depending on how you call it. It also ensures that you are passing
the correct type of data. Suppose that the preceding method is called in this way:

```ts
save<Product>("Microphone");
```

We specify that `T` should be a `Product`, but we insist on passing its value as a string. The compiler
clearly states that this is not correct. If we would like to use more generics in our `save` method,
we could use different letters, such as:

```ts
function save<T, P>(data: T, obj: P) {
  localStorage.setItem("Product", JSON.stringify(data));
}
```

Generics are often used in collections because they have similar behavior, regardless of the type.
They can, however, be used on other constructs, such as methods. The idea is that generics should
indicate if you are about to mix types in a way that isn’t allowed.

Generics are powerful to use if you have a typical behavior with many different data types. You
probably won’t be writing custom generics, at least not initially, but it’s good to know what is
going on.

In the following section, we’ll look at some utility types related to interfaces that will help us
during Angular development.

## Utility types

Utility types are types that help us to derive new types from existing ones.

The `Partial` type is used when we want to create an object from an interface where all its properties
are optional. In the following snippet, we use the `Product` interface to declare a trimmed
version of a product:

```ts
const mic: Partial<Product> = {
  name: "Microphone",
  price: 67,
};
```

In the preceding snippet, we can see that the `mic` object does not contain the `getCategories`
method. Alternatively, we could use the `Pick` type, which allows us to create an object from a
subset of interface properties:

```ts
type Microphone = Pick<Product, "name" | "price">;
const microphone: Microphone = {
  name: "Microphone",
  price: 67,
};
```

Some languages, such as C#, have a reserved type when defining a key-value pair object or dictionary,
as it is known. In TypeScript, if we want to define such a type, we can use a `Record` type:

```ts
interface Order {
  products: Record<string, number>;
}
```

The preceding snippet defines the product name as a `string` and the quantity as a `number`.

You can find more utility types at https://www.typescriptlang.org/docs/handbook/utility-types.html.

## Summary

This introduction to TypeScript was necessary to understand the logic
behind many of the most brilliant parts of Angular. It allowed us to introduce the language
syntax and explain the rationale behind its success as the syntax of choice for building the
Angular framework.

We reviewed the type architecture and how we can create advanced business logic when designing
functions with various alternatives for parameterized signatures. We even discovered how to
bypass scope-related issues using the powerful arrow functions. We enhanced our knowledge of
TypeScript by exploring some of the most common features used in Angular applications.

Probably the most relevant part encompassed our overview of classes, methods,
properties, and accessors and how we can handle inheritance and better application design
through interfaces.

With all this knowledge, we can start learning how to apply it by building Angular applications.
