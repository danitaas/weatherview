//note: my preference is to co-location action defs/action creators/reducers/selectors, however there are many patterns how to structure this

//----------------Actions---------------------------

//todo: as state gets bigger, better to use ActionFactory with typescript generic actions

export const LOAD_WEATHER_START = 'LOAD_WEATHER_START';
export type LOAD_WEATHER_START = typeof LOAD_WEATHER_START;
export interface ILoadWeatherStartAction {
    type: LOAD_WEATHER_START;
    payload: {
        location: string,
    }
}
export function LoadWeatherStart(location: string): ILoadWeatherStartAction {
    return {
        type: LOAD_WEATHER_START,
        payload: {
            location,
        }
    }
}

export const LOAD_WEATHER_OK = 'LOAD_WEATHER_OK';
export type LOAD_WEATHER_OK = typeof LOAD_WEATHER_OK;
export interface ILoadWeatherOkAction {
    type: LOAD_WEATHER_OK;
    payload: {
        forecasts: any,
    }
}
export function LoadWeatherOk(forecasts: any): ILoadWeatherOkAction {
    return {
        type: LOAD_WEATHER_OK,
        payload: {
            forecasts: forecasts,
        }
    }
}

export const LOAD_WEATHER_FAIL = 'LOAD_WEATHER_FAIL';
export type LOAD_WEATHER_FAIL = typeof LOAD_WEATHER_FAIL;
export interface ILoadWeatherFailAction {
    type: LOAD_WEATHER_FAIL;
}
export function LoadWeatherFail(): ILoadWeatherFailAction {
    return {
        type: LOAD_WEATHER_FAIL
    }
}

export type IWeatherAction = ILoadWeatherStartAction | ILoadWeatherOkAction | ILoadWeatherFailAction;


//----------------State---------------------------

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
    forecasts: Array<IDayWeather>;
    //todo: could also store multiple locations
    //eg locations: Array<{location: string, forecasts: IDayWeather}>
}

//----------------Reducers---------------------------

//todo: could use immutablejs for better control/performance
export function reducer(state: IWeatherState, action: IWeatherAction): IWeatherState {
    switch (action.type) {
        case LOAD_WEATHER_START:
            return { ...state, location: action.payload.location, forecasts: [] };
        case LOAD_WEATHER_OK:
            return { ...state, forecasts: action.payload.forecasts };
        case LOAD_WEATHER_FAIL:
            return { ...state, location: "", forecasts: [] };
    }
    return state;
}

//----------------Selectors---------------------------


//----------------Sagas---------------------------


