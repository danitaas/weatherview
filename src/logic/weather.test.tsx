import {IWeatherState, LoadWeatherFail, LoadWeatherStart, reducer} from './weather';

it('LOAD_WEATHER_START', () => {
  var state1: any = {};
  var state2: IWeatherState = reducer(state1, LoadWeatherStart("London"));
  expect(state2.location).toEqual("London");
});

it('LOAD_WEATHER_FAIL', () => {
    var state1: any = {location: "London", forecasts: [{day: "Mon"}]};
    var state2: IWeatherState = reducer(state1, LoadWeatherFail());
    expect(state2.location).toEqual("");
    expect(state2.forecasts.length).toEqual(0);
});