import type { PageLoad } from "./$types";
import { weather } from "$lib/js/weatherStore";
import { browser } from "$app/environment";


export const load = (async ({ url }) => {

    /*
        If a URL Search Param is set, use it to drive location
        e.g. cloudia.witzleb.eu/?location=Berlin   =>   Berlin as location is set

        if no URL Search Param is set, try and get the location from [weatherStore]
        e.g. cloudia.witzleb.eu    =>     call [weather.getLocation] and use it for location

        the same is true for daysInToTheFuture (decides what day to show data for)
    */

    const locationParam = weather.getLocationURLParam(url);
    const daysInToTheFutureParam = weather.getDaysInToTheFutureURLParam(url);

    if(browser){
        // the same as location = locationParam != null ? locationParam : weather.getLocation();
        const location = locationParam ?? weather.getLocation();
        const daysInToTheFuture = daysInToTheFutureParam ?? weather.getDaysInToTheFuture();

        weather.set(location, daysInToTheFuture);
    }


    /*
        Before getting weather data, location and daysInToTheFuture must be set
    */

    const { 
        weatherData, 
        nextHoursWeatherData, 
        nextDaysWeatherData 
    } = weather.getWeather();

    const visiblePlanetsData:any = weather.getVisiblePlanets();

    // seemingly redundant, but is needed, because of universal load function
    const daysInToTheFuture:number = weather.getDaysInToTheFuture();

    return { 
        weatherData, 
        nextHoursWeatherData, 
        nextDaysWeatherData, 
        visiblePlanetsData, 
        daysInToTheFuture
    };

}) satisfies PageLoad;