const BASE_URL = "http://api.weatherapi.com/v1/";
const PLUBLIC_API_KEY_WEATHER="d02fc8f55f1a44e481294946230304";

export let latitude: number;
export let longitude: number;

async function API_REQUEST(location: String){
	let url = BASE_URL + "current.json?key=" + PLUBLIC_API_KEY_WEATHER + "&q=" + location;
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
	console.log(data);
	latitude = data.location.lat;
	longitude = data.location.lon;

	if (response.ok){
		return data;
	} else {
		// TODO: Handle error if the location doesn't exists (example: "dfsds")
		throw new Error(data)
	}
}