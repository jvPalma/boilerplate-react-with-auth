# React WebApp with Authentication boilerplate

## Description

My approach of a React WebApp with Authentication boilerplate

## Table of Contents

-   [React WebApp with Authentication boilerplate]
    -   [Description](#description)
    -   [Table of Contents](#table-of-contents)
    -   [Features](#features)
    -   [Project setup](#project-setup)
    -   [Development & Debug](#development--debug)
    -   [Links](#links)
    -   [Tests](#tests)
    -   [Infrastructure](#infrastructure)
    -   [To be added](#to-be-added)

## Features

-   [x] Advanced code folder struct.
-   [x] Mui 5 ([@mui/material](https://www.npmjs.com/package/@mui/material)).
-   [x] StylesComponents with JSS ([@emotion/styled](https://www.npmjs.com/package/@emotion/styled)).
-   [x] Form Validation with react-hook-form ([react-hook-form](https://www.npmjs.com/package/react-hook-form)).
-   [x] Form Validation rules with yup ([yup](https://www.npmjs.com/package/yup)).
-   [x] Axios for API Requests ([axios](https://www.npmjs.com/package/axios)).
-   [x] Firebase for Analytics ([firebase](https://www.npmjs.com/package/firebase)).
-   [x] i18next for internationalization ([react-i18next](https://www.npmjs.com/package/react-i18next)).
-   [x] Data Management with redux ([redux](https://www.npmjs.com/package/redux)).
-   [x] Data Management redux helper with redux-thunk ([redux-thunk](https://www.npmjs.com/package/redux-thunk)).
-   [x] Data Management code typesafe actions ([typesafe-actions](https://www.npmjs.com/package/typesafe-actions)).
-   [x] In-app notifications ([react-toastify](https://www.npmjs.com/package/react-toastify)).
-   [x] Webapp routing system with react-router-dom on V6.4 ([react-router-dom](https://www.npmjs.com/package/react-router-dom)).
-   [x] Eslint custom react rules and ecmaVersion 8
-   [x] Prettier rules
-   [x] Custom RequireAuth middleware for protected routes
-   [x] Custom API request handler for cleaner code and typing handling
-   [x] Docker.
-   [x] API Exception / Error Filter middleware
-   [x] CI (Github Actions).
-   [x] Terraform infrastructure.

## Project setup

A new repository can be created from this template by pressing the `Use this template` button

After creating the new repository simply clone it and run the following commands to instantly have the app running.

## Development & Debug

Press F5 for debug in VsCode

```bash
npm install

&&

npm run start:debug

```

## Links

-

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Infrastructure

At the moment the infrastructure is configured using Terraform. The boilerplate contains a basic structure to deploy the webapp, which simply needs to have some variables renamed / added if needed.

Every field that needs to be changed has the value `renamed` on it.

## To be added

-   [-] Company custom design
