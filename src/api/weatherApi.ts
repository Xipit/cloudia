import { PUBLIC_API_KEY_WEATHER } from "$env/static/public";

const BASE_URL = "http://api.weatherapi.com/v1/";

export let latitude: any = null;
export let longitude: any = null;

const forecast = {
	hour: [{
		date: "",
		time: "",
		temp_c: "",
	}]
}

// Get current weather from the API

async function API_REQUEST_CURRENT(location: String){
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
	if (location == ""){
		const data = {
			error: {
				message: "No location was set",
			}
		}
		return data;
	}

	const response = await API_REQUEST_CURRENT(location);
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


// Get forecast from API

async function API_REQUEST_FORECAST(location: String){
	let url = BASE_URL + "forecast.json?key=" + PUBLIC_API_KEY_WEATHER + "&q=" + location + "&days=3";
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

async function getForecastWeatherData(location: String){
	if (location == ""){
		const data = {
			error: {
				message: "No location was set",
			}
		}
		return data;
	}

	const response = await API_REQUEST_FORECAST(location);
	const data = await response.json();		

	if (response.ok){		
		return data;
	} else {
		console.log("Errorcode: " + data.error.code + ", Errormessage: " + data.error.message);
		return data;
	}
}

export async function getNextHoursWeatherData(location: String){
	const data = await getForecastWeatherData(location);

	if (data.error){		
		return data;
	} else {
		// remove old items from list
		forecast.hour.splice(0);

		let timestampNow = Date.now();
		let dateNow = new Date(timestampNow);

		// This is used to get to know which is the next hour for the forecast.hour array
		let nextHourDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), dateNow.getHours())

		let dayIndex = 0;

		// Pushes the data for the next i-Hours into forecast.hour
		for (let i = 0; i < 5; i++) {
			nextHourDate.setHours(nextHourDate.getHours() + 1);

			let formattedDateString = getFormattedDate(nextHourDate);

			// if the date changes (if the nextHourDate changes from 11pm to 12am), the next element of the forecastday array is to be used from the API response
			if (data.forecast.forecastday[dayIndex].date.toString() != formattedDateString) {
				dayIndex ++;
			}

			let forecastday = data.forecast.forecastday[dayIndex];
			let forecastHour = forecastday.hour[nextHourDate.getHours()];

			forecast.hour.push({
				date: forecastday.date.toString(),
				time: forecastHour.time.toString(),
				temp_c: forecastHour.temp_c.toString(),
			})
		}
		return forecast;
	}
}

function getFormattedDate(date: Date){
	return [
		date.getFullYear(),
		(date.getMonth() + 1).toString().padStart(2, '0'),
		(date.getDate()).toString().padStart(2, '0'),
	  ].join('-')
}