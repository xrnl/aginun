<p align="center"><a href="https://rebellion.global/" target="_blank"><img width="200" src="https://user-images.githubusercontent.com/15846595/83038003-c6157b80-a03c-11ea-9605-325b4990e7bd.png" alt="XR logo"></a></p>

<p align="center"><a href="https://rebellion.global/" target="_blank"><img src="https://img.shields.io/badge/rebel-for%20life-success" alt="XR website"></a></p>

> Peer-to-peer volunteer platform of Extinction Rebellion: an international, grassroots, decentralized movement of tens of thousands of people who act together to justly address one of the greatest crisis of our times.

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
4. Copy the `.env.example` file to `.env.local`, as follows: `cp .env.example .env.local` Once you have the API key, replace `<API_KEY>` in the `.env.local` file with your API key.

If you wish edit the code of this application, we recommend using [this setup](https://github.com/xrnl/aginun/wiki/Recommended-setup).

## Run

Once you have installed tha application, you can run it with the command `npm start`. When the application is running, you can access it at [localhost:8080](http://localhost:8080).

## Edit back end

The back end of this application runs on [Hasura](https://hasura.io/). The database and GraphQL endpoints of the development back end can be edited using the [Hasura console](http://178.62.229.109/console). If you wish to access the Hasura console, you have to [request the password](https://github.com/xrnl/aginun/blob/master/SUPPORT.md).

## Test

### Unit tests

```
npm run test:unit
```

Add the `-s` or `--silent` flag to avoid NPM error messages if tests fail.
During development, the `test:unit:dev` command can be used to keep the tests running.

### End to End tests (to be implemented)

```
npm run test:e2e
```

## Build

Compile and minify for production with `npm run build`
