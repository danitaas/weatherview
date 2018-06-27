import { getWeather } from './openweather';
// todo: move this to setupTest
(global as any).fetch = require('jest-fetch-mock');

// from https://openweathermap.org/forecast5#name5
const weatherdata = {
    "city": {
        "id": 1851632,
        "name": "London",
        "coord": {"lon": 138.933334, "lat": 34.966671},
        "country": "uk",
        "cod": "200",
        "message": 0.0045,
        "cnt": 38,
        "list": [{
            "dt": 1406106000,
            "main": {
                "temp": 298.77,
                "temp_min": 298.77,
                "temp_max": 298.774,
                "pressure": 1005.93,
                "sea_level": 1018.18,
                "grnd_level": 1005.93,
                "humidity": 87,
                "temp_kf": 0.26
            },
            "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d"}],
            "clouds": {"all": 88},
            "wind": {"speed": 5.71, "deg": 229.501},
            "sys": {"pod": "d"},
            "dt_txt": "2014-07-23 09:00:00"
        }]
    }
};

describe('data github', () => {
    beforeEach(() => {
        (fetch as any).resetMocks()
    });
    it('getWeather fail connection', () => {
        (fetch as any).mockReject(new Error('connection failed'));
        const result = getWeather('London', 'uk').catch(err => {
            expect(err.message).toEqual('connection failed');
        });
        expect((fetch as any).mock.calls.length).toEqual(1);
        expect((fetch as any).mock.calls[0][0]).toEqual('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ca95dcb9f2d52108299b5c16eb278ca8');
        return result;
    });
    it('getWeather fail 500', () => {
        (fetch as any).mockResponseOnce('Server Error', {status: 500});
        const result = getWeather('London', 'uk').catch(err => {
            expect(err).toEqual('Server Error');
        });
        expect((fetch as any).mock.calls.length).toEqual(1);
        expect((fetch as any).mock.calls[0][0]).toEqual('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ca95dcb9f2d52108299b5c16eb278ca8');
        return result;
    });
    it('getWeather London,uk', () => {
        (fetch as any).mockResponseOnce(JSON.stringify(weatherdata));
        const result = getWeather('London', 'uk').then(data => {
            expect(data.city.name).toEqual("London");
            expect(data.city.country).toEqual("uk");
            expect(data.city.list.length).toEqual(1);
        });
        expect((fetch as any).mock.calls.length).toEqual(1);
        expect((fetch as any).mock.calls[0][0]).toEqual('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ca95dcb9f2d52108299b5c16eb278ca8');
        return result;
    });
    it('getWeather bad', () => {
        (fetch as any).mockResponseOnce(JSON.stringify(null));
        const result = getWeather('thisplacedoesnotexists', 'uk').then(data => {
            expect(data).toBeNull();
        });
        expect((fetch as any).mock.calls.length).toEqual(1);
        expect((fetch as any).mock.calls[0][0]).toEqual('http://api.openweathermap.org/data/2.5/weather?q=thisplacedoesnotexists,uk&APPID=ca95dcb9f2d52108299b5c16eb278ca8');
        return result;
    });
});