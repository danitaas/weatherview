import * as React from 'react';
import './DayWeather.css';
import {IDayWeather} from "../../types";

export interface IProps extends IDayWeather {

}

function DayWeather(props: IProps) {
    if (props.day == "error") {
        throw new Error('An error occured');
    }
    return (
        <div className="DayWeather-container">
            <div className="DayWeather-item">
                <div>{props.day}</div>
                <div>{props.mintemp}</div>
                <div>{props.maxtemp}</div>
                <div>{props.conditions}</div>
                <div>{props.wind}</div>
            </div>
        </div>
    );
}

export default DayWeather;
