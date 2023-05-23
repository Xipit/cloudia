import { writable, type Writable } from "svelte/store";

// variable list to categorise weather condition
const cloudList = [
    'Cloudy',
    'cloudy', 
    'Overcast', 
    'Fog', 
    'fog', 
    'Mist'
];
const rainList = [
    'rain', 
    'drizzle'
];
const snowList = [
    'snow', 
    'sleet', 
    'ice', 
    'Blizzard'
];
const stormList = [
    'thunder', 
    'Thundery'
];
const sunList = [
    'Clear', 
    'Sunny'
];

// -> https://www.weatherapi.com/docs/weather_conditions.xml
export enum GeneralWeatherCondition {
    cloud   = "cloud",
    rain    = "rain",
    snow    = "snow",
    storm   = "storm",
    sun     = "sun",
    undefined = "undefined"
}

export function generaliseWeatherCondition (weatherCondition:string):GeneralWeatherCondition {
    // check if variable list is part of weathercondition
    const isCloud:boolean   = cloudList.some((text) =>  weatherCondition.includes(text));
    const isRain:boolean    = rainList.some((text) =>   weatherCondition.includes(text));
    const isSnow:boolean    = snowList.some((text) =>   weatherCondition.includes(text));
    const isStorm:boolean   = stormList.some((text) =>  weatherCondition.includes(text));
    const isSun:boolean     = sunList.some((text) =>    weatherCondition.includes(text));

    // thunder is more important in conditions, such as:
    // "Patchy light rain with thunder"
    // therefore it gets checked first
    if(isStorm)
        return GeneralWeatherCondition.storm;
    
    if(isCloud)
        return GeneralWeatherCondition.cloud;

    if(isRain)
        return GeneralWeatherCondition.rain;

    if(isSnow)
        return GeneralWeatherCondition.snow;

    if(isSun)
        return GeneralWeatherCondition.sun;

    // default, should never be reached
    console.error('Tried to generalise unknown weather condition. Using "sun" as default for styling.');
    return GeneralWeatherCondition.sun;
}


export function createGeneralisedWeatherCondition(initialValue:GeneralWeatherCondition):Writable<GeneralWeatherCondition> {
    const { subscribe, set, update } = writable(initialValue);

    return{
        subscribe,
        set: (value:GeneralWeatherCondition) => {
            // always set the html data-theme when changing weather conditions
            set(value);
            document.documentElement.setAttribute('data-theme', value);
        },
        update: update
    }
}

export function createDaysInToTheFuture(initialValue:number):Writable<number> {
    const { subscribe, set, update } = writable(initialValue);

    return{
        subscribe,
        set: (value:number) => {
            // clamp between 0 and 2  -> weatherAPI only sends us 3 days
            // this prevents outside interference and assurs that only allowed values can be set
            set(clampDaysInToTheFuture(value));   
        },
        update: update
    }
}

export function clampDaysInToTheFuture(daysIntoTheFuture:number): number{
    return (Math.min(Math.max(daysIntoTheFuture, 0), 2));
}
