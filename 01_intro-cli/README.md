# Setting up the Angular CLI workspace

Setting up a project with Angular can be tricky. You need to know what libraries to import and
ensure that files are processed in the correct order, which leads us to the topic of scaffolding.
Scaffolding is a tool to automate tasks, such as generating a project from scratch, and it becomes
necessary as complexity grows and where every hour counts toward producing business value,
rather than being spent fighting configuration problems.

The primary motivation behind creating the Angular CLI was to help developers focus on application
building, eliminating the configuration boilerplate. Essentially, with a simple command,
you should be able to initialize an application, add new artifacts, run tests, update applications,
and create a production-grade bundle. The Angular CLI supports all of this using special com-
mands called schematics.

## CLI commands

The Angular CLI is a command-line interface tool that automates specific tasks during development,
such as serving, building, bundling, updating, and testing an Angular project. As the name
implies, it uses the command line to invoke the `ng` executable file and run commands using the
following syntax:
`ng [command] [options]`

Here, `[command]` is the name of the command to be executed, and `[options]` denotes additional
parameters that can be passed to each command. To view all available commands, you can run
the following:
`ng help`

Some commands can be invoked using an alias instead of the name, the
most common ones (the alias of each command is shown inside parentheses):

- `new` (n): Creates a new Angular CLI workspace from scratch

- `build` (b): Compiles an Angular application and outputs generated files in a predefined
  folder

- `generate` (g): Creates new files that comprise an Angular application

- `serve` (dev): Builds an Angular application and serves it using a pre-configured web server

- `test` (t): Runs the unit tests of an Angular application

- `add`: Installs an Angular library in an Angular application

- `update`: Updates an Angular application to the latest Angular version
  You can find more Angular CLI commands at <https://angular.dev/cli>.

Updating an Angular application is one of the most critical tasks from the preceding list. It helps
us stay up to date by upgrading our Angular applications to the latest version.

Additionally, you can use the Angular upgrade guide, which contains tips and step-by-step
instructions on updating your applications, at <https://angular.dev/update-guide>.

Open a terminal window, navigate to a folder of your choice, and run the command
`ng new my-app`. Creating a new Angular application is a straightforward process. The Angular
CLI will ask for details about the application we want to create so that it can scaffold the
Angular project as best as possible.

The process may take some time, depending on your internet connection. During this time, the
Angular CLI downloads and installs all necessary packages and creates default files for your Angular
application. When finished, it will have created a folder called `my-app` . The folder represents an
Angular CLI workspace that contains a single Angular application called `my-app` at the root level.

The workspace contains various folders and configuration files that the Angular CLI needs to
build and test the Angular application:

- `.vscode`: Includes VSCode configuration files

- `node_modules`: Includes installed `npm` packages that are needed to develop and run the
  Angular application

- `public`: Contains static assets such as fonts, images, and icons

- `src`: Contains the source files of the application

- `.editorconfig`: Defines coding styles for the default editor

- `.gitignore`: Specifies the files and folders that Git should not track

- `angular.json`: The main configuration file of the Angular CLI workspace

- `package.json` and `package-lock.json`: Provide definitions of `npm` packages, along with
  their exact versions, which are needed to develop, test, and run the Angular application

- `README.md`: A README file that is automatically generated from the Angular CLI

- `tsconfig.app.json`: A TypeScript configuration that is specific to the Angular application

- `tsconfig.json`: A TypeScript configuration that is specific to the Angular CLI workspace

- `tsconfig.spec.json`: A TypeScript configuration that is specific to unit tests of the An-
  gular application

Navigate to the newly created folder and start your application with the following command:
`ng serve`

Remember that any Angular CLI command must be run inside an Angular CLI workspace folder.

The Angular CLI compiles the Angular project and starts a web server that watches for changes
in project files. This way, whenever you change your application code, the web server rebuilds
the project to reflect the new changes.

After compilation has been completed successfully, you can preview the application by opening
your browser and navigating to <http://localhost:4200>

## The structure of an Angular application

The Angular CLI has already scaffolded our project and done much of the heavy lifting for us.

When we develop an Angular application, we’ll likely interact with the `src` folder. It is where we
write the code and tests of our application. It contains the following:

- `app`: All the Angular-related files of the application. You interact with this folder most of
  the time during development.

- `index.html`: The main HTML page of the Angular application.

- `main.ts`: The main entry point of the Angular application.

- `styles.css`: CSS styles that apply globally to the Angular application. The extension
  of this file depends on the stylesheet format you choose when creating the application.

The `app` folder contains the actual source code we write for our application. Developers spend
most of their time inside that folder. The Angular application that was created automatically
from the Angular CLI contains the following files:

- `app.component.css`: Contains CSS styles specific to the sample page. The extension of this
  file depends on the stylesheet format you choose when creating the application.

- `app.component.html`: Contains the HTML content of the sample page.

- `app.component.spec.ts`: Contains unit tests for the sample page.

- `app.component.ts`: Defines the _presentational logic_ of the sample page.

- `app.config.ts`: Defines the configuration of the Angular application.

- `app.routes.ts`: Defines the routing configuration of the Angular application.

### Components

The files whose names start with `app.component` constitute an **Angular component**. A component
in Angular controls part of a web page by orchestrating the interaction of the presentational logic
with the HTML content of the page, called a **template**.

Each Angular application has a main HTML file, named `index.html`, that exists inside the `src`
folder and contains the following `<body>` HTML element:

```html
<body>
  <app-root></app-root>
</body>
```

The `<app-root>` tag is used to identify the main component of the application and acts as a
container to display its HTML content. It instructs Angular to render the template of the main
component inside that tag.

When the Angular CLI builds an Angular application, it parses the `index.html` file and identifies
HTML tags inside the `<body>` element. An Angular application is always rendered inside the
`<body>` element and comprises a tree of components. When the Angular CLI finds a tag that is
not a known HTML element, such as `<app-root>`, it starts searching through the components of
the application tree. But how does it know where to start?

### Bootstrapping

The startup method of an Angular application is called **bootstrapping**, and it is defined in the
`main.ts` file inside the `src` folder:

```ts
import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, appConfig).catch((err) => {
  console.error(err);
});
```

The main task of the bootstrapping file is to define the component that will be loaded at application
startup. It calls the `bootstrapApplication` method, passing `AppComponent` as a parameter
to specify the starting component of the application. It also passes the `appConfig` object as a
second parameter to specify the configuration that will be used in the application startup. The
application configuration is described in the `app.config.ts` file:

```ts
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
```

The `appConfig` object contains a `providers` property to define services provided throughout the
Angular application.

A new Angular CLI application provides routing services by default. Routing is related to in-app
navigation between different components using the browser URL. It is activated using the
`provideRouter` method, passing a `routes` object, called **route configuration**, as a parameter. The
route configuration of the application is defined in the `app.routes.ts` file:

```ts
import { Routes } from "@angular/router";

export const routes: Routes = [];
```

Our application does not have a route configuration yet, as indicated by the empty `routes` array

### Template syntax

Open the app.component.html file and go to line 228:

```html
<h1>Hello, {{ title }}</h1>
```

The title property is surrounded by double curly braces syntax called interpolation,
which is part of the Angular template syntax. In a nutshell, interpolation converts the
value of the title property to text and prints it on the page.
Angular uses specific template syntax to extend and enrich the standard HTML syntax
in the application template.

## Angular tooling

One of the reasons that the Angular framework is popular among developers is the rich ecosystem
of available tools. The Angular community has built amazing tools to complete and automate
various tasks, such as debugging, inspecting, and authoring Angular applications:

- Angular DevTools

- VSCode Debugger

- VSCode Profiles

We will learn how to use each in the following sections, starting with Angular DevTools.

### Angular DevTools

Angular DevTools is a browser extension created and maintained by the Angular team. It allows
us to inspect and profile Angular applications directly in the browser. It is currently supported by
Google Chrome and Mozilla Firefox and can be downloaded from the following browser stores:

- Google Chrome: <https://chrome.google.com/webstore/detail/angular-developer-tools/ienfalfjdbdpebioblfackkekamfmbnh>

- Mozilla Firefox: <https://addons.mozilla.org/firefox/addon/angular-devtools>

To open the extension, open the browser developer tools and select the Angular tab. It contains
three additional tabs:

- **Components**: Displays the component tree of the Angular application

- **Profiler**: Allows us to profile and inspect the Angular application

- **Injector Tree**: Displays the services provided by the Angular application

Here we will explore how to use the **Components** tab.

The **Components** tab allows us to preview the components and directives of an Angular application
and interact with them. If we select a component from the tree representation, we can view
its properties and metadata.

From the **Components** tab, we can also look up the respective HTML element in the DOM or
navigate to the actual source code of the component or directive. Clicking the `< >` button will
take us to the TypeScript file of the current component.

Double-clicking a selector from the tree representation of the **Components** tab will navigate us
to the DOM of the main page and highlight the individual HTML element.

Finally, one of the most useful features of the component tree is that we can alter the value of a
component property and inspect how the component template behaves.

### VSCode Debugger

We can debug an Angular application using standard debugging techniques for web applications
or the tooling that VSCode provides out of the box.

The `console` object is the most commonly used web API for debugging. It is a very fast way to
print data and inspect values in the browser console. To inspect the value of an object in an
Angular component, we can use the `debug` or `log` method, passing the object we want to inspect as
a parameter. However, it is considered an old-fashioned approach, and a codebase with many
`console.log` methods is difficult to read. An alternate way is to use **breakpoints** inside the source
code using the VSCode debug menu.

VSCode is an open-source code editor backed by Microsoft. It is very popular in
the Angular community, primarily because of its robust support for TypeScript.
TypeScript has been, to a great extent, a project driven by Microsoft, so it makes
sense that one of its popular editors was conceived with built-in support for this
language. It contains a rich collection of useful features, including syntax, error
highlighting, automatic builds, and debugging.

VSCode contains a built-in debugging tool that uses breakpoints to debug Angular applications.
We can add breakpoints inside the source code from VSCode and inspect the state of an Angular
application. When an Angular application runs and hits a breakpoint, it will pause and wait. During
that time, we can investigate and inspect several values involved in the current execution context.
Let’s see how to add breakpoints to our sample application:

1. Open the `app.component.ts` file and click on the left of line `11` to add a breakpoint. A red
   dot denotes breakpoints.

2. Click on the **Run and Debug** button in the left sidebar of VSCode.

3. Click on the play button to start the application using the `ng serve` command.

VSCode will build our application, open the default web browser, and hit the breakpoint
inside the editor.

We can now inspect various aspects of our component and use the buttons in the debugger
toolbar to control the debugging session.

Another powerful feature of VSCode is **VSCode Profiles**, which help developers customize VSCode
according to their development needs.

### VSCode Profiles

VSCode Profiles allows us to customize the following aspects of the VSCode editor:

- **Settings**: The configuration settings of VSCode

- **Keyboard** shortcuts: Shortcuts to execute VSCode commands with the keyboard

- **Snippets**: Reusable template code snippets

- **Tasks**: Tasks that automate the execution of scripts and tools directly from VSCode

- **Extensions**: Tools that enable us to add new capabilities in VSCode, such as languages,
  debuggers, and linters

Profiles can also be shared, which helps us maintain a consistent development setup and workflow
across our team. VSCode contains a set of built-in profiles, including one for Angular, that
we can further customize according to our development needs. To install the Angular profile:

1. Click the **Manage** button represented by the gear icon at the bottom of the left sidebar in
   VSCode and select the **Profiles** option.

2. Click on the arrow of the **New Profile** button and select the **From Template | Angular**
   option.

3. Click the gear button if you want to select a custom icon for your profile.

4. Click the **Create** button to create your profile.

VSCode will automatically apply the new profile after it has been created successfully.

In the following sections, we will explore some of the extensions in the VSCode Angular profile.

### Angular Language Service

The **Angular Language Service** extension is developed and maintained by the Angular team and
provides code completion, navigation, and error detection inside Angular templates. It enriches
VSCode with the following features:

- Code completion

- A go-to definition

- Quick info

- Diagnostic messages

To get a glimpse of its powerful capabilities, let’s look at the code completion feature. Suppose
we want to display a new property called `description` in the template of the main component.
We can set this up by going through the following steps:

1. Define the new property in the app.component.ts file:

   ```ts
   export class AppComponent {
     title = "my-app";
     description = "Hello World";
   }
   ```

2. Open the `app.component.html` file and add the property name in the template using
   Angular interpolation syntax. The Angular Language Service will find it and suggest it
   for us automatically.

The `description` property is a _public_ property. We can omit the keyword `public` when using public
properties and methods. Code completion does not work for private properties and methods. If
the property had been declared `private`, then the Angular Language Service and the template
would not have been able to recognize it.

You may have noticed that a red line appeared instantly underneath the HTML element as you
typed. The Angular Language Service did not recognize the property until you typed it correctly
and gave you a proper indication of this lack of recognition. If you hover over the red indication,
it displays a complete information message about what went wrong.

The preceding information message comes from the diagnostic messages feature. The Angular
Language Service supports various messages according to the use case. You will encounter more
of these messages as you work more with Angular.

### Material Icon Theme

VSCode has a built-in set of icons to display different types of files in a project. The Material Icon
Theme extension provides additional icons that conform to the Material Design guidelines by
Google; a subset of this collection targets Angular-based artifacts.

Using this extension, you can easily spot the type of Angular files in a project, such as components,
and increase developer productivity, especially in large projects with many files.

### EditorConfig

VSCode editor settings, such as indentation or spacing, can be set at a user or project level. Edi-
torConfig can override these settings using the `.editorconfig` configuration file, which can be
found in the root folder of an Angular CLI project:

```.editorconfig
# Editor configuration, see https://editorconfig.org
root = true
[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
25
[*.ts]
quote_type = single
ij_typescript_use_double_quotes = false
[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

You can define unique settings in this file to ensure the consistency of the coding style across
your team.
