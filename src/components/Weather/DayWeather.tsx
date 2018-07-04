import * as React from "react";
import "./DayWeather.css";
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
import Typography from '@material-ui/core/Typography';

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
    const winddegstr = props.windspeed ? formatDegToCard(props.windspeed) : "Unknown";
    const windstr = windspeedstr + " " + winddegstr;

    return (
        <div className="DayWeather-container">
            <div className="DayWeather-item"><Typography variant="title">{moment.unix(props.dt).format("dddd DD")}</Typography></div>
            <div className="DayWeather-item"><Typography variant="body2">Max:&nbsp;{mintempstr}</Typography></div>
            <div className="DayWeather-item"><Typography variant="body2">Min:&nbsp;{maxtempstr}</Typography></div>
            { /* todo: flex layout */}
            <div className="DayWeather-item" style={{display: 'flex', alignItems: 'center'}}>
                <div>
                    {props.conditions && props.conditions === "clear sky" ? (<WbSunnyIcon/>) : (<WbCloudyIcon />)}
                </div>
                <div style={{marginLeft: 10}}>
                    <Typography variant="body2" style={{display: 'inline-block'}}>{props.conditions}</Typography>
                </div>
            </div>
            <div className="DayWeather-item"><Typography variant="body2">{windstr}</Typography></div>
        </div>
    );
}

export default DayWeather;
