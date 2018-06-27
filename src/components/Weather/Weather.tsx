import * as React from "react";
import { connect } from "react-redux";
import { IDayWeather, IWeatherState, SelectDay, selectDayForecasts, selectWeekForecasts } from "../../logic/weather";
import DayWeather from "./DayWeather";
import "./Weather.css";
import HourWeather from "./HourWeather";

export interface IProps {
    weekforecasts?: IDayWeather[];
    dayforecasts?: IDayWeather[];
    currentday?: string;
    dispatch?: any;
}

export class Weather extends React.Component<IProps, object> {
    constructor(props: IProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick(dt: number) {
        console.log("handleClick", dt);;

        //could be actioncreator injected by connect or inline
        this.props.dispatch(SelectDay(dt));
    }

    public render() {
        return (
            <div className="Weather-container">
                <div className="Weather-dayitems">
                    {this.props.weekforecasts && this.props.weekforecasts.length > 0 ? (
                        this.props.weekforecasts.map(i => {
                            return (
                                // todo: key should be record-id
                                <div key={"dayitem" + i.dt} className="Weather-dayitem">
                                    <DayWeather {...i} />
                                    <div>
                                        {/*
                                    NOTE: as per latest guidance lambdas are okay in JSX
                                    https://reactjs.org/docs/faq-functions.html#is-it-ok-to-use-arrow-functions-in-render-methods
                                    however as number of components increases, eg large lists
                                    an alternative can be to add sub-component, with bound methods, or use curried cached methods
                                    */}
                                        <button onClick={() => this.handleClick(i.dt)}>Show hourly</button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>No results found</div>
                    )}
                </div>
                <div className="Weather-day">
                    <div>Selected Day: {this.props.currentday}</div>
                    <div className="Weather-houritems">
                        {this.props.dayforecasts && this.props.dayforecasts.length > 0
                            ? this.props.dayforecasts.map(i => {
                                  return (
                                      // todo: key should be record-id
                                      <div key={"houritem" + i.dt} className="Weather-houritem">
                                          <HourWeather {...i} />
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

export function mapStateToProps(state: IWeatherState): IProps {
    return {
        weekforecasts: selectWeekForecasts(state),
        dayforecasts: selectDayForecasts(state),
        currentday: state.currentday,
    };
}

// separate variables for hot reloading + test
const component = Weather;
const connectedcomponent = connect<IProps, IProps, IProps>(mapStateToProps)(component);
// todo: add other HOCs here
export default connectedcomponent;
