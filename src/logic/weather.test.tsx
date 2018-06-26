import {IWeatherState, LoadWeatherFail, LoadWeatherOk, LoadWeatherStart, reducer} from './weather';

describe('reducer', () => {

    it('LOAD_WEATHER_START', () => {
        var state1: any = {};
        var state2: IWeatherState = reducer(state1, LoadWeatherStart("London"));
        expect(state2.location).toEqual("London");
    });

    it('LOAD_WEATHER_OK', () => {
        var state1: any = {location: "London", forecasts: []};
        var state2: IWeatherState = reducer(state1, LoadWeatherOk([{day: "Mon"}, {day: "Tue"}, {day: "Wed"}, {day: "Thu"}, {day: "Fri"}]));
        expect(state2.location).toEqual("London");
        expect(state2.forecasts.length).toEqual(5);
    });

    it('LOAD_WEATHER_FAIL', () => {
        var state1: any = {location: "London", forecasts: [{day: "Mon"}]};
        var state2: IWeatherState = reducer(state1, LoadWeatherFail());
        expect(state2.location).toEqual("");
        expect(state2.forecasts.length).toEqual(0);
    });
});

