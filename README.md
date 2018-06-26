## Problem description

- [ ] Create a simple React + Redux app
- [ ] that allows a user to enter a location to see the weather forecast for that location.
- [ ] Your app should have an input which allows the user to enter a town/city (e.g London).
- [ ] Upon the user submitting the input, your app will connect to a weather API (e.g https://www.openweathermap.org/api )
- [ ] retrieve the forecast for that city and
- [ ] store it in the Redux store.
- [ ] The user will be shown the following information from the data for each of the next 5 days:

| Data        | Format           |
| ------------- |-------------|
| Day   | Monday |
| min temp | 23°C/73°F |
| max temp | 23°C/73°F |
| conditions | clear sky or light snow |
| wind | 27kmh/17mph WNW |

- [ ] The user should then be able to select a day interactively to drill-down and see a more detailed forecast for that day (e.g. 3-hourly data).

Technologies
------------
- [x] React
- [ ] Redux
- [x] ES6
- [x] Webpack (within CRA, let me know if you would like to see custom config)

Other info
----------

- [x] You may set up your project with create-react-app or any other boilerplate/starter kit.

Deliverables
------------

- [x] The provided solution should contain a README.md with instructions on how to test, build and run the project.
- [ ] Also in the README, please provide any assumptions you have made.
- [ ] Please make this available on the web - either via Github, Bitbucket or a downloadable zip from an online drive due to email security restrictions.

## Assumptions

May not work in older browser as polyfills not checked
Service workers/offline first has been disabled
Have chosen final-form as form library (same author as redux-form) all form state best not kept in redux due to performance (typing lag)
Inline styles have been used for implementation speed, issues with a perf/maintainence (better to use CSS-in-JSS solution or one of the Sass/Less modules)


## Log

- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
- Find starter kit
- Use https://github.com/Microsoft/TypeScript-React-Starter


## Available Scripts

In the project directory, you can run:

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
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.
