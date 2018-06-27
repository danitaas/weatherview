import * as React from "react";
import * as ReactDOM from "react-dom";
import DayWeather from "./DayWeather";
// todo: cant use typescript import without correcting toolchain
const ReactShallowRenderer = require("react-test-renderer/shallow");
const ReactTestRenderer = require("react-test-renderer");

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DayWeather />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders all props", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DayWeather day={"a"} mintemp={"a"} maxtemp={"a"} conditions={"a"} wind={"a"} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders shallow", () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<DayWeather />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
});

it("renders", () => {
    const tree = ReactTestRenderer.create(<DayWeather />).toJSON();
    expect(tree).toMatchSnapshot();
});
