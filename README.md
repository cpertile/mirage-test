## MirageJS demo

This app demonstrates how MirageJS works by intercepting HTTP requests.

When running in development mode, the app's requests will be intercepted by MirageJS and mocked data will be returned.

When running in production mode, the app's requests will pass through and reach the real API endpoint.

(You can simulate running in production mode by commenting the function that starts Mirage server. See below for details).

## How to use it
- clone the repo
- install dependencies using `yarn` or `npm install`
- run the project using `yarn start` or `npm run start`
- run the tests using `yarn test` or `npm run test`


## How it works
Mirage is setup on `src/server.js`, where a User model is declared as well as seed functions for generating data and a route is specified using the real API endpoint.

In `src/index.js`, a conditional statement checks if the app is in production environment and starts MirageJS server. You can comment out the function `startMirage()` inside of the conditional statement in order to simulate a production environment and watch the app automatically make the request to the [online Mockaroo API](https://my.api.mockaroo.com/mockaroo.json?key=51425750) instead of returning the mocked data.

The API request itself is coded in `src/App.js` and doesn't need to be changed; this is exactly where MirageJS shines.
You can code the entire front-end by using the real API endpoints but returning mocked data without all the hassle.
