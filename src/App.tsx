import * as React from "react";
import logo from "./logo.svg";
import Location from "./components/Location/Location";
import Weather from "./components/Weather/Weather";
import Location2 from "./components/Location2/Location2";
import Weather2 from "./components/Weather2/Weather2";
import "./App.css";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Internet News with Responsive Layout</h1>
                </header>
                <div style={{ }}>
                    {/*<Location />*/}
                    {/*<Weather />*/}
                    <Location2 />
                    <Weather2 />
                </div>
            </div>
        );
    }
}

export default App;
