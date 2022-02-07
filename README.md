# <img src="public/noodle_white.png" width="100"> Frontend

## Stack

- Vue 2
- Typescript
- Rooter
- Vuex
- Vuetify (UI Components)
- Jest (Unit Tests)
- Cypress (E2E Tests)
- ESLint with Airbnb Config and recommended Vue rules

## VS Code Setup

Recommended Extensions:
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) 
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

To configure Auto Fix for ESLint add the following to your `settings.json`. This can be configured globally or for the project workspace only by adding a `settings.json` file to a `.vscode` directory at the project root.

    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
    }

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
