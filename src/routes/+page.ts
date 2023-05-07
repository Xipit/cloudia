import { page } from "$app/stores";
//import { setLocationParameter, getLatestLocation, handleLatestLocation } from "$lib/js/latestLocationUtil";

import type { Actions } from "@sveltejs/kit";
import { getCurrentWeatherData, getNextDaysWeatherData, getNextHoursWeatherData } from "$lib/js/api/weatherApi";
import type { PageLoad } from "./$types";
import { weather } from "$lib/js/weatherStore";
import { browser } from "$app/environment";
import { get } from "svelte/store";


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

    return { weatherData, nextHoursWeatherData, nextDaysWeatherData };

}) satisfies PageLoad;