import { page } from "$app/stores";
import type { Actions } from "@sveltejs/kit";
import { getCurrentWeatherData, getNextDaysWeatherData, getNextHoursWeatherData } from "../api/weatherApi";
import type { PageLoad } from "./$types";


export const load = (async ({ url }) => {

    const location = url.searchParams.get('location')?.toString() ?? ""; // TODO cache selected location

    let weatherData = getCurrentWeatherData(location);
	  let nextHoursWeatherData = getNextHoursWeatherData(location);
	  let nextDaysWeatherData = getNextDaysWeatherData(location);

    return { weatherData, nextHoursWeatherData, nextDaysWeatherData, location };

}) satisfies PageLoad;