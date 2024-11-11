# casiono-challenge

This repo contains both the front-end and back-end code for the slot game challenge project.

The whole app is built using Typescript for better developer experience with type safety.

## Backend
- The back-end is built using Node.js, Typescript and GraphQL.
- It is hosted on Heroku.
- The back-end is secure! Users can not cheat on the game. Besides client side validation, the app has a full server-side validations for every actions. It has a strict authentication and authorization feature too.

## Frontend (https://casino-challenge.web.app/)
- The front-end is built using React.js, Typescript and ApolloGQL.
- It is hosted on Firebase and served via a CDN for faster loading time and caching.
- The front-end validates every data before sending it to the back-end where it will be validated again(for better security).
