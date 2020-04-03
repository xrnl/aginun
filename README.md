# aginun

You can find all information about this project in [the wiki](https://github.com/xrnl/aginun/wiki)


## Installation

### Install packages

```
npm install
```

### Store API Key

Request the development API key from one of the project contributors and store it in a file named `.env.local`

```
VUE_APP_API_KEY=<API_KEY>
```

## Run

### Run development server (with hot reloads)

```
npm run serve
```

### Compile and minify for production
```
npm run build
```

## Backend

The backend of this application runs on [Hasura](https://hasura.io/). The development backend can be edited using the Hasura console at [http://178.62.229.109/console](http://178.62.229.109/console). To login to the console you will have to request a password from one of the project contributors.

## Development

### recommended extensions
For developing this application we recommend using the [Visual Studio Code](https://code.visualstudio.com/) editor with the following extensions:

- [ESLint](https://github.com/Microsoft/vscode-eslint.git)
- [Prettier](https://github.com/prettier/prettier-vscode.git)
- [Vetur](https://github.com/vuejs/vetur.git)
- [Apollo GraphQL](https://github.com/apollographql/apollo-tooling)

#### Configuring extensions

##### Prettier

Set the following settings in your Visual Studio Code editor:

- `"editor.defaultFormatter": "esbenp.prettier-vscode"`
- `"editor.formatOnSave": true`

##### Apollo GraphQL

Create a file in the project root directory called `apollo.config.js` with the following content.

```js
module.exports = {
  client: {
    service: {
      name: "aginun",
      url: "http://178.62.229.109/v1/graphql",
      headers: {
        "x-hasura-admin-secret": <API_KEY>,
      },
    },
  },
};
```
In this file, you will have to replace `<API_KEY>` with the development API key, which you can obtain from one of the project contributors.

## Testing

### Unit tests
```
npm run test:unit
```

### End-to-end tests
```
npm run test:e2e
```
