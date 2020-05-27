> Peer-to-peer volunteer platform for Extinction Rebellion: an international, grassroots, decentralized movement of tens of thousands of people who act together to justly address one of the greatest crisis of our times.

## Purpose

### why rebel

We are developers who joined Extinction Rebellion because we feel a moral duty to use our knowledge and skills to solve the Climate and Ecological Emergency. This emergency is a present reality for the families who are labelled climate refugees, the indigenous communities whose land has been destroyed, and the countless species that are forced into extinction every day. Governments have failed to act and are driving us towards social and ecollogical collapse. We joined Extinction Rebellion because it is our best and last hope to protect life on Earth. 

### why this project

We are developing this volunteer platform to make it easier for Extinction Rebellion groups to find help with roles and tasks, and easier for people to find roles and tasks in Extinction Rebellion that they wish to volunteer for. We believe that this platform is a critical tool to grow the movement, make it more resilient, and increase our chances of addressing the pressing crisis.

But we cannot do it alone. No matter who you are, what skills you have or how much time you can dedicate, we need your help. In the [contributing guidelines](https://github.com/xrnl/aginun/blob/master/CONTRIBUTING.md) you can learn how you can contribute to the project.

If you want to get in contact or learn more about the project, please read the [instructions for getting support](https://github.com/xrnl/aginun/blob/master/SUPPORT.md). To learn more about Extinction Rebellion, visit [rebellion.global](https://rebellion.global).

## Install

You can install the application in your own computer by following these simple steps:

1. Clone the repository by running `git clone https://github.com/xrnl/aginun.git` in your terminal.
2. Navigate into the project directory (`cd aginun`) and install packages with the command `npm install`
3. [Request the development API key](https://github.com/xrnl/aginun/blob/master/SUPPORT.md).  
4. Once you have the API key, store it in a file named `.env.local` as follows: `VUE_APP_API_KEY=<API_KEY>`, where `<API_KEY>` is the value of the API key. 

## Run

Once you have installed tha application, you can run it with the command `npm run serve`. When the application is running, you can access it at [localhost:8080](http://localhost:8080).

## Edit back end

The back end of this application runs on [Hasura](https://hasura.io/). The database and GraphQL endpoints of the development back end can be edited using the [Hasura console](http://178.62.229.109/console). If you wish to access the Hasura console, you have to [request the password](https://github.com/xrnl/aginun/blob/master/SUPPORT.md).

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

## Test

* Run unit tests with the command `npm run test:unit`
* Run end-to-end tests with the command `npm run test:e2e`

## Build 

Compile and minify for production with `npm run build`
