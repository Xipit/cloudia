import { PUBLIC_API_KEY_WEATHER } from "$env/static/public";

const BASE_URL = "http://api.weatherapi.com/v1/";

export let latitude: any = null;
export let longitude: any = null;

async function API_REQUEST(location: String){
	let url = BASE_URL + "current.json?key=" + PUBLIC_API_KEY_WEATHER + "&q=" + location;
	return await fetch(
        url,
        {
            method: 'GET',
			headers: {
            	'Access-Control-Allow-Origin': '*',
        	}
        }
    );
}

export async function getCurrentWeatherData(location: String){
	const response = await API_REQUEST(location);
	const data = await response.json();		

	if (response.ok){		
		latitude = data.location.lat;
		longitude = data.location.lon;
		return data;
	} else {
		latitude = null;
		longitude = null;
		console.log("Errorcode: " + data.error.code + ", Errormessage: " + data.error.message);
		return data;
	}
}