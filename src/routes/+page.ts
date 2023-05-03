import { page } from "$app/stores";
import { setLocationParameter, getLatestLocation, setLatestLocation } from "$lib/js/latestLocationUtil";

import type { Actions } from "@sveltejs/kit";
import { getCurrentWeatherData, getNextDaysWeatherData, getNextHoursWeatherData } from "$lib/js/api/weatherApi";
import type { PageLoad } from "./$types";


export const load = (async ({ url }) => {

    /*
    const location:string = url.searchParams.get('location')?.toString() ?? "";

    if(location == ""){
        const latestLocation = getLatestLocation();
        await goto(`/?location=${encodeURIComponent(latestLocation.trim())}`)   ; 
    }
    */
    
    const location:string = (() => {
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
    

    console.log(location);

    let weatherData = await getCurrentWeatherData(location);
	let nextHoursWeatherData = getNextHoursWeatherData(location);
    let nextDaysWeatherData = getNextDaysWeatherData(location);

    // used to style pages conditionally by weather condition
    if(!weatherData.error && location != ""){
        setLatestLocation(location, weatherData.current.condition.text);
    }

    return { weatherData, nextHoursWeatherData, nextDaysWeatherData, location };

}) satisfies PageLoad;