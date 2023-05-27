import { get, writable } from "svelte/store";
import { getCurrentWeatherData, getNextDaysWeatherData, getNextHoursWeatherData } from "./api/weatherApi";
import { clampDaysInToTheFuture, createDaysInToTheFuture, createGeneralisedWeatherCondition, generaliseWeatherCondition, GeneralWeatherCondition,  } from "./util/weatherStoreUtils";
import { fromLocalStorage, toLocalStorage } from "./util/localStorageWrapper";
import { replaceStateWithSearchParam } from "./util/url";
import { getVisiblePlanetsData } from "./api/visiblePlanetsAPI";

// gets executed once to create the [weather] object
function createWeather() {
    // dummy store object used to trigger [subscribe] 
    const { subscribe, update, set } = writable(0);
    
    const notFetchedError = {
        error: {
            message: 'Not fetched yet.'
        }
    };


    /*
        MODEL 
    */

    // weather data, such as temperature or wind current
    const weatherObject = writable({
        weatherData: notFetchedError,
        nextHoursWeatherData: notFetchedError,
        nextDaysWeatherData: notFetchedError
    });

    // selected Location
    const locationInitialValue: string = fromLocalStorage('location', '');
    const location = writable<string>(locationInitialValue);
    toLocalStorage(location, 'location');

    // weather condition to drive weather-background, is dependant on location being set
    const generalisedWeatherConditionInitialValue: GeneralWeatherCondition = fromLocalStorage(
        get(location) != '' // only use localstorage value if location is set, else it would break the view
            ? 'generalisedWeatherCondition' 
            : ''
        , '');
    const generalisedWeatherCondition = createGeneralisedWeatherCondition(generalisedWeatherConditionInitialValue);
    toLocalStorage(generalisedWeatherCondition, 'generalisedWeatherCondition');

    // list of visible planets, is dependent upon daysInToTheFuture = 0
    const visiblePlanetsInitialValue = fromLocalStorage(
        get(location) != '' 
            ? 'visiblePlanets' 
            : ''
        , '');
    const visiblePlanets = writable<Array<string>|any>(visiblePlanetsInitialValue);
    toLocalStorage(visiblePlanets, 'visiblePlanets');

    // how many days in to the future the weather data should be from
    const daysInToTheFutureInitialValue = fromLocalStorage(
        get(location) != '' 
            ? 'daysInToTheFuture' 
            : ''
        , 0);
    const daysInToTheFuture = createDaysInToTheFuture(daysInToTheFutureInitialValue);
    toLocalStorage(daysInToTheFuture, 'daysInToTheFuture');

    /*
        CONTROLLER
    */

    async function setLocation (newLocation:string, newDaysInToTheFuture:number = get(daysInToTheFuture)) {
        if(newLocation == ""){
            console.warn("Tried to set empty location.");
            return false;
        }
   
        const newWeatherData = await getCurrentWeatherData(newLocation);
        const newNextHoursWeatherData = await getNextHoursWeatherData(newLocation, clampDaysInToTheFuture(newDaysInToTheFuture));
        const newNextDaysWeatherData = await getNextDaysWeatherData(newLocation);
        
        if(newWeatherData.error){
            console.warn(`Tried to set invalid location(${newLocation}). Weather API Error: \n${newWeatherData.error.message}`);
            return false;
        }
        
        weatherObject.set({
            weatherData: newWeatherData,
            nextHoursWeatherData: newNextHoursWeatherData,
            nextDaysWeatherData: newNextDaysWeatherData
        });

        if(newDaysInToTheFuture < 1)
            visiblePlanets.set(getVisiblePlanetsData(newWeatherData.location.lat, newWeatherData.location.lat));

        const newLocationFromAPI = newWeatherData.location.name;
        location.set(newLocationFromAPI);
        setLocationURLParamWithoutReload();

        daysInToTheFuture.set(newDaysInToTheFuture);
        setDaysInToTheFutureURLParamWithoutReload();

        // get current weather condition or use average weather condition depending on daysInToTheFuture
        const newGeneralisedWeatherCondition = generaliseWeatherCondition(
            newDaysInToTheFuture <= 0 
                ? newWeatherData.current.condition.text
                : newNextDaysWeatherData.day[get(daysInToTheFuture)].conditionText);
        generalisedWeatherCondition.set(newGeneralisedWeatherCondition);

        // just here to trigger [subscribe]
        update(value => value + 1);
        
        return true;
    }

    async function setDaysInToTheFuture(newDaysInToTheFuture:number){
        setLocation(get(location), newDaysInToTheFuture);
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

    function getDaysInToTheFutureURLParam(url:URL): number|undefined {
        const param = url.searchParams.get('daysInToTheFuture');

        return param != undefined 
            ? Number(url.searchParams.get('daysInToTheFuture')?.toString())
            : undefined;
    }

    function setDaysInToTheFutureURLParamWithoutReload () {
        if(get(location) == ""){
            console.warn("Tried setting '?daysInToTheFuture=' URL-Search-Param before setting internal location!");
            return;
        }

        replaceStateWithSearchParam({
            daysInToTheFuture: get(daysInToTheFuture).toString()
        });
    }

    function resetURLParamsWithoutReload () {
        replaceStateWithSearchParam({
            daysInToTheFuture: '',
            location: '',
        })
    }

    function resetData() {
        location.set("");
        generalisedWeatherCondition.set(GeneralWeatherCondition.undefined);
        daysInToTheFuture.set(0);
        weatherObject.set({
            weatherData: notFetchedError,
            nextHoursWeatherData: notFetchedError,
            nextDaysWeatherData: notFetchedError,
        })
        resetURLParamsWithoutReload();

        // just here to trigger [subscribe]
        update(value => value + 1);
    }

    return {
        subscribe,
        set: setLocation,
        setDaysInToTheFuture,
        resetData,
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
        setLocationURLParamWithoutReload: setLocationURLParamWithoutReload,
        getLocationURLParam: getLocationURLParam,
        setDaysInToTheFutureURLParamWithoutReload: setDaysInToTheFutureURLParamWithoutReload,
        getDaysInToTheFutureURLParam: getDaysInToTheFutureURLParam
    };
}

export const weather = createWeather();