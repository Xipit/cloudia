import { page } from "$app/stores";
//import { setLocationParameter, getLatestLocation, handleLatestLocation } from "$lib/js/latestLocationUtil";

import type { Actions } from "@sveltejs/kit";
import { getCurrentWeatherData, getNextDaysWeatherData, getNextHoursWeatherData } from "$lib/js/api/weatherApi";
import type { PageLoad } from "./$types";
import { weather } from "$lib/js/weatherStore";
import { browser } from "$app/environment";
import { get } from "svelte/store";


export const load = (async ({ url }) => {

    /*const location:string = (() => {
        const locationParam = url.searchParams.get('location')?.toString();
        if(locationParam && locationParam != ""){
            return locationParam;
        } else {
            // read latest location from localstorage and set URL parameter
            const latestLocation = getLatestLocation();
            setLocationParameter(latestLocation);
            return latestLocation
        }
    })();


    let weatherData = await getCurrentWeatherData(location);
	let nextHoursWeatherData = getNextHoursWeatherData(location);
    let nextDaysWeatherData = getNextDaysWeatherData(location);

    // used to style pages conditionally by weather condition
    if(!weatherData.error && location != ""){
        handleLatestLocation(location, weatherData.current.condition.text);
    }
    */

    const locationParam = weather.getURLParam(url);

    if(browser){
        if(locationParam != undefined){
            weather.set(locationParam);
        } else {
            weather.set(weather.getLocation());
        }
    }

    const { 
        weatherData, 
        nextHoursWeatherData, 
        nextDaysWeatherData 
    } = weather.getWeather();

    return { weatherData, nextHoursWeatherData, nextDaysWeatherData };

}) satisfies PageLoad;