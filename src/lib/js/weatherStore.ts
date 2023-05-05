import { browser } from "$app/environment";
import { get, writable, type Writable } from "svelte/store";
import { getCurrentWeatherData, getNextDaysWeatherData, getNextHoursWeatherData } from "./api/weatherApi";
import { generaliseWeatherCondition, setDataAttribute, type generalWeatherCondition } from "./latestLocationUtil";
import { fromLocalStorage, toLocalStorage } from "./util/localStorageWrapper";
import { replaceStateWithSearchParam } from "./util/url";


function createWeather() {
    
    const notFetchedError = {
        error: {
            message: 'Not fetched yet.'
        }
    };

    const { subscribe, update, set } = writable(0);

    const weatherObject = writable({
        weatherData: notFetchedError,
        nextHoursWeatherData: notFetchedError,
        nextDaysWeatherData: notFetchedError
    });

    const locationInitialValue: string = fromLocalStorage('location', '');
    const location = writable(locationInitialValue);
    toLocalStorage(location, 'location');

    const generalisedWeatherConditionInitialValue: generalWeatherCondition = fromLocalStorage('generalisedWeatherCondition', '');
    const generalisedWeatherCondition = createGeneralisedWeatherCondition(generalisedWeatherConditionInitialValue);
    toLocalStorage(generalisedWeatherCondition, 'generalisedWeatherCondition');

    async function setLocation (newLocation:string) {
        if(newLocation == ""){
            console.warn("Tried to set empty location.");
            return;
        }
        /*
        if(newLocation == get(location)){
            console.log("Tried to set new Location, but newLocation == location.");
            return;
        }
        */

   
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
            console.warn("Tried setting '?location=' URL-Search-Param before setting location!");
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
        setURLParamWithoutReload,
        getURLParam
    };
}

export const weather = createWeather();


function createGeneralisedWeatherCondition(initialValue:string):Writable<string> {
    const { subscribe, set, update } = writable(initialValue);

    return{
        subscribe,
        set: (value:generalWeatherCondition) => {
            set(value);
            setDataAttribute(value);
        },
        update: update
    }
}
