# react-engine-template

A template for [react-engine](https://github.com/paypal/react-engine) and [react-router](https://github.com/ReactTraining/react-router).

## Installation

```sh
$ git clone https://github.com/remarkablemark/react-engine-template.git
$ cd react-engine-template
$ npm install # and sets up Git hooks
```

## Usage

#### Development:

```sh
$ npm run dev

# in a new tab or window
$ open http://localhost:8080
```

#### Production:

```sh
$ npm start
```

## Overview

```
.
├── app.js # express app
├── build
│   └── ... # assets generated from `src`
├── bin
│   └── www # entry server file
├── nodemon.json
├── package.json
├── routes
│   ├── Routes.jsx # react-router routes
│   └── index.js   # express routes
├── scripts
│   └── ... # git and npm scripts
├── src
│   ├── ... # other source files to be compiled
│   └── main.js # entry file for webpack
├── views
│   └── ... # components
└── webpack
    └── ... # webpack configs
```

## License

[MIT](https://github.com/remarkablemark/react-engine-template/blob/master/LICENSE)
