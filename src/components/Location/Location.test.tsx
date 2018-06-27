import * as React from "react";
import { Location } from "./Location";
// todo: cant use typescript import without correcting toolchain
const ReactShallowRenderer = require("react-test-renderer/shallow");
const ReactTestRenderer = require("react-test-renderer");
import * as enzyme from 'enzyme';

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

// it("handleSubmit - jest", () => {
//     const mockcall = jest.fn();
//     const tree = ReactTestRenderer.create(<Location onSubmit={mockcall} />).toJSON();
//     wrapper.find('button').at(0).simulate('click');
//     expect(mockLogout).toHaveBeenCalled();
// });

it("handleSubmit - enzyme", () => {
    let clicked = false;
    const handleSubmit = () => {
        console.log("handleSubmit");
        clicked = true;
    };
    const wrapper = enzyme.shallow(<Location onSubmit={handleSubmit} />);
    const button = wrapper.find('#searchform');
    button.simulate('submit');
    expect(clicked).toBe(true);
});

