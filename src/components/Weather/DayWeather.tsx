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
            <div className="DayWeather-item">{moment.unix(props.dt).format("dddd DD")}</div>
            <div className="DayWeather-item">{mintempstr}</div>
            <div className="DayWeather-item">{maxtempstr}</div>
            <div className="DayWeather-item">{props.conditions}</div>
            <div className="DayWeather-item">{windstr}</div>
        </div>
    );
}

export default DayWeather;
