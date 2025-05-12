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
