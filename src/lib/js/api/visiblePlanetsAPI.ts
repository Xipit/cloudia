import { Cache } from './cache';

const cache = new Cache();
const BASE_URL = "https://api.visibleplanets.dev/v3"

let errorData = {
	error: {
		message: "Location could not be found. Try search again.",
	}
};

async function API_REQUEST(latitude: number, longitude: number){
	// url https://api.visibleplanets.dev/v3?latitude=32&longitude=-98&showCoords=true
	let url = BASE_URL + "?latitude=" + latitude + "&longitude=" + longitude + "&showCoords=true";

	let fetchOptions = {
		method: 'GET',
	}

	let localStorageKey = "visiblePlanets?lat=" + latitude + "&lon=" + longitude;
	return await cache.fetchWithCache(localStorageKey, null, url, fetchOptions, 15);
}

export async function getVisiblePlanetsData(latitude: number, longitude: number){
	const data = await API_REQUEST(latitude, longitude);

	if ((latitude == data.meta.latitude) && (longitude == data.meta.longitude)){
		return data.data;
	} else {
		return errorData;
	}
}


/*function AzimuthToCompassDirection(deg){
	
	if ((deg < 45) || (deg >= 315)) {
		return "North";
	} else if ((deg < 315) && (deg >= 225)){
		return "West";
	} else if ((deg < 225) && (deg >= 135)) {
		return "South";
	} else if ((deg < 135) && (deg >= 45)) {
		return "East";
	}
}	*/
