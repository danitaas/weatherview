import * as React from "react";
import DayWeather from "./DayWeather";
// todo: cant use typescript import without correcting toolchain
const ReactShallowRenderer = require("react-test-renderer/shallow");
const ReactTestRenderer = require("react-test-renderer");

it("renders shallow without crashing", () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<DayWeather />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
});

it("renders snapshot", () => {
    const tree = ReactTestRenderer.create(<DayWeather />).toJSON();
    expect(tree).toMatchSnapshot();
});

it("renders snapshot with props", () => {
    const tree = ReactTestRenderer.create(<DayWeather dt={1530100800} mintemp={298.785} maxtemp={298.571} conditions={"a"} windspeed={1} winddeg={1} />).toJSON();
    expect(tree).toMatchSnapshot();
});
