import * as React from "react";
import { connect } from "react-redux";
import { IDayWeather, IWeatherState, SelectDay, selectDayForecasts, selectWeekForecasts } from "../../logic/weather";
import DayWeather from "./DayWeather2";
import "./Weather2.css";
import HourWeather from "./HourWeather2";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import DialogTitle from '@material-ui/core/DialogTitle';
import * as moment from "moment";

export interface IProps {
    weekforecasts?: IDayWeather[];
    dayforecasts?: IDayWeather[];
    currentday?: string;
    dispatch?: any;
}

export interface IState {

}

export class Weather extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick(dt: number) {
        console.log("handleClick", dt);

        //could be actioncreator injected by connect or inline
        this.props.dispatch(SelectDay(dt));
    }

    public render() {
        let currentdata: any = this.props.weekforecasts && this.props.weekforecasts.filter(i => this.props.currentday === moment.unix(i.dt).format("YYYY-MM-DD"));
        if(currentdata) { //todo: polyfil array.find
            currentdata = currentdata[0];
        }

        return (
            <div className="Weather-container">
                {this.props.weekforecasts && this.props.weekforecasts.length > 0 ? (
                    <div key={"dayitems"} className="Weather-dayitems"> {
                        this.props.weekforecasts.map(i => {
                            return (
                                // todo: key should ideally be unique record-id
                                /*
                                NOTE: as per latest guidance lambdas are okay in JSX
                                https://reactjs.org/docs/faq-functions.html#is-it-ok-to-use-arrow-functions-in-render-methods
                                however as number of components increases, eg large lists
                                an alternative can be to add sub-component, with bound methods, or use curried cached methods
                                */
                                <div key={"dayitem" + i.dt} onClick={() => this.handleClick(i.dt)}>
                                    { /* todo: cache this */}
                                    <DayWeather {...i} active={this.props.currentday === moment.unix(i.dt).format("YYYY-MM-DD")} />
                                </div>
                            );
                        })
                    }
                    </div>
                ) : (
                    <div key={"dayitems-none"} style={{width: 200, margin: '0 auto', padding: 50}}>
                        <Typography variant="subheading">
                            No results found
                        </Typography>
                    </div>
                )}

                {
                    currentdata ? (
                        <div>
                            <div style={{width: 200, margin: '0 auto'}}>
                                <DayWeather {...currentdata} variant={"large"} />
                            </div>
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
                    ) : null
                }
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
