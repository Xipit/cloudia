import { latestLocation, latestWeatherCondition } from "$lib/stores";
import { get } from "svelte/store";

export function handleLatestLocation(location:string, weatherCondition:string){
    latestLocation.set(location);

    const generalisedWeatherCondition = generaliseWeatherCondition(weatherCondition);
    latestWeatherCondition.set(generalisedWeatherCondition);

    setDataAttribute(generalisedWeatherCondition);
}

export function getLatestLocation() {
    return get(latestLocation);
}

export function getGeneralisedWeatherCondition(){
    console.log('run getGeneralisedWeatherCondition');
    return get(latestWeatherCondition);
}

function setDataAttribute(weatherCondition:string){
    // sets data-theme="WEATHERCONDITION" on html root element
    document.documentElement.setAttribute('data-theme', weatherCondition);
}

export function setLocationParameter(location:string) {
    if(location == ""){
        return;
    }

    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('location', location)
    window.location.search = searchParams.toString()
}

const cloudList = [
    'Cloudy', 
    'Overcast', 
    'fog', 
    'Fog', 
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
export enum generalWeatherCondition {
    cloud   = "cloud",
    rain    = "rain",
    snow    = "snow",
    storm   = "storm",
    sun     = "sun"
}

function generaliseWeatherCondition (weatherCondition:string):generalWeatherCondition {
    const isCloud:boolean   = cloudList.some((text) =>  weatherCondition.includes(text));
    const isRain:boolean    = rainList.some((text) =>   weatherCondition.includes(text));
    const isSnow:boolean    = snowList.some((text) =>   weatherCondition.includes(text));
    const isStorm:boolean   = stormList.some((text) =>  weatherCondition.includes(text));
    const isSun:boolean     = sunList.some((text) =>    weatherCondition.includes(text));

    // thunder is more important in conditions, such as:
    // "Patchy light rain with thunder"
    // therefore it gets checked first
    if(isStorm)
        return generalWeatherCondition.storm;
    
    if(isCloud)
        return generalWeatherCondition.cloud;

    if(isRain)
        return generalWeatherCondition.rain;

    if(isSnow)
        return generalWeatherCondition.snow;

    if(isSun)
        return generalWeatherCondition.sun;

    // default, should never be reached
    console.error('Unknown weather condition. Using "sun" as default for styling.');
    return generalWeatherCondition.sun;
}