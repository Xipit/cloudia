import { page } from "$app/stores";
//import { setLocationParameter, getLatestLocation, handleLatestLocation } from "$lib/js/latestLocationUtil";

import type { PageLoad } from "./$types";
import { weather } from "$lib/js/weatherStore";
import { browser } from "$app/environment";


export const load = (async ({ url }) => {

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

    const visiblePlanetsData:any = weather.getVisiblePlanets();

    return { weatherData, nextHoursWeatherData, nextDaysWeatherData, visiblePlanetsData };

}) satisfies PageLoad;