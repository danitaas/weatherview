

// todo: simple app specific wrapper for fetch, ideally shared
export function safefetch(url: string, options?: any) {
    const promise = fetch(url, options)
        .then((response) => {
                if (200 <= response.status && response.status < 300) {
                    return response.json();
                } else {
                    console.error("fetch2 - bad response");
                    return response.text().then((errtext) => {
                        console.error("fetch2 - errtext - " + errtext);
                        return Promise.reject(errtext);
                    });
                }
            },
            error => {
                console.error("fetch2 - connection error");
                return Promise.reject(error);
            }
        )
        .then(json => {
            return Promise.resolve(json);
        });

    // todo: handle client-side timeout with Promise.race

    return promise;
}

//todo: from env var, dont commit to source in a real project!!! use a secret
const apikey = 'b1af31852368e2ca499486ef04f892ad';

export function getWeather(location: string, countrycode: string) {
    //const url = `http://samples.openweathermap.org/data/2.5/forecast?q=${location},${countrycode}&mode=json`;
    //const url = `https://owm.io/data/2.5/forecast?q=${location},${countrycode}&mode=xml&appid=${apikey}`;
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location},${countrycode}&mode=xml&appid=${apikey}`;
    console.log("getWeather", url);
    return safefetch(url).then(json => {
        // todo: any extra logging/transform
        return json;
    });
}

