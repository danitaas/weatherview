import * as React from "react";
import logo from "./logo.svg";
import Location from "./components/Location/Location";
import Weather from "./components/Weather/Weather";
import "./App.css";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Weather Viewer</h1>
                </header>
                <div>
                    <Location />
                    <Weather />
                </div>
            </div>
        );
    }
}

export default App;
