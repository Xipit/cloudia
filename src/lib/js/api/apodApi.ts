import { PUBLIC_API_KEY_NASA } from "$env/static/public";
import { Cache } from './cache';

const cache = new Cache();

const BASE_URL = "https://api.nasa.gov/planetary/apod/";

let imgData = {
    date: typeof(String),
    title: typeof(String),
    url: typeof(String)
}

// this function returns the response of the API
async function API_REQUEST(){
    let url = BASE_URL + "?api_key=" + PUBLIC_API_KEY_NASA;
    let fetchOptions = {
		method: 'GET',
	}

	let localStorageKey = "apodApi";
	return await cache.fetchWithCache(localStorageKey, url, fetchOptions, 0, true);
}

// this function can be called from the outside to get the information for the APOD
export async function getAPOD(){
    const data = await API_REQUEST();

    if (data.error){
        return data
	} else {
		imgData = {
            date: data.date,
            title: data.title,
            url: data.url
        }
		return imgData;
	}
}
