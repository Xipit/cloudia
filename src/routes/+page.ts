import { page } from "$app/stores";
//import { setLocationParameter, getLatestLocation, handleLatestLocation } from "$lib/js/latestLocationUtil";

import type { PageLoad } from "./$types";
import { weather } from "$lib/js/weatherStore";
import { browser } from "$app/environment";


export const load = (async ({ url, data }) => {

    const locationParam = weather.getLocationURLParam(url);
    const daysInToTheFutureParam = weather.getDaysInToTheFutureURLParam(url);

    if(browser){
        const location = locationParam ?? weather.getLocation();
        const daysInToTheFuture = daysInToTheFutureParam ?? weather.getDaysInToTheFuture();

        console.log("pageload: get " +  weather.getDaysInToTheFuture());
        console.log("pageload: param" +  daysInToTheFuture);
        console.log("pageload: " +  daysInToTheFuture);

        weather.set(location, daysInToTheFuture);
    }

    const { 
        weatherData, 
        nextHoursWeatherData, 
        nextDaysWeatherData 
    } = weather.getWeather();

    const visiblePlanetsData:any = weather.getVisiblePlanets();

    const daysInToTheFuture:number = weather.getDaysInToTheFuture();

    return { 
        weatherData, 
        nextHoursWeatherData, 
        nextDaysWeatherData, 
        visiblePlanetsData, 
        daysInToTheFuture
    };

}) satisfies PageLoad;