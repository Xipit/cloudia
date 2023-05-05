import { writable } from "svelte/store";
import { fromLocalStorage, toLocalStorage } from "$lib/js/util/localStorageWrapper";

/*
export const latestLocationInitialValue = fromLocalStorage('latestLocation', "");
export const latestLocation = writable(latestLocationInitialValue);
toLocalStorage(latestLocation, 'latestLocation');

export const latestWeatherConditionInitialValue = fromLocalStorage('latestWeatherCondition', "");
export const latestWeatherCondition = writable(latestWeatherConditionInitialValue);
toLocalStorage(latestWeatherCondition, 'latestWeatherCondition');

*/