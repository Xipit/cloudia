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
    const location = writable<string>(locationInitialValue);
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
    const visiblePlanets = writable<Array<string>|any>(visiblePlanetsInitialValue);
    toLocalStorage(visiblePlanets, 'visiblePlanets');

    const daysInToTheFutureInitialValue = fromLocalStorage(
        get(location) != '' 
            ? 'daysInToTheFuture' 
            : ''
        , 0);//TODO change to 0
    const daysInToTheFuture = writable<number>(daysInToTheFutureInitialValue);
    toLocalStorage(daysInToTheFuture, 'daysInToTheFuture');

    async function setLocation (newLocation:string, daysInToTheFuture:number = 0) {
        if(newLocation == ""){
            console.warn("Tried to set empty location.");
            return;
        }
   
        const newWeatherData = await getCurrentWeatherData(newLocation);
        const newNextHoursWeatherData = await getNextHoursWeatherData(newLocation, 1);
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
        setLocationURLParamWithoutReload();

        const newGeneralisedWeatherCondition = generaliseWeatherCondition(newWeatherData.current.condition.text);
        generalisedWeatherCondition.set(newGeneralisedWeatherCondition);

        // just here to trigger subscribe
        // im sorry that i have bastardized sveltekit stores to this
        update(value => value + 1);
    }

    function getLocationURLParam(url:URL): string|undefined {
        return url.searchParams.get('location')?.toString();
    }

    function setLocationURLParamWithoutReload () {
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
        getDaysInToTheFuture: () => {
            return get(daysInToTheFuture);
        },
        setURLParamWithoutReload: setLocationURLParamWithoutReload,
        getURLParam: getLocationURLParam
    };
}

export const weather = createWeather();


