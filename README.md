# Next To Race

This app was built using the polymer-starter-kit. It's a Polymer 3 application built using web components and native ES modules.

This app is built with the the `polymer-cli` toolchain which demonstrates the use
of the "PRPL pattern" This pattern allows fast first delivery and interaction with
the content at the initial route requested by the user, along with fast subsequent
navigation by pre-caching the remaining components required by the app and
progressively loading them on-demand as the user navigates through the app.

The PRPL pattern, in a nutshell:

* **Push** components required for the initial route
* **Render** initial route ASAP
* **Pre-cache** components for remaining routes
* **Lazy-load** and progressively upgrade next routes on-demand

### Setup

##### Prerequisites

Install [Polymer CLI](https://github.com/Polymer/polymer-cli) using
[npm](https://www.npmjs.com) (we assume you have pre-installed [node.js](https://nodejs.org)).

    npm install -g polymer-cli@next

Then do an `npm install` to install all other dependencies!

### How to run the app

This command serves the app at `http://127.0.0.1:8081` and provides basic URL
routing for the app:

    npm start

Please install the Chrome Extension called ["Allow-Control-Allow-Origin: *"](https://chrome.google.com/webstore/detail/nlfbmbojpeacfghkpbjhddihlkkiljbi) to work around CORS. Otherwise the fetch requests to the TAB API will not work, and you'll get a blank table.

Note that you'll only be able to run the app in modern browsers that support ES modules, ES6+, fetch etc.
