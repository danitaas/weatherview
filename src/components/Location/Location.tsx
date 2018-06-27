import * as React from "react";
import { connect } from "react-redux";
import {Dispatch} from "redux";
import {IWeatherAction, loadWeather, LoadWeatherStart} from "../../logic/weather";

export interface IProps {
    dispatch?: any; // injected by connect()
}

export interface IState {
    location: string;
    countrycode: string;
}


class Location extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {location: '', countrycode: 'uk'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(event: any) {
        this.setState({location: event.target.value});
    }

    private handleSubmit(event: any) {
        console.log("handleSubmit");
        event.preventDefault();

        //todo: use redux-saga to control async logic
        this.props.dispatch(LoadWeatherStart(this.state.location, this.state.countrycode));
        this.props.dispatch(loadWeather(this.state.location, this.state.countrycode));
    }

    public render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Location:
                        <input type="text" value={this.state.location} onChange={this.handleChange} />
                    </label>
                    <label>
                        Country Code:
                        <input type="text" value={this.state.countrycode} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export function mapStateToProps(props: any) {
    return {
        // todo: could bind initial location/country code from redux state
    }
}

export function mapDispatchToProps(dispatch: Dispatch<IWeatherAction>) {
    return {
        //onSearch: (event) => dispatch(LoadWeatherStart()),
        dispatch,
    }
}

// separate variables for hot reloading + test
const component = Location;
const connectedcomponent = connect<IProps, IProps, IProps>(mapStateToProps, mapDispatchToProps)(component);
// todo: add other HOCs here
export default connectedcomponent;
