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
    dialogopen: boolean;
}

export class Weather extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            dialogopen: false,
        };
    }

    private handleClick(dt: number) {
        console.log("handleClick", dt);

        this.setState({
            dialogopen: true,
        });

        //could be actioncreator injected by connect or inline
        this.props.dispatch(SelectDay(dt));
    }

    public render() {
        return (
            <div className="Weather-container">
                {this.props.weekforecasts && this.props.weekforecasts.length > 0 ? (
                    <div key={"dayitems"} className="Weather-dayitems"> {
                        this.props.weekforecasts.map(i => {
                            return (
                                // todo: key should be record-id
                                <div key={"dayitem" + i.dt} className="Weather-dayitem">
                                    <Paper>
                                        <DayWeather {...i} />
                                        <div style={{textAlign: 'right', padding: 8}}>
                                            {/*
                                        NOTE: as per latest guidance lambdas are okay in JSX
                                        https://reactjs.org/docs/faq-functions.html#is-it-ok-to-use-arrow-functions-in-render-methods
                                        however as number of components increases, eg large lists
                                        an alternative can be to add sub-component, with bound methods, or use curried cached methods
                                        */}
                                            <Button variant={"raised"} color="secondary"
                                                    onClick={() => this.handleClick(i.dt)}>Show hourly</Button>
                                        </div>
                                    </Paper>
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

                    {/*<DialogTitle>Daily Forecast: {moment(this.props.currentday).format("dddd DD")}</DialogTitle>*/}
                        {/*<div className="Weather-day">*/}
                            {/*<div className="Weather-houritems">*/}
                                {/*{this.props.dayforecasts && this.props.dayforecasts.length > 0*/}
                                    {/*? this.props.dayforecasts.map(i => {*/}
                                        {/*return (*/}
                                            {/*// todo: key should be record-id*/}
                                            {/*<div key={"houritem" + i.dt} className="Weather-houritem">*/}
                                                {/*<Paper>*/}
                                                    {/*<HourWeather {...i} />*/}
                                                {/*</Paper>*/}
                                            {/*</div>*/}
                                        {/*);*/}
                                    {/*})*/}
                                    {/*: null}*/}
                            {/*</div>*/}
                        {/*</div>*/}
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
