import { browser } from "$app/environment";
import { get, writable, type Writable } from "svelte/store";
import { getCurrentWeatherData, getNextDaysWeatherData, getNextHoursWeatherData } from "./api/weatherApi";
import { createGeneralisedWeatherCondition, generaliseWeatherCondition, type GeneralWeatherCondition } from "./util/weatherStoreUtils";
import { fromLocalStorage, toLocalStorage } from "./util/localStorageWrapper";
import { replaceStateWithSearchParam } from "./util/url";
import { getVisiblePlanetsData } from "./api/visiblePlanetsAPI";


function createWeather() {
    // dummy store object used to trigger [subscribe] 
    const { subscribe, update, set } = writable(0);
    
    const notFetchedError = {
        error: {
            message: 'Not fetched yet.'
        }
    };
    const weatherObject = writable({
        weatherData: notFetchedError,
        nextHoursWeatherData: notFetchedError,
        nextDaysWeatherData: notFetchedError
    });

    const locationInitialValue: string = fromLocalStorage('location', '');
    const location = writable(locationInitialValue);
    toLocalStorage(location, 'location');

    const generalisedWeatherConditionInitialValue: GeneralWeatherCondition = fromLocalStorage(
        get(location) != '' 
            ? 'generalisedWeatherCondition' 
            : ''
        , '');
    const generalisedWeatherCondition = createGeneralisedWeatherCondition(generalisedWeatherConditionInitialValue);
    toLocalStorage(generalisedWeatherCondition, 'generalisedWeatherCondition');

    const visiblePlanetsInitialValue = fromLocalStorage(
        get(location) != '' 
            ? 'visiblePlanets' 
            : ''
        , '');
    let visiblePlanets:Writable<Array<string>|any> = writable(visiblePlanetsInitialValue);
    toLocalStorage(visiblePlanets, 'visiblePlanets');

    async function setLocation (newLocation:string) {
        if(newLocation == ""){
            console.warn("Tried to set empty location.");
            return;
        }
   
        const newWeatherData = await getCurrentWeatherData(newLocation);
        const newNextHoursWeatherData = await getNextHoursWeatherData(newLocation);
        const newNextDaysWeatherData = await getNextDaysWeatherData(newLocation);
        
        if(newWeatherData.error){
            console.warn(`Tried to set invalid location(${newLocation}). Weather API Error: \n${newWeatherData.error.message}`);
            return;
        }
        
        weatherObject.set({
            weatherData: newWeatherData,
            nextHoursWeatherData: newNextHoursWeatherData,
            nextDaysWeatherData: newNextDaysWeatherData
        });

        visiblePlanets.set(getVisiblePlanetsData(newWeatherData.location.lat, newWeatherData.location.lat));

        location.set(newLocation);
        setURLParamWithoutReload();

        const newGeneralisedWeatherCondition = generaliseWeatherCondition(newWeatherData.current.condition.text);
        generalisedWeatherCondition.set(newGeneralisedWeatherCondition);

        // just here to trigger subscribe
        // im sorry that i have bastardized sveltekit stores to this
        update(value => value + 1);
    }

    function getURLParam(url:URL): string|undefined {
        return url.searchParams.get('location')?.toString();
    }

    function setURLParamWithoutReload () {
        if(get(location) == ""){
            console.warn("Tried setting '?location=' URL-Search-Param before setting internal location!");
            return;
        }

        replaceStateWithSearchParam({
            location: get(location)
        });
    }

    return {
        subscribe,
        set: setLocation,
        getLocation: () => {
            return get(location);
        },
        getGeneralisedWeatherCondition: () => {
            return get(generalisedWeatherCondition);
        },
        getWeather: () => {
            return get(weatherObject);
        },
        getVisiblePlanets: () => {
            return get(visiblePlanets);
        },
        setURLParamWithoutReload,
        getURLParam
    };
}

export const weather = createWeather();


