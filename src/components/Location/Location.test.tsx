import * as React from "react";
import { Location, styles } from "./Location";
// todo: cant use typescript import without correcting toolchain
const ReactShallowRenderer = require("react-test-renderer/shallow");
const ReactTestRenderer = require("react-test-renderer");
import * as enzyme from 'enzyme';
//import ReactTestUtils from 'react-addons-test-utils';

const mocktheme = {
    spacing: {
        unit: 8,
    }
}

it("renders shallow without crashing", () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Location classes={styles(mocktheme)} />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
});

it("renders snapshot", () => {
    const tree = ReactTestRenderer.create(<Location classes={styles(mocktheme)} />).toJSON();
    expect(tree).toMatchSnapshot();
});

// it("handleSubmit - jest", () => {
//     const mockSubmit = jest.fn();
//     const wrapper = enzyme.mount(
//         <Location classes={styles(mocktheme)} onSubmit={mockSubmit} />
//     );
//     wrapper.find('#searchform').simulate('click');
//     expect(mockSubmit).toHaveBeenCalled();
// });

it("handleSubmit - enzyme", () => {
    let clicked = false;
    const mockSubmit = () => {
        console.log("mockSubmit");
        clicked = true;
    };
    const wrapper = enzyme.shallow(<Location classes={styles(mocktheme)} onSubmit={mockSubmit} />);
    const button = wrapper.find('#searchform');
    button.simulate('submit');
    expect(clicked).toBe(true);
});

