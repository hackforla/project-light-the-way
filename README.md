# Project Light The Way

*This project builds upon [MEAN.JS](http://meanjs.org/)*

MEAN.JS is a full-stack JavaScript open-source solution, which provides a solid starting point for [MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/) based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.

#### !!!! Full comprehension of project, please read !!!
1. [MEANJS 4.x DOC](http://meanjs.org/docs/0.4.x/)
2. [YO Generator MEANJS](http://meanjs.org/generator.html)

#### !!!! Summary contained below !!!

## Technologies used


### MEAN
| Name | Style Guides |
| ---- | ----- |
|[MongoDB](http://mongodb.org/)|  |
|[Express](http://expressjs.com/)|  |
|[AngularJS](http://angularjs.org/)| [John Papa ](https://github.com/johnpapa/angular-styleguide/tree/master/a1) |
|[Node.js](http://nodejs.org/)|  |

### Required Install
| Name | Required |
| ---- | ----- |
|[Node.js](http://nodejs.org/)| Yes |
|[MongoDB](http://mongodb.org/)| Optional, can be used remotely. |
|[Ruby](https://www.ruby-lang.org/en/)| Yes |
|[Bower](https://bower.io/)| Yes |

## Quick Install
To install Node.js dependencies you're going to use npm again. In the application folder run this in the command-line:

```bash
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Finally, when the install process is over, npm will initiate a bower install command to install all the front-end modules needed for the application


* Grunt - You're going to use the [Grunt Task Runner](http://gruntjs.com/) to automate your development process. Install grunt globally using npm:

```bash
$ npm install -g grunt-cli
```

* Sass - You're going to use [Sass](http://sass-lang.com/) to compile CSS during your grunt task. Make sure you have ruby installed, and then install Sass using gem install:

```bash
$ gem install sass
```

* Gulp - (Optional) You may use Gulp for Live Reload, Linting, and SASS or LESS.

```bash
$ npm install gulp -g
```


### Cloning The GitHub Repository

```bash
$ git clone https://github.com/light-the-way/website.git ltw
```

### Yo Generator

Yo Generator provides an easy way to create CRUD Modules with a single command

Install Yo Generator
```bash
$ npm install -g yo
```

Followed by installing meanjs generator

```bash
$ npm install -g generator-meanjs
```

To create a crud module within the modules folder, run.

```bash
$ yo meanjs:crud-module <module-name>
```

Options will be displayed on what features you want included.


## Running Your Application
After the install process is over, you'll be able to run your application using Grunt, just run grunt default task:

```
$ grunt
```

Your application should run on port 3000 with the *development* environment configuration, so in your browser just go to [http://localhost:3000](http://localhost:3000)

That's it! Your application should be running. To proceed with your development, check the other sections in this documentation.
If you encounter any problems, try the Troubleshooting section.

* explore `config/env/development.js` for development environment configuration options

### Running in Production mode
To run your application with *production* environment configuration, execute grunt as follows:

```bash
$ grunt prod
```

* explore `config/env/production.js` for production environment configuration options



## Testing Your Application
You can run the full test suite included with MEAN.JS with the test task:

```bash
$ grunt test
```

This will run both the server-side tests (located in the app/tests/ directory) and the client-side tests (located in the public/modules/\*/tests/).

To execute only the server tests, run the test:server task:

```bash
$ grunt test:server
```

And to run only the client tests, run the test:client task:

```bash
$ grunt test:client
```

## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
