import * as React from "react";
import "./DayWeather2.css";
import { IDayWeather } from "../../logic/weather";
import * as moment from "moment";
import {
    formatCentigradeFromKelvin,
    formatDegToCard,
    formatFahrenheitFromKelvin,
    formatKMHFromMS,
    formatMPHFromMS,
} from "../../logic/maths";
import WbCloudyIcon from '@material-ui/icons/WbCloudy';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export interface IProps extends Partial<IDayWeather> {}

function DayWeather(props: IProps) {
    if (!props.dt) {
        return <div>Invalid data</div>;
    }

    //could pre-format these in redux
    const mintempstr = props.mintemp
        ? formatCentigradeFromKelvin(props.mintemp) + "°C" + "/" + formatFahrenheitFromKelvin(props.mintemp) + "°F"
        : "Unknown";
    const maxtempstr = props.maxtemp
        ? formatCentigradeFromKelvin(props.maxtemp) + "°C" + "/" + formatFahrenheitFromKelvin(props.maxtemp) + "°F"
        : "Unknown";
    const windspeedstr = props.windspeed
        ? formatKMHFromMS(props.windspeed) + "kmh" + "/" + formatMPHFromMS(props.windspeed) + "mph"
        : "Unknown";
    const winddegstr = props.winddeg ? formatDegToCard(props.winddeg) : "Unknown";
    const windstr = windspeedstr + " " + winddegstr;

    return (
        <div className="DayWeather-container">
            <ExpansionPanel style={{width: '100%'}}>
                <ExpansionPanelSummary style={{}} expandIcon={<ExpandMoreIcon />}>
                    <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                        <div><Typography variant="title">{moment.unix(props.dt).format("dddd DD")}</Typography></div>
                        <div style={{flexGrow: 1, minWidth: 50, flexBasis: 50}} />
                        <div>{props.maxtemp && formatCentigradeFromKelvin(props.maxtemp)}</div>
                        <div style={{marginLeft: 10}}>{props.conditions && props.conditions === "clear sky" ? (<WbSunnyIcon/>) : (<WbCloudyIcon/>)}</div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="DayWeather-container">
                        <div className="DayWeather-item"><Typography variant="body2">Max:&nbsp;{mintempstr}</Typography></div>
                        <div className="DayWeather-item"><Typography variant="body2">Min:&nbsp;{maxtempstr}</Typography></div>
                        <div className="DayWeather-item" style={{display: 'flex', alignItems: 'center'}}>
                            <div>
                                {props.conditions && props.conditions === "clear sky" ? (<WbSunnyIcon/>) : (<WbCloudyIcon/>)}
                            </div>
                            <div style={{marginLeft: 10}}>
                                <Typography variant="body2" style={{display: 'inline-block'}}>{props.conditions}</Typography>
                            </div>
                        </div>
                        <div className="DayWeather-item" style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{transform: "rotateZ(" + props.winddeg + "deg)"}}>
                                <ArrowUpward/>
                            </div>
                            <div style={{marginLeft: 10}}>
                                <Typography variant="body2" style={{display: 'inline-block'}}>{windstr}</Typography>
                            </div>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

export default DayWeather;
