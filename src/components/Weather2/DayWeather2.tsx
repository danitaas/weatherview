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
const classNames = require('classnames');

export interface IProps extends Partial<IDayWeather> {
    active?: boolean;
    variant?: "small"|"large";
}

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

    //todo: have combined layouts for simplicity, could eventaully split into seperate component/compositions, though dont refactor too early
    if(props.variant === "large") {
        return (
            <div key={"large"} className={classNames({
                'DayWeather-item': true,
                'DayWeather-item-large': true,
            })}>
                <div><Typography variant="title">{moment.unix(props.dt).format("ddd DD")}</Typography></div>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    <div style={{
                        textAlign: 'left',
                        marginLeft: 1,
                        flexGrow: 1,
                        color: '#a5a5a5'
                    }}>{props.conditions && props.conditions === "clear sky" ? (<WbSunnyIcon style={{width: 40, height: 40}}/>) : (<WbCloudyIcon style={{width: 40, height: 40}}/>)}</div>
                    <div style={{textAlign: 'right', marginRight: 1}}>
                        <div style={{fontWeight: 600}}>{props.maxtemp && formatCentigradeFromKelvin(props.maxtemp)}&deg;</div>
                        <div>{props.mintemp && formatCentigradeFromKelvin(props.mintemp)}&deg;</div>
                    </div>
                    <div style={{marginLeft: 10, width: 70}}>
                        <Typography variant="body2" style={{display: 'inline-block'}}>{props.conditions}</Typography>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div key={"small"} className={classNames({
            'DayWeather-item': true,
            'DayWeather-item-active': props.active,
        })}>
            <div className="DayWeather-item-short"><Typography variant="body1">{moment.unix(props.dt).format("DD")}</Typography></div>
            <div className="DayWeather-item-long"><Typography variant="body1">{moment.unix(props.dt).format("ddd DD")}</Typography></div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                <div style={{
                    textAlign: 'left',
                    marginLeft: 1,
                    flexGrow: 1,
                    color: '#a5a5a5'
                }}>{props.conditions && props.conditions === "clear sky" ? (<WbSunnyIcon style={{width: 30, height: 30}}/>) : (<WbCloudyIcon style={{width: 30, height: 30}}/>)}</div>
                <div style={{textAlign: 'right', marginRight: 1}}>
                    <div style={{fontWeight: 600}}>{props.maxtemp && formatCentigradeFromKelvin(props.maxtemp)}&deg;</div>
                    <div>{props.mintemp && formatCentigradeFromKelvin(props.mintemp)}&deg;</div>
                </div>
            </div>
        </div>
    );
}

export default DayWeather;
