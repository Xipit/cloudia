import { PUBLIC_API_KEY_NASA } from "$env/static/public";
import { Cache } from './cache';

const cache = new Cache();

const BASE_URL = "https://api.nasa.gov/planetary/apod/";

let imgData = {
    date: typeof(String),
    title: typeof(String),
    url: typeof(String),
    mediaType: typeof(String)
}

// this function returns the response of the API
async function fetchAPOD(){
    let url = BASE_URL + "?api_key=" + PUBLIC_API_KEY_NASA;
    let fetchOptions = {
		method: 'GET',
	}

	let localStorageKey = "apodApi";
	return await cache.fetchWithCache(localStorageKey, null, url, fetchOptions, 0, true);
}

// this function can be called from the outside to get the information for the APOD
export async function getAPOD(){
    const data = await fetchAPOD();

    console.log(data);

    if (data.error){
        return data
	} else {
		imgData = {
            date: data.date,
            title: data.title,
            url: data.url,
            mediaType: data.media_type
        }
		return imgData;
	}
}
