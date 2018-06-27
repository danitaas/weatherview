import * as React from "react";
import { connect } from "react-redux";
import { IDayWeather, IWeatherState } from "../../logic/weather";
import DayWeather from "./DayWeather";

export interface IProps {
    forecasts?: IDayWeather[];
}

class Weather extends React.Component<IProps, object> {
    public render() {
        return (
            <div style={{marginTop: 50}}>
                {this.props.forecasts && this.props.forecasts.length > 0
                    ? this.props.forecasts.map(i => {
                          // todo: key should be record-id
                          return <DayWeather key={i.day} {...i} />;
                      })
                    : <div>No results found</div>}
            </div>
        );
    }
}

export function mapStateToProps(props: IWeatherState): IProps {
    return {
        forecasts: props.forecasts,
    };
}

// separate variables for hot reloading + test
const component = Weather;
const connectedcomponent = connect<IProps, IProps, IProps>(mapStateToProps)(component);
// todo: add other HOCs here
export default connectedcomponent;
