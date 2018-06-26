import * as React from 'react';
import { connect } from 'react-redux';
import {IDayWeather, IWeatherState} from "../../logic/weather";
import DayWeather from "./DayWeather";

export interface IProps {
    forecasts?: Array<IDayWeather>;
}

class Weather extends React.Component<IProps, object> {
    render() {
        return (
            <div>
                {
                    this.props.forecasts ? this.props.forecasts.map(i => {
                        //todo: key should be record-id
                        return (
                            <DayWeather key={i.day} {...i} />
                        );
                    }) : null
                }
            </div>
        );
    }
}

export function mapStateToProps(props: IWeatherState): IProps {
    return {
        forecasts: props.forecasts,
    }
}

//separate variables for hot reloading + test
const component = Weather;
const connectedcomponent = connect<IProps, IProps, IProps>(mapStateToProps)(component);
//todo: add other HOCs here
export default connectedcomponent;
