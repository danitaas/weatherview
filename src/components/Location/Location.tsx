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
                    <Paper className={this.props.classes.container}>
                        <div>
                            <TextField
                                id="location"
                                label="Location"
                                className={this.props.classes.textField}
                                value={this.state.location}
                                onChange={this.handleLocationChange}
                                margin="normal"
                            />
                        </div>
                        <div>
                            <FormControl className={this.props.classes.formControl}>
                                <InputLabel htmlFor="age-countrycode">Country</InputLabel>
                                <Select
                                    value={this.state.countrycode}
                                    onChange={this.handleCountryChange}
                                    inputProps={{
                                        name: 'countrycode',
                                        id: 'countrycode',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Choose</em>
                                    </MenuItem>
                                    <MenuItem value={"uk"}>UK</MenuItem>
                                    <MenuItem value={"canada"}>Canada</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <Button type="submit" variant="raised" color="primary">
                                Search
                            </Button>
                        </div>
                    </Paper>
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

export const styles: any = (theme: any) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        maxWidth: 600,
        margin: '0 auto',
        justifyContent: 'space-around',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
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
