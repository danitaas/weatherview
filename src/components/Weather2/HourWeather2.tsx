import * as React from "react";
import "./HourWeather2.css";
import { IDayWeather } from "../../logic/weather";
import * as moment from "moment";
import {
    formatCentigradeFromKelvin,
    formatDegToCard,
    formatFahrenheitFromKelvin,
    formatKMHFromMS,
    formatMPHFromMS,
} from "../../logic/maths";
import Typography from "@material-ui/core/Typography";
import WbCloudyIcon from '@material-ui/icons/WbCloudy';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

export interface IProps extends Partial<IDayWeather> {}

function HourWeather(props: IProps) {
    if (!props.dt) {
        return <div>Invalid data</div>;
    }

    //todo: ideally pre-calc these in redux/reselect
    const mintempstr = props.mintemp
        ? formatCentigradeFromKelvin(props.mintemp) + "°C" + "/" + formatFahrenheitFromKelvin(props.mintemp) + "°F"
        : "Unknown";
    const maxtempstr = props.maxtemp
        ? formatCentigradeFromKelvin(props.maxtemp) + "°C" + "/" + formatFahrenheitFromKelvin(props.maxtemp) + "°F"
        : "Unknown";
    const maxtemp = props.maxtemp ? parseFloat(formatCentigradeFromKelvin(props.maxtemp)) : 0; //todo: this could be better in reselect
    const windspeedstr = props.windspeed
        // ? formatKMHFromMS(props.windspeed) + "kmh" + "/" + formatMPHFromMS(props.windspeed) + "mph"
        ? formatKMHFromMS(props.windspeed)
        : "Unknown";
    const winddegstr = props.winddeg ? formatDegToCard(props.winddeg) : "Unknown";
    const windstr = windspeedstr + " " + winddegstr;

    //{JSON.stringify(i)}

    return (
        <div className="HourWeather-container">
            <div className="HourWeather-item"><Typography variant="body2">{moment.unix(props.dt).format("HHmm")}</Typography></div>
            <div className="HourWeather-item" style={{height: 200}}>
                <div style={{height: 200 * (1 - (maxtemp / 30))}} />
                <div>{props.conditions && props.conditions === "clear sky" ? (<WbSunnyIcon style={{width: 30, height: 30}}/>) : (<WbCloudyIcon style={{width: 30, height: 30}}/>)}</div>
                <Typography variant="body2">{mintempstr}</Typography>
            </div>
            {/*<div className="HourWeather-item"><Typography variant="body1">Min:&nbsp;{maxtempstr}</Typography></div>*/}
            <div className="HourWeather-item" style={{height: 50}}><Typography variant="body1">{props.conditions}</Typography></div>
            {/*<div className="HourWeather-item"><Typography variant="body1">{windstr}</Typography></div>*/}
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={{transform: "rotateZ(" + props.winddeg + "deg)"}}>
                    <ArrowUpward/>
                </div>
                <div style={{marginLeft: 10}}>
                    <Typography variant="body2" style={{display: 'inline-block'}}>{windstr}</Typography>
                </div>
            </div>
        </div>
    );
}

export default HourWeather;
