## Problem description

- [x] Create a simple React + Redux app
- [x] that allows a user to enter a location to see the weather forecast for that location.
- [x] Your app should have an input which allows the user to enter a town/city (e.g London).
- [x] Upon the user submitting the input, your app will connect to a weather API (e.g https://www.openweathermap.org/api )
- [x] retrieve the forecast for that city and
- [x] store it in the Redux store.
- [x] The user will be shown the following information from the data for each of the next 5 days:

| Data        | Format           |
| ------------- |-------------|
| Day   | Monday |
| min temp | 23°C/73°F |
| max temp | 23°C/73°F |
| conditions | clear sky or light snow |
| wind | 27kmh/17mph WNW |

- [x] The user should then be able to select a day interactively to drill-down and see a more detailed forecast for that day (e.g. 3-hourly data).

Technologies
------------
- [x] React
- [x] Redux
- [x] ES6
- [x] Webpack (within CRA, let me know if you would like to see custom config)

Other info
----------

- [x] You may set up your project with create-react-app or any other boilerplate/starter kit.

Deliverables
------------

- [x] The provided solution should contain a README.md with instructions on how to test, build and run the project.
- [x] Also in the README, please provide any assumptions you have made.
- [x] Please make this available on the web - either via Github, Bitbucket or a downloadable zip from an online drive due to email security restrictions.

## Assumptions

- May not work in older browser as polyfills not checked
- Service workers/offline first has been disabled
- Have chosen final-form as form library (same author as redux-form) all form state best not kept in redux due to performance (typing lag)
- Some inline styles have been used for implementation speed, issues with a perf/maintainence/vendor prefixing etc (better to use CSS-in-JSS solution or one of the Sass/Less modules)
- Check code comments for alternative ways to implement in a larger project, (have skipped over however do let me know if you would like to see more)
- console.log/console.error would be trimmed in production application
- OpenWeatherAPI offers a number of endpoints, I have chosen 5day+3hr and show day summary based on 12:00pm data, could use 16d endpoint to have the summary, or could calculate summary inside code (eg redux selector)
- Drilldown here is showing on the same page, can be made to show on a seperate SPA page with something like react-router
- Pragmatic testing to show capabilities of testing frameworks
- Limited argument validation performed

## Log

- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
- Starter kit https://github.com/Microsoft/TypeScript-React-Starter

## Scripts

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>

### `npm run eject`

Dont run!!