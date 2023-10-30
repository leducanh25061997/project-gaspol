# admin-dashboard

Gaspol Admin Dashboard

## Prerequisite

- NodeJS >= v14 , if you have `nvm` installed, inside the directory, just `nvm install` to install and active corresponding NodeJS version
- IDE:
  - Visual Studio Code
    We provide a `.vscode` folder out-of-the-box which includes the recommended extensions and settings
  - Extensions are responsible for:
    - Eslint
    - Prettier
    - Jest
    - Styled Components

## Tech Stack

Here's a list of packages that you should be at least familiar with before starting your project. However, the best way to see a complete list of the dependencies is to check `package.json` file.

### Core

- React
- React Router (v6)
- Redux
- Redux Toolkit
- Reselect
- Redux-Saga
- Styled Components
- Typescript
- React-i18next

### Unit Testing

- Jest
- react-testing-library

### Linting

- ESLint
- Prettier
- Stylelint

## Getting Started

⚠️ Using [Yarn Package Manager](https://yarnpkg.com) is recommended over `npm`.

- Install dependencies:

```shell
yarn install
```

- Run application on development (http://localhost:3000)

```shell
yarn start
```

_Account for development_: `fe_admin`/`admin`

- Run application on production

```shell
yarn start:prod
```

- Lint

```shell
yarn lint
# Fix lint
yarn lint:fix
```

- Generate `component` or `slice`

```shell
yarn generate
```

- Unit Testing

```shell
yarn test
# Run only the Button component tests
yarn test -- Button
```

- Typescript

```shell
yarn checkTs
```

### Environment keys

| env key                        | Description                                         |
| ------------------------------ | --------------------------------------------------- |
| `REACT_APP_KEYCLOAK_CLIENT_ID` | keycloak client id in https://keycloak.gaspol.co.id |
| `REACT_APP_WEBLITE_URL`        | Weblite URL                                         |

### Copyright

- Gaspol, 2021 - 2022
