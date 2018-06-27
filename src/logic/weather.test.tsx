import { IWeatherState, LoadWeatherFail, LoadWeatherOk, LoadWeatherStart, reducer } from "./weather";

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
                { day: "Mon 9:00" },
                { day: "Mon 12:00" },
                { day: "Mon 15:00" },
                { day: "Mon 18:00" },
                { day: "Mon 21:00" },
            ])
        );
        expect(state2.location).toEqual("London");
        expect(state2.countrycode).toEqual("uk");
        expect(state2.forecasts.length).toEqual(5);
    });

    it("LOAD_WEATHER_FAIL", () => {
        const state1: any = { location: "London", countrycode: "uk", forecasts: [{ day: "Mon 9:00" }] };
        const state2: IWeatherState = reducer(state1, LoadWeatherFail());
        expect(state2.location).toEqual("");
        expect(state2.countrycode).toEqual("uk");
        expect(state2.forecasts.length).toEqual(0);
    });
});
