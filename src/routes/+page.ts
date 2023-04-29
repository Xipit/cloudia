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

export const _replaceStateWithQuery = (values: Record<string, string>) => {
    const url = new URL(window.location.toString());
    for (let [k, v] of Object.entries(values)) {
      if (!!v) {
        url.searchParams.set(k, v);
      } else {
        url.searchParams.delete(k);
      }
    }
    history.pushState(history.state, '', url);
  };
