import * as React from "react";
import App from "./App";
// todo: cant use typescript import without correcting toolchain
const ReactShallowRenderer = require("react-test-renderer/shallow");
//const ReactTestRenderer = require("react-test-renderer");

it("renders shallow without crashing", () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<App />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
});

it("renders snapshot", () => {
    const renderer = new ReactShallowRenderer();
    const result = renderer.render(<App />);
    expect(result).toMatchSnapshot();
});
