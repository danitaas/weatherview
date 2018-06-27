import * as moment from "moment";

// note: my preference is to co-location action defs/action creators/reducers/selectors, however there are many patterns how to structure this

// ----------------Actions---------------------------

// todo: as state gets bigger, better to use ActionFactory with typescript generic actions

import { getWeather } from "./openweather";

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
            countrycode,
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

export const SELECT_DAY = "SELECT_DAY";
export type SELECT_DAY = typeof SELECT_DAY;
export interface ISelectDayAction {
    type: SELECT_DAY;
    payload: {
        dt: number;
    };
}
export function SelectDay(dt: number): ISelectDayAction {
    return {
        type: SELECT_DAY,
        payload: {
            dt,
        },
    };
}

export type IWeatherAction = ILoadWeatherStartAction | ILoadWeatherOkAction | ILoadWeatherFailAction | ISelectDayAction;

// ----------------State---------------------------

// todo: rename IDayForecast
// todo: naming conventions/data formats
export interface IDayWeather {
    dt: number; // todo: use a better primary key/record id
    dt_txt: string;
    mintemp: number;
    maxtemp: number;
    conditions: string;
    windspeed: number;
    winddeg: number;
}

export interface IWeatherState {
    location: string;
    countrycode: string;
    forecasts: IDayWeather[];
    // todo: could also store multiple locations
    // eg locations: Array<{location: string, forecasts: IDayWeather}>
    currentday: string;
}

// ----------------Reducers---------------------------

// todo: could use immutablejs for better control/performance
export function reducer(state: IWeatherState, action: IWeatherAction): IWeatherState {
    console.log("reducer", action); //todo: all use redux middleware or redux dev tools
    switch (action.type) {
        case LOAD_WEATHER_START:
            return {
                ...state,
                location: action.payload.location,
                countrycode: action.payload.countrycode,
                forecasts: [],
            };
        case LOAD_WEATHER_OK:
            return { ...state, forecasts: action.payload.forecasts };
        case LOAD_WEATHER_FAIL:
            return { ...state, location: "", countrycode: "uk", forecasts: [] };
        case SELECT_DAY:
            return { ...state, currentday: moment.unix(action.payload.dt).format("YYYY-MM-DD") };
    }
    return state;
}

// ----------------Selectors---------------------------

//todo: use reselect for memoization/caching

export function selectWeekForecasts(state: IWeatherState): any {
    const days = {};
    state.forecasts.map(i => {
        //simple reduction
        const day = moment.unix(i.dt).format("YYYY-MM-DD");
        if (!days[day]) {
            days[day] = { day, dt: i.dt, mintemp: 1000, maxtemp: 0, conditions: "-", windspeed: "-", winddeg: "-" };
        }
        if (i.mintemp < days[day].mintemp) {
            days[day].mintemp = i.mintemp;
        }
        if (i.maxtemp > days[day].maxtemp) {
            days[day].maxtemp = i.maxtemp;
        }
        //currently just picking the last value, //todo: could aggregate
        days[day].conditions = i.conditions;
        days[day].windspeed = i.windspeed;
        days[day].winddeg = i.winddeg;
    });

    const dayforecasts = Object.keys(days).map(i => days[i]);
    dayforecasts.sort((a, b) => a.dt - b.dt);

    if (dayforecasts.length > 5) {
        dayforecasts.length = 5; //todo: use lodash helper functions
    }
    return dayforecasts;
}

export function selectDayForecasts(state: IWeatherState): any {
    const result = state.forecasts.filter(i => {
        //simple reduction
        const day = moment.unix(i.dt).format("YYYY-MM-DD");
        return day === state.currentday;
    });
    return result;
}

// ----------------Sagas/Thunks---------------------------

export function loadWeather(location: string, countrycode: string) {
    console.log("loadWeather");
    return async (dispatch: any, getState: any) => {
        console.log("loadWeather-async");
        try {
            const data = await getWeather(location, countrycode);
            // todo: could parse/format here, or could add whole response to redux state
            const forecasts: any = data.list.map((i: any) => {
                const item: IDayWeather = {
                    dt: i.dt,
                    dt_txt: i.dt_txt,
                    mintemp: i.main.temp_min,
                    maxtemp: i.main.temp_max,
                    conditions: i.weather[0].description,
                    windspeed: i.wind.speed,
                    winddeg: i.wind.deg,
                };
                return item;
            });
            return dispatch(LoadWeatherOk(forecasts));
        } catch (err) {
            console.error(err);
            return dispatch(LoadWeatherFail());
        }
    };
}
