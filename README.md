# Adventure capitalist game

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


Adventure Capitalist is an idle business sim-game. The basic idea is to purchase a business, win capital from that business, upgrade the business and then purchase more businesses.

This repo includes game core and server implementation of `adventure capitalist` game.

# About

This project is built using Node.js, Socket.io and Typescript.

The project is using `components-based` architecture in order to provide maintainability and simplicity. At the moment it has 3 main components:
 - `game-core` - includes all the game logic
 - `server` - includes handling of the game events and broadcasting them to a user.
 - `database` - includes a very simple imitation of a database. Basically it takes the data from a `.json` config due to the simplicity of the requirements. But nevertheless, it can be changed in the future.


# Commits convention
This repo is using [commitizen](https://github.com/commitizen/cz-cli) to follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). To be able to commit into this repo, you should run following commands:
```
  npm install -g commitizen
  npm install
```

In order to create a new commit you should type in your console:
```
  git cz
```

You'll be prompted to fill out required commit fields.

  > Note: this repo is using `hasky` hooks,
  so you won't be able to push commits which don't follow the conventional commits.


# Installation

Minimum required version of node is `11.15.0`.

In order to run the project, you need to rename the `.env.example` file to `.env` and set you environmental variables.

When your `.env` file is set up, you need to install dependencies with the following commands in your console:

```
  npm i
```


Now to run the project in dev or prod mode, run the following command:

```
  npm run start:dev
```
or 

```
  npm run start:prod
```



In order to build the production version, run:

```
  npm run build-ts
```

# Linters

This project is using `eslint` for linting.

```
  npm run lint
```

# Tests

To run the tests, simply run:

```
  npm test
```

  > Note.
    Not all files are covered with tests, and some of them have quite poor test implementation due to lack of time. It should be refactored in the future.

# Authorization

The server is running the game even when a user is away, so in order to use this feature, the client should send `Authorization: Auth ${clientId}` header when initializing the socket on client.

It's not quite secure, but due to lack of time, it was the fastest option available. It should be changed in the future for a better implementation.


# Socket events

When you're all setup, you can use this project as a back-end socket server for you application.

You just need to connect it to your front-end, example:

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io('http://localhost');
</script>
```

This server exposes two kinds of events:
 - `GAME` - events related to the game flow
 - `SERVER` - events related to the server itself


This server emits the following socket events(all type definition you can find in `src/server/typings/server-response.typings.ts` file):

| Event name              | Payload                | Description                                     |
|-------------------------|------------------------|-------------------------------------------------|
|GAME:get-user-info       | User's info            | Returns a basic user info                       |
|GAME:get-business-info   | Business info by id    | Returns a business info by id                   |
|GAME:get-business-list   | List of all businesses | Returns a list of all businesses                |
|GAME:error               | Game error             | Returns a game error                            |
|SERVER: authorization    | ClientId               | Returns a clientId if a user is not authorized  |


Also, the server listens to the following socket events(all type definitions for the client payload you can find in `src/server/typings/client-payload.typings.ts` file):

| Event name              | Payload                | Description                                     |
|-------------------------|------------------------|-------------------------------------------------|
|GAME:get-user-info       | -                      | Returns basic user info                         |
|GAME:get-business-info   | -                      | Returns business info by id                     |
|GAME:buy-business        | { businessId: number } | Buys a business                                 |
|GAME:upgrade-business    | { businessId: number } | Upgrade a business                              |
|GAME:gain-capital        | { businessId: number } | Starts gaining the capital from a business      |
|GAME:hire-manager        | { businessId: number } | Hires a manager for a business                  |

  > Note. 
    After one of `GAME:buy-business`, `GAME:upgrade-business`, `GAME:gain-capital` or `GAME:hire-manager` events - the server will emit `GAME:get-business-info` event in order to update the state on client.
