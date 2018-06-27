// note: my preference is to co-location action defs/action creators/reducers/selectors, however there are many patterns how to structure this

// ----------------Actions---------------------------

// todo: as state gets bigger, better to use ActionFactory with typescript generic actions

import {getWeather} from "./openweather";

export const LOAD_WEATHER_START = "LOAD_WEATHER_START";
export type LOAD_WEATHER_START = typeof LOAD_WEATHER_START;
export interface ILoadWeatherStartAction {
    type: LOAD_WEATHER_START;
    payload: {
        location: string;
        countrycode: string;
    };
}
export function LoadWeatherStart(location: string, countrycode: string): ILoadWeatherStartAction {
    return {
        type: LOAD_WEATHER_START,
        payload: {
            location,
            countrycode
        },
    };
}

export const LOAD_WEATHER_OK = "LOAD_WEATHER_OK";
export type LOAD_WEATHER_OK = typeof LOAD_WEATHER_OK;
export interface ILoadWeatherOkAction {
    type: LOAD_WEATHER_OK;
    payload: {
        forecasts: any;
    };
}
export function LoadWeatherOk(forecasts: any): ILoadWeatherOkAction {
    return {
        type: LOAD_WEATHER_OK,
        payload: {
            forecasts,
        },
    };
}

export const LOAD_WEATHER_FAIL = "LOAD_WEATHER_FAIL";
export type LOAD_WEATHER_FAIL = typeof LOAD_WEATHER_FAIL;
export interface ILoadWeatherFailAction {
    type: LOAD_WEATHER_FAIL;
}
export function LoadWeatherFail(): ILoadWeatherFailAction {
    return {
        type: LOAD_WEATHER_FAIL,
    };
}

export type IWeatherAction = ILoadWeatherStartAction | ILoadWeatherOkAction | ILoadWeatherFailAction;

// ----------------State---------------------------

// todo: rename IDayForecast
// todo: naming conventions/data formats
export interface IDayWeather {
    day?: string;
    mintemp?: string;
    maxtemp?: string;
    conditions?: string;
    wind?: string;
}

export interface IWeatherState {
    location: string;
    countrycode: string;
    forecasts: IDayWeather[];
    // todo: could also store multiple locations
    // eg locations: Array<{location: string, forecasts: IDayWeather}>
}

// ----------------Reducers---------------------------

// todo: could use immutablejs for better control/performance
export function reducer(state: IWeatherState, action: IWeatherAction): IWeatherState {
    console.log("reducer", action); //todo: all use redux middleware or redux dev tools
    switch (action.type) {
        case LOAD_WEATHER_START:
            return { ...state, location: action.payload.location, countrycode: action.payload.countrycode, forecasts: [] };
        case LOAD_WEATHER_OK:
            return { ...state, forecasts: action.payload.forecasts };
        case LOAD_WEATHER_FAIL:
            return { ...state, location: "", countrycode: "uk", forecasts: [] };
    }
    return state;
}

// ----------------Selectors---------------------------

// ----------------Sagas/Thunks---------------------------

export function loadWeather(location: string, countrycode: string) {
    console.log("loadWeather");
    return async (dispatch: any, getState: any) => {
        console.log("loadWeather-async");
        try {
            const data = await getWeather(location, countrycode);
            // todo: could parse here, or could add whole response to redux state
            const forecasts: any = data.list.map((i: any) => {
                return {
                    day: new Date(i.dt).getDay(), // assume epoch time, // todo: use moment
                    mintemp: i.main.temp_min,
                    maxtemp: i.main.temp_max,
                    conditions: i.weather[0].description,
                    wind: i.wind.speed + " " + i.wind.deg,
                }
            });
            return dispatch(LoadWeatherOk(forecasts));
        } catch(err) {
            console.error(err);
            return dispatch(LoadWeatherFail());
        }
    };
}

