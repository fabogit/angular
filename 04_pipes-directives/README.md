# Enriching Applications Using Pipes and Directives

In the previous chapter, we built several components that rendered data on the screen with the
help of input and output properties. We’ll leverage that knowledge in this chapter to take our
components to the next level using Angular **pipes** and **directives**. Pipes allow us to digest and
transform the information we bind in our templates. Directives enable more ambitious function-
alities, such as manipulating the DOM or altering the appearance and behavior of HTML elements.
In this chapter, we will learn about the following concepts:

- Manipulating data with pipes

- Building pipes

- Building directives

## Manipulating data with pipes

Pipes allow us to transform the outcome of our expressions at the view level. They take data as
input, transform it into the desired format, and display the output in the template.

The syntax of a pipe consists of the pipe name following the expression we want to transform,
separated by a pipe symbol (`|`):

```html
expression | pipe
```

Any parameters are added after the pipe name, and they are separated by colons:

```html
expression | pipe:param
```

Pipes can be used with interpolation and property binding in Angular templates and can be
chained to each other.
Angular has a wide range of built-in pipe types already baked into it:

- `uppercase`/`lowercase`: This transforms a string into uppercase or lowercase letters.

- `percent`: This formats a number as a percentage.

- `date`: This formats a date or a string in a particular date format. The default usage of the
  pipe displays the date according to the local settings of the user’s machine. However, we
  can pass additional formats Angular has already baked in as parameters.

- `currency`: This formats a number as a local currency. We can override local settings and
  change the currency symbol, passing the currency code as a parameter to the pipe.

- `json`: This takes an object as an input and outputs it in JSON format, replacing single quotes
  with double quotes. The main usage of the `json` pipe is debugging. It is an excellent way
  to see what a complex object contains and print it nicely on the screen.

- `keyvalue`: This converts an object into a collection of key-value pairs, where the `key` of
  each item represents the object’s property and the `value` is its actual value.

- `slice`: This subtracts a subset (slice) of a collection or string. It accepts as parameters a
  starting index, where it will begin slicing the input data, and, optionally, an end index.
  When the end index is specified, the item at that index is not included in the resulting
  array. If the end index is omitted, it falls back to the last index of the data.

  The `slice` pipe transforms immutable data. The transformed list is always
  a copy of the original data, even when it returns all items.

- `async`: This is used when we manage data handled asynchronously by our component
  class, and we need to ensure that our views promptly reflect the changes like when
  we use it to fetch and display data asynchronously.

We will cover the `lowercase`, `currency`, and `keyvalue` pipes in more detail, but we encourage
you to explore the rest in the API reference at <https://angular.dev/api>:

1. Open the `product-detail.component.ts` file and import the `CommonModule` class:

   ```ts
   import { CommonModule } from '@angular/common';
   import { Component, input, output } from '@angular/core';
   import { Product } from '../product';

   @Component({
    selector: 'app-product-detail',
    imports: [CommonModule],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css'
   })
   ```

   The `CommonModule` class exports the Angular built-in pipes. An Angular component must
   import `CommonModule` before using built-in pipes in the component template.

2. Open the `product.ts` file and add the following fields to the `Product` interface that
   describe additional properties for a product:

   ```ts
   export interface Product {
     id: number;
     title: string;
     price: number;
     categories: Record<number, string>;
   }
   ```

   The `categories` property is an object where the `key` represents the category ID, and the
   `value` represents the category description.

3. Open the `product-list.component.ts` file and modify the `products` array to set values
   for the new properties:

   ```ts
   products: Product[] = [
    {
        id: 1,
        title: 'Keyboard',
        price: 100,
        categories: {
            1: 'Computing',
            2: 'Peripherals'
        }
    },
    {
        id: 2,
        title: 'Microphone',
        price: 35,
        categories: { 3: 'Multimedia' }
    },
    {
        id: 3,
        title: 'Web camera',
        price: 79,
        categories: {
            1: 'Computing',
            3: 'Multimedia'
        }
    },
    {
        id: 4,
        title: 'Tablet',
        price: 500,
        categories: { 4: 'Entertainment' }
    }
   ];
   ```

4. Open the `product-detail.component.html` file and add a paragraph element to display
   the price of the selected product in euros:

   ```html
   @if (product()) {
    <p>
        You selected:
        <strong>{{product()!.title}}</strong>
    </p>
    <p>{{product()!.price | currency:'EUR'}}</p>
    <button (click)="addToCart()">Add to cart</button>
   }
   ```

5. Run `ng serve` to start the application and select the **Microphone** from the product list.
   The product price will be displayed in the currency format.

6. Add the following snippet below the product price to display the product categories:

   ```html
   <div class="pill-group">
     @for (cat of product()!.categories | keyvalue; track cat.key) {
        <p class="pill">{{cat.value | lowercase}}</p>
     }
   </div>
   ```

7. In the preceding snippet, we used the `@for` block to iterate over the `categories` property
   of the product variable. The `categories` property is not iterable because it is a plain object,
   so, we used the `keyvalue` pipe to convert it into an array that contains `key` and `value`
   properties. The `key` property represents the category ID, a unique identifier we can use
   with the `track` variable. The `value` property stores the category description.
   Additionally, we used the `lowercase` pipe to convert the category description to lowercase text.
   Add the following CSS styles to the `product-detail.component.css` file:

   ```css
   .pill-group {
     display: flex;
     flex-direction: row;
     align-items: start;
     flex-wrap: wrap;
     gap: 1.25rem;
   }

   .pill {
     display: flex;
     align-items: center;
     --pill-accent: var(--gray-900);
     background: color-mix(in srgb, var(--pill-accent) 5%, transparent);
     color: var(--pill-accent);
     padding-inline: 0.75rem;
     padding-block: 0.375rem;
     border-radius: 2.75rem;
     border: 0;
     transition: background 0.3s ease;
     font-family: var(--inter-font);
     font-size: 0.875rem;
     font-style: normal;
     font-weight: 500;
     line-height: 1.4rem;
     letter-spacing: -0.00875rem;
     text-decoration: none;
   }
   ```

8. While running the application, select the **Web camera** product from the list.

Alternative to using the `CommonModule`, we could have imported each pipe class separately from
the `@angular/common` npm package:

```ts
import { CurrencyPipe, KeyValuePipe, LowerCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Product } from '../product';

@Component({
selector: 'app-product-detail',
imports: [KeyValuePipe, CurrencyPipe, LowerCasePipe],
templateUrl: './product-detail.component.html',
styleUrl: './product-detail.component.css'
})
```

In the final `product-detail.component.html` file, we use the snippet `product()!` many times
to read the value of the `product` property. Alternatively, we could create an alias using the `@let`
syntax as follows:

```html
@let selectedProduct = product()!;
```

The `@let` keyword is similar to the `let` keyword in JavaScript and is used to declare variables
that are available only in the component template. In the preceding snippet, we declare the
`selectedProduct` variable, which can be used in the rest of the HTML code as follows:

```html
@if (selectedProduct) {
    <p>
        You selected:
        <strong>{{selectedProduct.title}}</strong>
    </p>
    <p>{{selectedProduct.price | currency:'EUR'}}</p>
    <div class="pill-group">
        @for (cat of selectedProduct.categories | keyvalue; track cat.key) {
            <p class="pill">{{cat.value | lowercase}}</p>
        }
    </div>
    <button (click)="addToCart()">Add to cart</button>
}
```

The `@let` keyword helps us in cases where we want to use complex expressions in templates
such as:

- Ternary operators

- Nested object properties

- The async pipe

Built-in pipes are sufficient for most use cases, but we must apply complex transformations to our
data in other cases. The Angular framework provides a mechanism to create uniquely customized
pipes, as we will see in the following section.

## Building pipes

We have already seen what pipes are and what their purpose is in the Angular ecosystem. Next,
we will dive deeper into how we can build a pipe to provide custom transformations to data
bindings. In the following section, we will create a pipe that sorts our list of products by title.

### Sorting data using pipes

To create a new pipe, we use the `ng generate` command of the Angular CLI, passing its name as a parameter:

```bash
ng generate pipe sort
```

The preceding command will generate all necessary files of the `sort` pipe inside the folder where
we run the `ng generate` command. The TypeScript class of the pipe is defined in the `sort.pipe.ts` file:

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort",
})
export class SortPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
```

The `@Pipe` is an Angular decorator that defines the name of the Angular pipe.
The TypeScript class of a pipe implements the transform method of the `PipeTransform` interface
and accepts two parameters:

- `value`: The input data that we want to transform

- `args`: An optional list of arguments we can provide to the `transformation` method, each
  separated by a colon

The Angular CLI helped us by scaffolding an empty `transform` method. We now need to modify
it to satisfy our business needs. The pipe will operate on a list of `Product` objects, so we need to
make the necessary adjustments to the types provided:

1. Add the following statement to import the `Product` interface:

   ```ts
   import { Product } from "./product";
   ```

2. Change the type of the value parameter to `Product[]` since we want to sort a list of
   `Product` objects.

3. Change the method type to `Product[]` since the sorted list will only contain `Product`
   objects, and modify it so that it returns an empty array by default.

The resulting `sort.pipe.ts` file should now look like the following:

```ts
import { Pipe, PipeTransform } from "@angular/core";
import { Product } from "./product";

@Pipe({
  name: "sort",
})
export class SortPipe implements PipeTransform {
  transform(value: Product[], ...args: unknown[]): Product[] {
    return [];
  }
}
```

We are now ready to implement the sorting algorithm of our method. We will use the native
`sort` method, which sorts items alphabetically by default. We will provide a custom comparator
function to the `sort` method that overrides the default functionality and performs the sorting
logic that we want to achieve:

```ts
transform(value: Product[], ...args: unknown[]): Product[] {
    if (value) {
        return value.sort((a: Product, b: Product) => {
            if (a.title < b.title) {
                return -1;
            } else if (b.title < a.title) {
                return 1;
            }
            return 0;
        });
    }
    return [];
}
```

It is worth noting that the `transform` method checks whether there is input data first before
proceeding to the sorting process. Otherwise, it returns an empty array. This mitigates cases
where the collection is set asynchronously, or the component that consumes the pipe does not
set the collection at all.
For more information about the sort method, refer to <https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort>.

That’s it! We have successfully created our first pipe. We need to call it from our component
template to see it in action:

1. Open the `product-list.component.ts` file and import the `SortPipe` class:

   ```ts
   import { Component } from '@angular/core';
   import { Product } from '../product';
   import { ProductDetailComponent } from '../product-detail/product-detail.component';
   import { SortPipe } from '../sort.pipe';

   @Component({
    selector: 'app-product-list',
    imports: [ProductDetailComponent, SortPipe],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.css'
   })

   ```

2. Open the `product-list.component.html` file and add the pipe in the `@for` block:

   ```html
   <ul class="pill-group">
     @for (product of products | sort; track product.id) {
        <li class="pill" (click)="selectedProduct = product">
            @switch (product.title) {
                @case ('Keyboard') { ⌨️ }
                @case ('Microphone') { 🎙️ }
                @default { 🏷️ }
            } {{product.title}}
        </li>
        } @empty {
            <p>No products found!</p>
        }
   </ul>
   ```

3. If we run the application using the `ng serve` command, we will notice that the product
   list is now sorted by title alphabetically.

The sort pipe can sort product data only by `title`. In the following section, we will learn how to
configure the pipe so that it can sort by other product properties as well.

### Passing parameters to pipes

As we learned we can pass additional parameters to a pipe using colons.
We use the `args` parameter in the `transform` method of a pipe to get the
value of each parameter separated by a colon. We learned that the Angular CLI creates the `args`
parameter by default and uses the spread operator to expand its values in the method:

```ts
transform(value: Product[], ...args: unknown[]): Product[] {
    if (value) {
        return value.sort((a: Product, b: Product) => {
            if (a.title < b.title) {
            return -1;
            } else if (b.title < a.title) {
            return 1;
            }
        });
        return 0;
        }
    return [];
}
```

The `transform` method can currently work only with the `title` property of a product. We could
leverage the `args` parameter to make it dynamic and allow the consumer of the pipe to define
the property they want to sort data, such as the product price:

1. Remove the spread operator from the `args` parameter because we will pass a single property
   of a product each time and change its type, as follows:

   ```ts
   transform(value: Product[], args: keyof Product): Product[] {
    if (value) {
        return value.sort((a: Product, b: Product) => {
            if (a.title < b.title) {
                return -1;
            } else if (b.title < a.title) {
                return 1;
            }
        });
        return 0;
    }
    return [];
   }
   ```

   In the preceding method, we use the `keyof` type operator from TypeScript to define that
   the `args` parameter can be any property of a `Product` object.

2. Replace the `title` property with the args parameter inside the `if` statement:

   ```ts
    if (value) {
      return value.sort((a: Product, b: Product) => {
        if (a[args] < b[args]) {
          return -1;
        } else if (b[args] < a[args]) {
          return 1;
        }
        return 0;
      });
    }
   ```

   Notice that in the preceding snippet, we access the `a` and `b` objects using square bracket
   syntax instead of the dot syntax as before.

3. Modify the `args` parameter in the method signature so that it uses the `title` property by
   default, if the consumer does not pass any parameter in the pipe:

   ```ts
   transform(value: Product[], args: keyof Product = 'title')
   ```

   The preceding behavior ensures that the product list component will work without any
   change to the pipe usage.

4. Run the `ng serve` command and verify that the product list is sorted initially by title.

5. Open the `product-list.component.html` file and pass the `price` property as a pipe parameter:

   ```html
   @for (product of products | sort:'price'; track product.id) {
    <li class="pill" (click)="selectedProduct = product">
        @switch (product.title) {
            @case ('Keyboard') { ⌨️ }
            @case ('Microphone') { 🎙️ }
            @default { 🏷️ }
        } {{product.title}}
    </li>
   }
   ```

6. Save the file and wait for the application to reload. You should see that the product list
   is now sorted by price.

The `@Pipe` decorator contains another significant property that we can set, which is directly related
to the way that pipes react in the change detection mechanism of the Angular framework.

## Change detection with pipes

There are two categories of pipes: **pure** and **impure**. All pipes are considered pure by default unless
we set the pure property explicitly to false in the `@Pipe` decorator:

```ts
@Pipe({
   name: 'sort',
   pure: false
   })
```

Angular executes pure pipes when there is a change to the reference of the input variable. For
example, if the `products` array in the `ProductListComponent` class is assigned to a new value,
the pipe will correctly reflect that change. However, if we add a new product to the array using
the native `Array.push` method, the pipe will not be triggered because the object reference of the
array does not change.

Another example is when we have created a pure pipe that operates on a single object. Similarly, if
the reference of the value changes, the pipe executes correctly. If a property of the object changes,
the pipe cannot detect the change.

A word of caution, however—impure pipes call the `transform` method every time the change
detection cycle is triggered. So, this might not be good for performance. Alternatively, you could
leave the `pure` property unset and try to cache the value or work with reducers and immutable
data to solve this in a better way, like the following:

```ts
this.products = [
  ...this.products,
  {
    id: 5,
    title: "Headphones",
    price: 55,
    categories: { 3: "Multimedia" },
  },
];
```

In the preceding snippet, we used the spread parameter syntax to create a new reference of the
`products` array by appending a new item to the reference of the existing array.

Alternatively to a pure pipe, we can use a **computed signal**, which is more effective and ergonomic
due to the following reasons:

- We can access the value of the signal in the component class, as opposed to pipes, where
  their values can be read only in the template

- A computed signal is a simple plain function so we do not need to use a TypeScript class
  as in pipes

Creating custom pipes allows us to transform our data in a particular way according to our needs.
We must create custom directives if we also want to transform template elements.

## Building directives

Angular directives are HTML attributes that extend the behavior or the appearance of a standard
HTML element. When we apply a directive to an HTML element or even an Angular component,
we can add custom behavior or alter its appearance. There are three types of directives:

- **Components**: Components are directives that contain an associated HTML template.

- **Structural directives**: These add or remove elements from the DOM.

- **Attribute directives**: These modify the appearance of a DOM element or define a custom
  behavior.

If a directive has a template attached, then it becomes a component. In other words, components
are Angular directives with a view. This rule is handy when deciding whether to create a
component or a directive for your needs. If you need a template, create a component; otherwise,
make it a directive.

Custom directives allow us to attach advanced behaviors to elements in the DOM or modify their
appearance. In the following sections, we will explore how to create attribute directives.

## Displaying dynamic data

Attribute directives are commonly used to alter the appearance of an HTML element. We have all
probably found ourselves in a situation where we want to add copyrighted information to our
applications. Ideally, we want to use this information in various parts of our application, on a
dashboard or a contact page. The content of the information should also be dynamic. The year
or range of years (it depends on how you want to use it) should update dynamically according to
the current date. Our first intention is likely to be to create a component, but what about making
it a directive instead? This way, we could attach the directive to any element we want and not
bother with a particular template. So, let’s begin!

We will use the `ng generate` command of the Angular CLI, passing the name of the directive
a parameter:

```bash
ng generate directive copyright
```

The preceding command will generate all the necessary files of the copyright directive inside the
folder where we run the `ng generate` command. The TypeScript class of the directive is defined
in the `copyright.directive.ts` file:

```ts
import { Directive } from "@angular/core";

@Directive({
  selector: "[appCopyright]",
})
export class CopyrightDirective {
  constructor() {}
}
```

The `@Directive` is an Angular decorator that defines the properties of the Angular directive. It
configures a TypeScript class as an Angular directive using the `selector` property. It is a CSS
selector that instructs Angular to load the directive in the location that finds the corresponding
attribute in an HTML template. The Angular CLI adds the `app` prefix by default, but you can customize
it using the `--prefix` option when creating the Angular project.

When we use the selector in an HTML template, we do not add the square brackets.

Let’s use the newly created directive to add copyright information to our application:

1. Open the `styles.css` file and add the following CSS styles:

   ```css
   .copyright {
     font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
       Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
     width: 100%;
     min-height: 100%;
     display: flex;
     justify-content: center;
     align-items: center;
     padding: 1rem;
     box-sizing: inherit;
     position: relative;
   }
   ```

   In the preceding snippet, we added the CSS styles for our copyright directive in the global
   CSS stylesheet. Directives do not have an accompanying CSS file that we can use, such
   as components.

2. Open the `copyright.directive.ts` file and import the `ElementRef` class from the
   `@angular/core` npm package:

   ```ts
   import { Directive, ElementRef } from "@angular/core";
   ```

3. Modify the `constructor` of the directive as follows:

   ```ts
   constructor(el: ElementRef) {
    const currentYear = new Date().getFullYear();
    const targetEl: HTMLElement = el.nativeElement;
    targetEl.classList.add('copyright');
    targetEl.textContent = `Copyright ©${currentYear} All Rights Reserved`;
   }
   ```

   In the preceding snippet, we used the `ElementRef` class to access and manipulate the
   underlying HTML element attached to the directive. The `nativeElement` property contains
   the actual native HTML element. We also add the `copyright` class using the `add` method
   of the `classList` property. Finally, we change the text of the element by modifying the `textContent` property.

   The `ElementRef` is a built-in Angular service. To use a service in a component
   or a directive, we need to inject it into the `constructor`.

4. Open the `app.component.ts` file and import the `CopyrightDirective` class:

   ```ts
   import { Component } from '@angular/core';
   import { RouterOutlet } from '@angular/router';
   import { ProductListComponent } from './product-list/product-list.component';
   import { CopyrightDirective } from './copyright.directive';

   @Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        ProductListComponent,
        CopyrightDirective
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
   })
   ```

5. Open the `app.component.html` file and add a `<footer>` element to display copyright
   information:

   ```html
   <main class="main">
     <div class="content">
       <app-product-list></app-product-list>
     </div>
   </main>
   <footer appCopyright></footer>
   <router-outlet />
   ```

6. Run the application using the `ng serve` command and observe the application output.

When creating directives, it is important to consider reusable functionality that doesn’t necessarily
relate to a particular feature. The topic we looked at was copyrighted information, but we could
build other functionalities, such as tooltips and collapsible or infinite scrolling features, with
relative ease. In the following section, we will build another attribute directive that explores the
options available further.

## Property binding and responding to events

Attribute directives are also concerned with the behavior of an HTML element. They can extend the
functionality of the element and add new features. The Angular framework provides two helpful
decorators that we can use in our directives to enhance the functionality of an HTML element:

- `@HostBinding`: This binds a value to the property of the native host element.

- `@HostListener`: This binds to an event of the native host element.

The native host element is the element where our directive takes action.

The native `<input>` HTML element can support different input types, including simple text, radio
buttons, and numeric values. When we use the latter, the input adds two arrows inline, up and
down, to control its value. It is this feature of the input element that makes it look incomplete. If
we type a non-numeric character, the input still renders it.

We will create an attribute directive that rejects non-numeric values entered by the keyboard:

1. Run the following Angular CLI command to create a new directive named `numeric`:

   ```bash
   ng generate directive numeric
   ```

2. Open the `numeric.directive.ts` file and import the two decorators that we are going
   to use:

   ```ts
   import { Directive, HostBinding, HostListener } from "@angular/core";
   ```

3. Define a `currentClass` property using the `@HostBinding` decorator that will be bound to
   the `class` property of the `<input>` element:

   ```ts
    @HostBinding('class') currentClass = '';
   ```

4. Define an `onKeyPress` method using the `@HostListener` decorator that will be bound to
   the `keypress` native event of the `<input>` element:

   ```ts
   @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        this.currentClass = 'invalid';
        event.preventDefault();
    } else {
        this.currentClass = 'valid';
    }
   }
   ```

5. Open the `styles.css` file and add the following CSS styles that will be applied when a
   component uses the directive:

   ```css
    input.valid {
        border: solid green;
    }

    input.invalid {
        border: solid red;
    }
   ```

The `onKeyPress` method contains the logic of how our directive works under the hood.

When the user presses a key inside an `<input>` element, Angular knows to call the `onKeyPress`
method because we have registered it with the `@HostListener` decorator. The `@HostListener`
decorator accepts the event name and a list of arguments as parameters. In our case, we pass the
`keypress` event name and the `$event` argument, respectively. The `$event` is the current object
that triggered the event, which is of the `KeyboardEvent` type and contains the keystrokes entered
by the user.

Every time the user presses a key, we extract it from the `$event` object, convert it into a Unicode
character using the `charCodeAt` method, and check it against a non-numeric code. If the character
is non-numeric, we call the `preventDefault` method of the `$event` object to cancel the user action
and roll back the `<input>` element to its previous state. At the same time, we set the respective
class to `valid` if the key is numeric and `invalid` if it is not.

We can apply the directive in an `<input>` tag as follows:

```html
<input appNumeric />
```

In the meantime, if you want to try it yourself, remember to import the
`NumericDirective` class in your component before using it.

## Summary

Now that we have reached this point, it is fair to say that you have met almost every Angular
artifact for building Angular components, which are indeed the wheels and the engine of all
Angular applications. Next we will see how we can design our application
architecture better, manage dependency injection throughout our component tree, consume
data services, and leverage the new Angular router to show and hide components when required.
