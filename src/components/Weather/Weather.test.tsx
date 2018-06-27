import * as React from "react";
import { Weather } from "./Weather";
// todo: cant use typescript import without correcting toolchain
const ReactShallowRenderer = require("react-test-renderer/shallow");
const ReactTestRenderer = require("react-test-renderer");

it("renders shallow without crashing", () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Weather />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
});

it("renders snapshot", () => {
    const tree = ReactTestRenderer.create(<Weather />).toJSON();
    expect(tree).toMatchSnapshot();
});

it("renders snapshot with props", () => {
    const tree = ReactTestRenderer.create(<Weather weekforecasts={[]} dayforecasts={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
});

//todo: move tests with forecasts data
