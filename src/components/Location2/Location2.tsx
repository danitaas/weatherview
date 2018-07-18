import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IWeatherAction, loadWeather, LoadWeatherStart } from "../../logic/weather";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from "@material-ui/core/Paper";
import SearchIcon from '@material-ui/icons/Search';
import {COLOUR_1, COLOUR_1_CONTRAST} from "../../lib/theme";

export interface IProps {
    onSubmit?: any;
    dispatch?: any; // injected by connect()
    classes?: any;
}

export interface IState {
    location: string;
    countrycode: string;
}

export class Location extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { location: "London", countrycode: "uk" };

        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleLocationChange(event: any) {
        console.log("handleLocationChange", event.target.value);
        this.setState({ location: event.target.value });
    }

    private handleCountryChange(event: any) {
        console.log("handleCountryChange", event.target.value);
        this.setState({ countrycode: event.target.value });
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
                    <div className={this.props.classes.container}>
                        <div className={this.props.classes.titlecell}>
                            Weather
                        </div>
                        <div className={this.props.classes.locationcell}>
                            <input placeholder={"Enter location"} className={this.props.classes.textField} id="location" name="location" value={this.state.location} onChange={this.handleLocationChange} />
                        </div>
                        <div className={this.props.classes.countrycell}>
                            <input placeholder={"Enter country code"} className={this.props.classes.textField} id="countrycode" name="countrycode" value={this.state.countrycode} onChange={this.handleCountryChange} />
                        </div>
                        <div className={this.props.classes.searchcell}>
                            <SearchIcon className={this.props.classes.searchField} onClick={this.handleSubmit} />
                        </div>
                    </div>
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

//css-in-js
export const styles: any = (theme: any) => ({
    container: {
        display: 'flex', //for responsive layout
        flexWrap: 'wrap',
        alignItems: 'center',
        //maxWidth: 600,
        margin: '0 auto',
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-around',
        backgroundColor: COLOUR_1,
        color: COLOUR_1_CONTRAST,
        [theme.breakpoints.up('md')]: {
            paddingLeft: 100,
            paddingRight: 100,
        }
    },
    titlecell: {
        textTransform: 'uppercase',
        fontSize: 36,
    },
    locationcell: {
        flexGrow: 1,
        padding: 10
    },
    countrycell: {
        flexGrow: 1,
        padding: 10,
        maxWidth: 120
    },
    searchcell: {
        flexBasis: 90,
        height: 44
    },
    textField: {
        width: '100%',
        height: 44,
        padding: '0px 8px',
        fontFamily: 'Helvetica,Arial,freesans,sans-serif',
        fontSize: 20,
        border: 'none',
    },
    searchField: {
        width: 44,
        height: 44,
        transition: 'transform .2s',
        "&:hover": {
            transform: 'scale(1.5)', //todo: other micro animations
        },
    },
});

// separate variables for hot reloading + test
const component = Location;
const connectedcomponent: any = connect<IProps, IProps, IProps>(
    mapStateToProps,
    mapDispatchToProps
)(component);
const styledcomponent = withStyles(styles)(connectedcomponent);
// todo: add other HOCs here
export default styledcomponent;
