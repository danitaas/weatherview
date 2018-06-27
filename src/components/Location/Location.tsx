import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IWeatherAction, loadWeather, LoadWeatherStart } from "../../logic/weather";

export interface IProps {
    onSubmit?: any;
    dispatch?: any; // injected by connect()
}

export interface IState {
    location: string;
    countrycode: string;
}

export class Location extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { location: "London", countrycode: "uk" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(event: any) {
        this.setState({ location: event.target.value });
    }

    private handleSubmit(event: any) {
        console.log("handleSubmit");
        if(event) {
            event.preventDefault();
        }

        //could be actioncreator injected by connect or inline
        // this.props.onSubmit(LoadWeatherStart(this.state.location, this.state.countrycode));
        // this.props.dispatch(loadWeather(this.state.location, this.state.countrycode));
        this.props.onSubmit(this.state.location, this.state.countrycode);
    }

    public render() {
        return (
            <div>
                <form id="searchform" onSubmit={this.handleSubmit}>
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

export function mapStateToProps(state: any) {
    return {
        // todo: could bind initial location/country code from redux state
    };
}

export function mapDispatchToProps(dispatch: any) {
    return {
        onSubmit: (location: string, countrycode: string) => {
            //todo: use redux-saga to control async logic
            dispatch(LoadWeatherStart(location, countrycode));
            dispatch(loadWeather(location, countrycode));
        },
        dispatch,
    };
}

// separate variables for hot reloading + test
const component = Location;
const connectedcomponent = connect<IProps, IProps, IProps>(
    mapStateToProps,
    mapDispatchToProps
)(component);
// todo: add other HOCs here
export default connectedcomponent;
