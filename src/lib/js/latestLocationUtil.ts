import { latestLocation, latestWeatherCondition } from "$lib/stores";
import { get } from "svelte/store";

export function setLatestLocation(location:string, weatherCondition:string){
    console.log('SET LATEST LOCATION');
    latestLocation.set(location);
    latestWeatherCondition.set(weatherCondition);

    setDataAttribute(weatherCondition);
}

export function getLatestLocation() {
    return get(latestLocation);
}

function setDataAttribute(weatherCondition:string){
    document.documentElement.setAttribute('data-theme', weatherCondition);
}

export function setLocationParameter(location:string) {
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set('location', location)
    window.location.search = searchParams.toString()
  }