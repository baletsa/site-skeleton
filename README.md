#A Basic Front-End Starting Point

This repository is a skeleton application that I can use as a starting point for building websites and landing pages. 

It also gives me something interesting to tweak and improve with new stuff. 

## Dependencies
* [Node JS](http://nodejs.org/)
* [Gulp](http://gulpjs.com/)

## Installation
Once you have installed the above dependencies:

1. Clone this repository into your development folder
2. `cd` into the root of the new project folder and run `npm install` from the command line

## Running
From the root of the project, several commands can be issued from terminal:

1. `gulp`: Runs the default Gulp task. This builds the project with source maps from the `app` folder into the `build` folder, spawns a Node server, opens a new browser with the website at http://localhost:3000, and listens for subsequent changes. When you edit and save a new file, Gulp will recompile accordingly and refresh your browser window with the latest changes automatically.
2. `gulp dev`: Runs the above Gulp task without spawning a server.
3. `gulp build`: Builds project from the `app` folder into the `build`, uglifies the JS, and minifies the CSS. This should generally be run prior to committing/pushing your code to the repo.
4. `gulp dist`: Runs the above task and spawns a localhost server. This is useful if you want to proof the production build before pushing it to a remote server.

## Project Architecture
#### Folder Structure

* `app/`: _All_ work should be done in the `app` folder. This is where your website's source code lives.
* `release/`: When running Gulp, files from `app` are compiled into `release`. If you work out of the `release` folder, your work will be overwritten and you will be sad. Don't work out of the `release` folder.
* `gulp/`: This contains all of the Gulp tasks that the project relies on. There is also a `config.js` file that most of the tasks reference to make file paths and preferences more manageable.
* `node_modules/`: The folder where node modules are installed when you run `npm install`.
* `.jshintrc`: The configuration file that dictates syntactical rules for JS linting. These should be followed closely.
* `.jsbeautifyrc`: The configuration file that can be used with Sublime Text's [HTML-CSS-JS Prettify](https://packagecontrol.io/packages/HTML-CSS-JS%20Prettify) and Atom's [atom-beautify](https://atom.io/packages/atom-beautify) plugins.  Allows you to format your HTML, CSS, JavaScript, and JSON code. These plugins look for a `.jsbeautifyrc` file in the same directory as the source file you're prettifying (or any directory above if it doesn't exist, or in your home folder if everything else fails) and uses those options along the default ones.
* `.scss-lint.yml`: The configuration file for "linting" Sass/SCSS files.  Not currently enforced during build-time, but can be used with Sublime Text's [SublimeLinter](http://sublimelinter.readthedocs.org/en/latest/) plugin along with [Sublime​Linter-contrib-scss-lint](https://packagecontrol.io/packages/SublimeLinter-contrib-scss-lint), or Atom's [atom-lint](https://atom.io/packages/atom-lint) and [linter-scss-lint](https://atom.io/packages/linter-scss-lint) (among others).
* `gulpfile.js`: This references all of the tasks in `gulp/tasks/`. Tasks are broken apart for organizational purposes and referenced from this root file when you run `gulp`.
* `package.json`: Contains the project's Node dependencies. Modules specified in this files are installed into `node_modules` when you run `npm install`.
* `README.md`: You're reading it.

## Usage
#### Writing HTML
Your HTML lives in the `app` folder, and can contain references to reusable includes (which live in `app/includes/`). For example:

    //= include includes/core/head.html

This allows you to write a piece of code once and reuse it in multiple places. When Gulp runs, it takes these includes and compiles the full HTML into the `build` folder.

_Note: The paths in which these includes are referenced are relative to the HTML file you are authoring. If you include an include from another include, that path will need to be prefixed with `../` accordingly._

#### Writing Sass
##### Sass Structure
Your styles live in the `app/styles/sass` folder. This project uses [Autoprefixer](https://github.com/postcss/autoprefixer) to add vendor prefixes necessary for browser support to your styles automatically when processed. 

#### Writing JS
##### JS Structure
Init comes with a JS module loading system. This is how the JS folder is structured:

* `libs/`: This is where your vendor libraries and plugins live if a NPM package has not been made for the required vendor code. Use this directory as a last resort. Otherwise, libraries and plugins are found in the `node_modules` directory. 
* `modules/`: This is where your JS modules live.
* `modules/index.js`: This is the "module registry". It is essentially an object that contains a key/value for each module in the project.
* `app.js`: This is your application bootstrap. All JS kicks off from here.

##### Create A New Module Using The JS Module Loader

You can quickly generate a new module right from the command line. Run `gulp create-module --name=moduleName`, where _moduleName_ is the name of your new module. Be sure to keep it camelCase. Running this command will generate a new module folder as well as add a _require_ reference to the module registry file. If you use this CLI method instead of manually creating modules, you shouldn't ever have to touch the module registry file.

You can also pass an _async_ flag to the command. For example `gulp create-module --name=moduleName --async`. This will tell Webpack to bundle this file separately from the rest of the application and will asynchronously load this module in only when the module is referenced on the page.

When you generate a new module, it will have two files; the _.load_ file and the _.main_ file. You don't need to touch the _.main_ file. This simply tells Webpack how to require the module in the build (depending on whether you specified it to be asynchronous or not).

The _.main_ file is where you write your code. It exports an ES6 class:

```js
'use strict';

var $ = require('jquery');

module.exports = class SampleModule{
  constructor($el){
    this.$el = $el;
    this.method(this.$el);
  }
  method($element){
    console.log($element);
  }
};
```

If you're unfamiliar with the ES6 class syntax, you can read more about it [here](http://javascriptplayground.com/blog/2014/07/introduction-to-es6-classes-tutorial/).

Then reference the new module from somewhere in the HTML with the `data-module` attribute:

```html
<section class="outer-wrapper" data-module="sampleModule">
  <div class="inner-wrapper">
    <h1>My Module</h1>
  </div>
</section>
```

That's it! Now, when the page loads, `app/scripts/app.js` kicks off the module registry, which loops through all of the `data-module` attributes on the page and instantiates a `new` version of that module via the reference in the module registry.

_Note: The module loader passes a jQuery object of the element that contains `data-module`. This allows for easy scoping if you need to load more than one instance of the module on a page._

#### Using Sourcemaps
This project leverages JS and Sass sourcemapping for easy debugging. The sourcemaps are automatically built — all you need to do is configure your browser to use them.

##### Example set up using Chrome Dev Tools:

1. Run `gulp` to get your server running.
2. In Chrome Inspector, go into settings and make sure sourcemaps are enabled for both JS _and_ CSS.
3. Open the "Sources" tab in the inspector, and in the side pane on the left, right-click and select "Add Folder to Workspace". Select the root folder of the project, from your file system.
4. At the top of the browser, Chrome will prompt you for access. Click the "Allow" button.
5. In the left side pane of the Sources tab, you should now see your project folder. Expand it and and drill down to any one of your Sass partials. Click it once. In the middle pane, an alert should come up asking if you want to map the workspace resource. Click the "more" link to expand the dialog, then click "Establish the mapping now...".
6. A list of files should come up. Select the one that matches the file you just clicked on (generally the first one).
7. Inspector will want to restart.
8. That's it! Your local files should be tied to the sourcemaps the site loads. Now, when you inspect an element, look at the CSS pane and it should have a link to the exact partial for each rule declaration.

## Common issues

#### When I run `gulp`, the command line errors out. WTF?
Make sure you've installed _ALL_ dependencies specified above. Also, make sure you have up-to-date versions of Ruby and Node.

#### Why is Gulp not picking up on changes that I made to a file?
The `watch` task only picks up on changes made to files that existed when the task was started. When you edit a Gulp task, a config file, or add any new file to the `app` folder, you must stop and restart Gulp.
