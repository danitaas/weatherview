import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DayWeather from './DayWeather';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DayWeather />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders all props', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DayWeather day={"a"} mintemp={"a"} maxtemp={"a"} conditions={"a"} wind={"a"} />, div);
    ReactDOM.unmountComponentAtNode(div);
});