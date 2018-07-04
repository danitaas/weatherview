import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./logic/weather";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// todo: enable if required
// import registerServiceWorker from './registerServiceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

// todo: this is a quick store creation, for code splitting and hot reloading use a store with reducer registry
// todo: better to have IRootState that is above the component states (slices)
const store = createStore(
    reducer,
    {
        location: "",
        forecasts: [],
    },
    applyMiddleware(thunk)
);

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
});

// todo: depending on requirements, store can be inject here or at a lower component
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root") as HTMLElement
);

// todo: enable if required
// registerServiceWorker();
