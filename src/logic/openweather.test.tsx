import { getWeather } from "./openweather";
// todo: move this to setupTest
(global as any).fetch = require("jest-fetch-mock");

// from https://openweathermap.org/forecast5#name5
// const weatherdata = {
//     "city": {
//         "id": 1851632,
//         "name": "London",
//         "coord": {"lon": 138.933334, "lat": 34.966671},
//         "country": "uk",
//         "cod": "200",
//         "message": 0.0045,
//         "cnt": 38,
//         "list": [{
//             "dt": 1406106000,
//             "main": {
//                 "temp": 298.77,
//                 "temp_min": 298.77,
//                 "temp_max": 298.774,
//                 "pressure": 1005.93,
//                 "sea_level": 1018.18,
//                 "grnd_level": 1005.93,
//                 "humidity": 87,
//                 "temp_kf": 0.26
//             },
//             "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d"}],
//             "clouds": {"all": 88},
//             "wind": {"speed": 5.71, "deg": 229.501},
//             "sys": {"pod": "d"},
//             "dt_txt": "2014-07-23 09:00:00"
//         }]
//     }
// };

// actual data
const weatherdata = {
    cod: "200",
    message: 0.1756,
    cnt: 40,
    list: [
        {
            dt: 1530100800,
            main: {
                temp: 298.49,
                temp_min: 296.839,
                temp_max: 298.49,
                pressure: 1031.86,
                sea_level: 1039.4,
                grnd_level: 1031.86,
                humidity: 43,
                temp_kf: 1.65,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 4.51, deg: 75.5011 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-27 12:00:00",
        },
        {
            dt: 1530111600,
            main: {
                temp: 298.95,
                temp_min: 297.848,
                temp_max: 298.95,
                pressure: 1031.11,
                sea_level: 1038.58,
                grnd_level: 1031.11,
                humidity: 33,
                temp_kf: 1.1,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 4.45, deg: 71.5015 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-27 15:00:00",
        },
        {
            dt: 1530122400,
            main: {
                temp: 297.06,
                temp_min: 296.505,
                temp_max: 297.06,
                pressure: 1030.65,
                sea_level: 1038.19,
                grnd_level: 1030.65,
                humidity: 31,
                temp_kf: 0.55,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 4.75, deg: 67.5163 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-27 18:00:00",
        },
        {
            dt: 1530133200,
            main: {
                temp: 292.017,
                temp_min: 292.017,
                temp_max: 292.017,
                pressure: 1031.36,
                sea_level: 1038.96,
                grnd_level: 1031.36,
                humidity: 39,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
            clouds: { all: 0 },
            wind: { speed: 4.3, deg: 63.5008 },
            rain: {},
            sys: { pod: "n" },
            dt_txt: "2018-06-27 21:00:00",
        },
        {
            dt: 1530144000,
            main: {
                temp: 288.109,
                temp_min: 288.109,
                temp_max: 288.109,
                pressure: 1031.81,
                sea_level: 1039.4,
                grnd_level: 1031.81,
                humidity: 55,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
            clouds: { all: 0 },
            wind: { speed: 3.46, deg: 54.0003 },
            rain: {},
            sys: { pod: "n" },
            dt_txt: "2018-06-28 00:00:00",
        },
        {
            dt: 1530154800,
            main: {
                temp: 285.567,
                temp_min: 285.567,
                temp_max: 285.567,
                pressure: 1031.37,
                sea_level: 1038.97,
                grnd_level: 1031.37,
                humidity: 83,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
            clouds: { all: 0 },
            wind: { speed: 3.16, deg: 36.506 },
            rain: {},
            sys: { pod: "n" },
            dt_txt: "2018-06-28 03:00:00",
        },
        {
            dt: 1530165600,
            main: {
                temp: 287.413,
                temp_min: 287.413,
                temp_max: 287.413,
                pressure: 1031.48,
                sea_level: 1039.03,
                grnd_level: 1031.48,
                humidity: 86,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 3.03, deg: 36.5005 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-28 06:00:00",
        },
        {
            dt: 1530176400,
            main: {
                temp: 295.328,
                temp_min: 295.328,
                temp_max: 295.328,
                pressure: 1031.56,
                sea_level: 1039.11,
                grnd_level: 1031.56,
                humidity: 57,
                temp_kf: 0,
            },
            weather: [{ id: 801, main: "Clouds", description: "few clouds", icon: "02d" }],
            clouds: { all: 20 },
            wind: { speed: 3.11, deg: 47.5002 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-28 09:00:00",
        },
        {
            dt: 1530187200,
            main: {
                temp: 298.785,
                temp_min: 298.785,
                temp_max: 298.785,
                pressure: 1030.54,
                sea_level: 1038.01,
                grnd_level: 1030.54,
                humidity: 46,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "02d" }],
            clouds: { all: 8 },
            wind: { speed: 5.05, deg: 71.0006 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-28 12:00:00",
        },
        {
            dt: 1530198000,
            main: {
                temp: 298.571,
                temp_min: 298.571,
                temp_max: 298.571,
                pressure: 1029.72,
                sea_level: 1037.14,
                grnd_level: 1029.72,
                humidity: 39,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 5.61, deg: 70.5014 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-28 15:00:00",
        },
        {
            dt: 1530208800,
            main: {
                temp: 297.207,
                temp_min: 297.207,
                temp_max: 297.207,
                pressure: 1029.39,
                sea_level: 1036.82,
                grnd_level: 1029.39,
                humidity: 37,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 5.54, deg: 69.0029 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-28 18:00:00",
        },
        {
            dt: 1530219600,
            main: {
                temp: 293.516,
                temp_min: 293.516,
                temp_max: 293.516,
                pressure: 1030.17,
                sea_level: 1037.7,
                grnd_level: 1030.17,
                humidity: 49,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
            clouds: { all: 0 },
            wind: { speed: 4.3, deg: 67.0026 },
            rain: {},
            sys: { pod: "n" },
            dt_txt: "2018-06-28 21:00:00",
        },
        {
            dt: 1530230400,
            main: {
                temp: 290.461,
                temp_min: 290.461,
                temp_max: 290.461,
                pressure: 1030.53,
                sea_level: 1038.01,
                grnd_level: 1030.53,
                humidity: 60,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
            clouds: { all: 0 },
            wind: { speed: 3.97, deg: 53.5009 },
            rain: {},
            sys: { pod: "n" },
            dt_txt: "2018-06-29 00:00:00",
        },
        {
            dt: 1530241200,
            main: {
                temp: 288.262,
                temp_min: 288.262,
                temp_max: 288.262,
                pressure: 1030.26,
                sea_level: 1037.8,
                grnd_level: 1030.26,
                humidity: 70,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
            clouds: { all: 0 },
            wind: { speed: 3.56, deg: 45.501 },
            rain: {},
            sys: { pod: "n" },
            dt_txt: "2018-06-29 03:00:00",
        },
        {
            dt: 1530252000,
            main: {
                temp: 289.039,
                temp_min: 289.039,
                temp_max: 289.039,
                pressure: 1030.09,
                sea_level: 1037.64,
                grnd_level: 1030.09,
                humidity: 73,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 3.68, deg: 44.003 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-29 06:00:00",
        },
        {
            dt: 1530262800,
            main: {
                temp: 295.22,
                temp_min: 295.22,
                temp_max: 295.22,
                pressure: 1029.51,
                sea_level: 1036.98,
                grnd_level: 1029.51,
                humidity: 52,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 4.21, deg: 52.0022 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-29 09:00:00",
        },
        {
            dt: 1530273600,
            main: {
                temp: 298.226,
                temp_min: 298.226,
                temp_max: 298.226,
                pressure: 1028.41,
                sea_level: 1035.88,
                grnd_level: 1028.41,
                humidity: 45,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 5.17, deg: 58.5018 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-29 12:00:00",
        },
        {
            dt: 1530284400,
            main: {
                temp: 298.59,
                temp_min: 298.59,
                temp_max: 298.59,
                pressure: 1027.13,
                sea_level: 1034.62,
                grnd_level: 1027.13,
                humidity: 36,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 5.62, deg: 64.0005 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-29 15:00:00",
        },
        {
            dt: 1530295200,
            main: {
                temp: 298.018,
                temp_min: 298.018,
                temp_max: 298.018,
                pressure: 1025.78,
                sea_level: 1033.43,
                grnd_level: 1025.78,
                humidity: 38,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 5.48, deg: 56 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-29 18:00:00",
        },
        {
            dt: 1530306000,
            main: {
                temp: 293.705,
                temp_min: 293.705,
                temp_max: 293.705,
                pressure: 1026.17,
                sea_level: 1033.76,
                grnd_level: 1026.17,
                humidity: 45,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
            clouds: { all: 0 },
            wind: { speed: 4.83, deg: 54.5053 },
            rain: {},
            sys: { pod: "n" },
            dt_txt: "2018-06-29 21:00:00",
        },
        {
            dt: 1530316800,
            main: {
                temp: 288.927,
                temp_min: 288.927,
                temp_max: 288.927,
                pressure: 1026.19,
                sea_level: 1033.79,
                grnd_level: 1026.19,
                humidity: 45,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
            clouds: { all: 0 },
            wind: { speed: 3.76, deg: 45.502 },
            rain: {},
            sys: { pod: "n" },
            dt_txt: "2018-06-30 00:00:00",
        },
        {
            dt: 1530327600,
            main: {
                temp: 285.592,
                temp_min: 285.592,
                temp_max: 285.592,
                pressure: 1025.35,
                sea_level: 1032.87,
                grnd_level: 1025.35,
                humidity: 76,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
            clouds: { all: 0 },
            wind: { speed: 3.45, deg: 35.5051 },
            rain: {},
            sys: { pod: "n" },
            dt_txt: "2018-06-30 03:00:00",
        },
        {
            dt: 1530338400,
            main: {
                temp: 286.761,
                temp_min: 286.761,
                temp_max: 286.761,
                pressure: 1024.38,
                sea_level: 1031.9,
                grnd_level: 1024.38,
                humidity: 88,
                temp_kf: 0,
            },
            weather: [{ id: 500, main: "Rain", description: "light rain", icon: "10d" }],
            clouds: { all: 56 },
            wind: { speed: 3.6, deg: 46.5008 },
            rain: { "3h": 0.0075 },
            sys: { pod: "d" },
            dt_txt: "2018-06-30 06:00:00",
        },
        {
            dt: 1530349200,
            main: {
                temp: 293.877,
                temp_min: 293.877,
                temp_max: 293.877,
                pressure: 1023.46,
                sea_level: 1030.83,
                grnd_level: 1023.46,
                humidity: 59,
                temp_kf: 0,
            },
            weather: [{ id: 500, main: "Rain", description: "light rain", icon: "10d" }],
            clouds: { all: 0 },
            wind: { speed: 4.17, deg: 75.0015 },
            rain: { "3h": 0.02 },
            sys: { pod: "d" },
            dt_txt: "2018-06-30 09:00:00",
        },
        {
            dt: 1530360000,
            main: {
                temp: 297.637,
                temp_min: 297.637,
                temp_max: 297.637,
                pressure: 1022.29,
                sea_level: 1029.63,
                grnd_level: 1022.29,
                humidity: 46,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 5.66, deg: 88.003 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-30 12:00:00",
        },
        {
            dt: 1530370800,
            main: {
                temp: 298.151,
                temp_min: 298.151,
                temp_max: 298.151,
                pressure: 1021.22,
                sea_level: 1028.59,
                grnd_level: 1021.22,
                humidity: 42,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 5.97, deg: 89.0013 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-30 15:00:00",
        },
        {
            dt: 1530381600,
            main: {
                temp: 296.65,
                temp_min: 296.65,
                temp_max: 296.65,
                pressure: 1020.65,
                sea_level: 1027.94,
                grnd_level: 1020.65,
                humidity: 43,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
            clouds: { all: 0 },
            wind: { speed: 5.55, deg: 87.5052 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-06-30 18:00:00",
        },
        {
            dt: 1530392400,
            main: {
                temp: 293.811,
                temp_min: 293.811,
                temp_max: 293.811,
                pressure: 1020.22,
                sea_level: 1027.71,
                grnd_level: 1020.22,
                humidity: 54,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
            clouds: { all: 0 },
            wind: { speed: 4.71, deg: 77.0079 },
            rain: {},
            sys: { pod: "n" },
            dt_txt: "2018-06-30 21:00:00",
        },
        {
            dt: 1530403200,
            main: {
                temp: 292.638,
                temp_min: 292.638,
                temp_max: 292.638,
                pressure: 1019.11,
                sea_level: 1026.58,
                grnd_level: 1019.11,
                humidity: 61,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "02n" }],
            clouds: { all: 8 },
            wind: { speed: 4.5, deg: 79.5004 },
            rain: {},
            sys: { pod: "n" },
            dt_txt: "2018-07-01 00:00:00",
        },
        {
            dt: 1530414000,
            main: {
                temp: 292.591,
                temp_min: 292.591,
                temp_max: 292.591,
                pressure: 1018.66,
                sea_level: 1026.04,
                grnd_level: 1018.66,
                humidity: 66,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01n" }],
            clouds: { all: 0 },
            wind: { speed: 5.32, deg: 92.0004 },
            rain: {},
            sys: { pod: "n" },
            dt_txt: "2018-07-01 03:00:00",
        },
        {
            dt: 1530424800,
            main: {
                temp: 293.679,
                temp_min: 293.679,
                temp_max: 293.679,
                pressure: 1018.3,
                sea_level: 1025.68,
                grnd_level: 1018.3,
                humidity: 59,
                temp_kf: 0,
            },
            weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "02d" }],
            clouds: { all: 8 },
            wind: { speed: 5.81, deg: 92.0021 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-07-01 06:00:00",
        },
        {
            dt: 1530435600,
            main: {
                temp: 296.873,
                temp_min: 296.873,
                temp_max: 296.873,
                pressure: 1018.2,
                sea_level: 1025.57,
                grnd_level: 1018.2,
                humidity: 49,
                temp_kf: 0,
            },
            weather: [{ id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" }],
            clouds: { all: 36 },
            wind: { speed: 6.57, deg: 93.0041 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-07-01 09:00:00",
        },
        {
            dt: 1530446400,
            main: {
                temp: 298.774,
                temp_min: 298.774,
                temp_max: 298.774,
                pressure: 1018.32,
                sea_level: 1025.63,
                grnd_level: 1018.32,
                humidity: 45,
                temp_kf: 0,
            },
            weather: [{ id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }],
            clouds: { all: 80 },
            wind: { speed: 6.31, deg: 100.006 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-07-01 12:00:00",
        },
        {
            dt: 1530457200,
            main: {
                temp: 298.57,
                temp_min: 298.57,
                temp_max: 298.57,
                pressure: 1017.59,
                sea_level: 1024.81,
                grnd_level: 1017.59,
                humidity: 45,
                temp_kf: 0,
            },
            weather: [{ id: 803, main: "Clouds", description: "broken clouds", icon: "04d" }],
            clouds: { all: 80 },
            wind: { speed: 6.02, deg: 95.0042 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-07-01 15:00:00",
        },
        {
            dt: 1530468000,
            main: {
                temp: 300.119,
                temp_min: 300.119,
                temp_max: 300.119,
                pressure: 1017.13,
                sea_level: 1024.51,
                grnd_level: 1017.13,
                humidity: 43,
                temp_kf: 0,
            },
            weather: [{ id: 500, main: "Rain", description: "light rain", icon: "10d" }],
            clouds: { all: 44 },
            wind: { speed: 6.4, deg: 91.0031 },
            rain: { "3h": 0.07 },
            sys: { pod: "d" },
            dt_txt: "2018-07-01 18:00:00",
        },
        {
            dt: 1530478800,
            main: {
                temp: 293.795,
                temp_min: 293.795,
                temp_max: 293.795,
                pressure: 1018.3,
                sea_level: 1025.62,
                grnd_level: 1018.3,
                humidity: 79,
                temp_kf: 0,
            },
            weather: [{ id: 501, main: "Rain", description: "moderate rain", icon: "10n" }],
            clouds: { all: 56 },
            wind: { speed: 5.2, deg: 92.5043 },
            rain: { "3h": 4.27 },
            sys: { pod: "n" },
            dt_txt: "2018-07-01 21:00:00",
        },
        {
            dt: 1530489600,
            main: {
                temp: 291.429,
                temp_min: 291.429,
                temp_max: 291.429,
                pressure: 1018.79,
                sea_level: 1026.17,
                grnd_level: 1018.79,
                humidity: 93,
                temp_kf: 0,
            },
            weather: [{ id: 501, main: "Rain", description: "moderate rain", icon: "10n" }],
            clouds: { all: 48 },
            wind: { speed: 4.36, deg: 95.004 },
            rain: { "3h": 5.69 },
            sys: { pod: "n" },
            dt_txt: "2018-07-02 00:00:00",
        },
        {
            dt: 1530500400,
            main: {
                temp: 290.87,
                temp_min: 290.87,
                temp_max: 290.87,
                pressure: 1018.29,
                sea_level: 1025.75,
                grnd_level: 1018.29,
                humidity: 89,
                temp_kf: 0,
            },
            weather: [{ id: 500, main: "Rain", description: "light rain", icon: "10n" }],
            clouds: { all: 20 },
            wind: { speed: 4.57, deg: 83.5078 },
            rain: { "3h": 1.79 },
            sys: { pod: "n" },
            dt_txt: "2018-07-02 03:00:00",
        },
        {
            dt: 1530511200,
            main: {
                temp: 291.51,
                temp_min: 291.51,
                temp_max: 291.51,
                pressure: 1018.83,
                sea_level: 1026.22,
                grnd_level: 1018.83,
                humidity: 85,
                temp_kf: 0,
            },
            weather: [{ id: 801, main: "Clouds", description: "few clouds", icon: "02d" }],
            clouds: { all: 20 },
            wind: { speed: 4.91, deg: 88.5034 },
            rain: {},
            sys: { pod: "d" },
            dt_txt: "2018-07-02 06:00:00",
        },
        {
            dt: 1530522000,
            main: {
                temp: 294.481,
                temp_min: 294.481,
                temp_max: 294.481,
                pressure: 1019.73,
                sea_level: 1027.06,
                grnd_level: 1019.73,
                humidity: 87,
                temp_kf: 0,
            },
            weather: [{ id: 500, main: "Rain", description: "light rain", icon: "10d" }],
            clouds: { all: 48 },
            wind: { speed: 4.86, deg: 98.0009 },
            rain: { "3h": 0.23 },
            sys: { pod: "d" },
            dt_txt: "2018-07-02 09:00:00",
        },
    ],
    city: { id: 2643743, name: "London", coord: { lat: 51.5085, lon: -0.1258 }, country: "GB", population: 1000000 },
};

describe("data github", () => {
    beforeEach(() => {
        (fetch as any).resetMocks();
    });
    it("getWeather fail connection", () => {
        (fetch as any).mockReject(new Error("connection failed"));
        const result = getWeather("London", "uk").catch(err => {
            expect(err.message).toEqual("connection failed");
        });
        expect((fetch as any).mock.calls.length).toEqual(1);
        expect((fetch as any).mock.calls[0][0]).toEqual(
            "http://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=ca95dcb9f2d52108299b5c16eb278ca8"
        );
        return result;
    });
    it("getWeather fail 500", () => {
        (fetch as any).mockResponseOnce("Server Error", { status: 500 });
        const result = getWeather("London", "uk").catch(err => {
            expect(err).toEqual("Server Error");
        });
        expect((fetch as any).mock.calls.length).toEqual(1);
        expect((fetch as any).mock.calls[0][0]).toEqual(
            "http://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=ca95dcb9f2d52108299b5c16eb278ca8"
        );
        return result;
    });
    it("getWeather London,uk", () => {
        (fetch as any).mockResponseOnce(JSON.stringify(weatherdata));
        const result = getWeather("London", "uk").then(data => {
            expect(data.city.name).toEqual("London");
            expect(data.city.country).toEqual("GB");
            expect(data.list.length).toEqual(40);
        });
        expect((fetch as any).mock.calls.length).toEqual(1);
        expect((fetch as any).mock.calls[0][0]).toEqual(
            "http://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=ca95dcb9f2d52108299b5c16eb278ca8"
        );
        return result;
    });
    it("getWeather bad", () => {
        (fetch as any).mockResponseOnce(JSON.stringify(null));
        const result = getWeather("thisplacedoesnotexists", "uk").then(data => {
            expect(data).toBeNull();
        });
        expect((fetch as any).mock.calls.length).toEqual(1);
        expect((fetch as any).mock.calls[0][0]).toEqual(
            "http://api.openweathermap.org/data/2.5/forecast?q=thisplacedoesnotexists,uk&APPID=ca95dcb9f2d52108299b5c16eb278ca8"
        );
        return result;
    });
});
