# aginun

> Peer-to-peer volunteer platform for Extinction Rebellion: an international, grassroots, decentralized movement of tens of thousands of people who act together to justly address one of the greatest crisis of our times.

## Purpose 

## Why rebel 

We are developers who joined Extinction Rebellion because we feel a moral duty to use our knowledge and skills to solve the Climate and Ecological Emergency. This emergency is a present reality for the families who are labelled climate refugees, the indigenous communities whose land has been destroyed, and the countless species that are forced into extinction every day. We joined Extinction Rebellion because it is our best and last hope to protect life on Earth. 

## Why develop this application

We are developing this volunteer platform to make it easier for Extinction Rebellion groups to find help with roles and tasks, and easier for people to find roles and tasks in Extinction Rebellion that they wish to volunteer for. We believe that this platform is a critical tool to grow the movement, make it more resilient, and increase our chances of addressing the present crisis.

But we cannot do it alone. We need your help&emdash;no matter who you are, what skills you have or how much time you can dedicate. In the [contributing guidelines](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md) you can learn how you can contribute to the project.

If you want to get in contact or learn more about the project, please read the [instructions for getting support](https://github.com/xrnl/aginun/blob/master/SUPPORT.md).

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

### Unit tests

```
npm run test:unit
```

### End-to-end tests

```
npm run test:e2e
```
