import { latestLocation, latestWeatherCondition } from "$lib/stores";
import { get } from "svelte/store";

export function handleLatestLocation(location:string, weatherCondition:string){
    latestLocation.set(location);
    latestWeatherCondition.set(weatherCondition);

    setDataAttribute(weatherCondition);
}

export function getLatestLocation() {
    return get(latestLocation);
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