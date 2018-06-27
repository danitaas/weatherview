import * as React from "react";
import { Location } from "./Location";
// todo: cant use typescript import without correcting toolchain
const ReactShallowRenderer = require("react-test-renderer/shallow");
const ReactTestRenderer = require("react-test-renderer");

it("renders shallow without crashing", () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Location />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
});

it("renders snapshot", () => {
    const tree = ReactTestRenderer.create(<Location />).toJSON();
    expect(tree).toMatchSnapshot();
});
