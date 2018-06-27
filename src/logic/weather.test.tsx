import {
    IWeatherState, LoadWeatherFail, LoadWeatherOk, LoadWeatherStart, reducer, SelectDay,
    selectWeekForecasts
} from "./weather";

describe("reducer", () => {
    it("LOAD_WEATHER_START", () => {
        const state1: any = {};
        const state2: IWeatherState = reducer(state1, LoadWeatherStart("London", "uk"));
        expect(state2.location).toEqual("London");
        expect(state2.countrycode).toEqual("uk");
    });

    it("LOAD_WEATHER_OK", () => {
        const state1: any = { location: "London", countrycode: "uk", forecasts: [] };
        const state2: IWeatherState = reducer(
            state1,
            LoadWeatherOk([
                { day: "Mon 25" },
                { day: "Tue 26" },
                { day: "Wed 27" },
                { day: "Thu 28" },
                { day: "Fri 29" },
                { day: "Sat 30" },
            ])
        );
        expect(state2.location).toEqual("London");
        expect(state2.countrycode).toEqual("uk");
        expect(state2.forecasts.length).toEqual(6);
    });

    it("LOAD_WEATHER_FAIL", () => {
        const state1: any = { location: "London", countrycode: "uk", forecasts: [{ day: "Mon 25" }] };
        const state2: IWeatherState = reducer(state1, LoadWeatherFail());
        expect(state2.location).toEqual("");
        expect(state2.countrycode).toEqual("uk");
        expect(state2.forecasts.length).toEqual(0);
    });

    it("SELECT_DAY", () => {
        const state1: any = { location: "London", countrycode: "uk", forecasts: [{ day: "Mon 25" }] };
        const state2: IWeatherState = reducer(state1, SelectDay(1530106667 ));
        expect(state2.location).toEqual("London");
        expect(state2.countrycode).toEqual("uk");
        expect(state2.currentday).toEqual("2018-06-27");
        expect(state2.forecasts.length).toEqual(1);
    });
});

describe("selectors", () => {
    it("selectWeekForecasts", () => {
        const state: IWeatherState = { location: "London", countrycode: "uk", forecasts: [
                { dt: 1529928000 }, //2018-06-25 12:00
                { dt: 1530014400 }, //2018-06-26 12:00
                { dt: 1530100800 }, //2018-06-27 12:00
                { dt: 1530187200 }, //2018-06-28 12:00
                { dt: 1530273600 }, //2018-06-29 12:00
                { dt: 1530360000 }, //2018-06-30 12:00
            ], currentday: '2018-06-27' };
        var result = selectWeekForecasts(state);
        expect(result.length).toEqual(5);
    });
    it("selectDayForecasts", () => {
        const state: IWeatherState = { location: "London", countrycode: "uk", forecasts: [
                { dt: 1529928000 }, //2018-06-25 12:00
                { dt: 1529938800 }, //2018-06-25 15:00
                { dt: 1530014400 }, //2018-06-26 12:00
            ], currentday: '2018-06-25' };
        var result = selectWeekForecasts(state);
        expect(result.length).toEqual(2);
    });
});