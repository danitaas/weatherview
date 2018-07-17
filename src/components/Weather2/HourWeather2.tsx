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

export interface IProps extends Partial<IDayWeather> {}

function HourWeather(props: IProps) {
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

    //{JSON.stringify(i)}

    return (
        <div className="HourWeather-container">
            <div className="HourWeather-item"><Typography variant="title">{moment.unix(props.dt).format("HH:mm")}</Typography></div>
            <div className="HourWeather-item"><Typography variant="body2">Max:&nbsp;{mintempstr}</Typography></div>
            <div className="HourWeather-item"><Typography variant="body2">Min:&nbsp;{maxtempstr}</Typography></div>
            <div className="HourWeather-item"><Typography variant="body2">{props.conditions}</Typography></div>
            <div className="HourWeather-item"><Typography variant="body2">{windstr}</Typography></div>
        </div>
    );
}

export default HourWeather;
