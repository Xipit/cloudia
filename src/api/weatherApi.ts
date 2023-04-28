import { PUBLIC_API_KEY_WEATHER } from "$env/static/public";

const BASE_URL = "http://api.weatherapi.com/v1/";

export let latitude: any = null;
export let longitude: any = null;

const forecastHours = {
	hour: [{
		date: "",
		time: "",
		temp_c: "",
		conditionIconURL: "",
	}]
}

const forecastDays = {
	day: [{
		date: "",
		maxtemp_c: "",
		mintemp_c: "",
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
		forecastHours.hour.splice(0);

		let timestampNow = Date.now();
		let dateNow = new Date(timestampNow);

		// This is used to get to know which is the next hour for the forecastHours.hour array
		let nextHourDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate(), dateNow.getHours())

		let dayIndex = 0;

		// Pushes the data for the next i-Hours into forecastHour.hour
		for (let i = 0; i < 5; i++) {
			nextHourDate.setHours(nextHourDate.getHours() + 1);

			let formattedDateString = getFormattedDate(nextHourDate);

			// if the date changes (if the nextHourDate changes from 11pm to 12am), the next element of the forecastday array is to be used from the API response
			if (data.forecast.forecastday[dayIndex].date.toString() != formattedDateString) {
				dayIndex ++;
			}

			let forecastday = data.forecast.forecastday[dayIndex];
			let forecastHour = forecastday.hour[nextHourDate.getHours()];

			let time = new Date(forecastHour.time_epoch * 1000);
			let timeString = time.getHours().toString().padStart(2, '0') + ":" + time.getMinutes().toString().padStart(2, '0');
			let iconURL = getIconURL(forecastHour.condition.code);

			forecastHours.hour.push({
				date: formattedDateString,
				time: timeString,
				temp_c: forecastHour.temp_c.toString(),
				conditionIconURL: iconURL, 
			})
		}
		return forecastHours;
	}
}

export async function getNextDaysWeatherData(location: String) {
	const data = await getForecastWeatherData(location);

	if (data.error){		
		return data;
	} else {
		// remove old items from list
		forecastDays.day.splice(0);

		// Pushes the data for the next i-Days into forecastDays.day
		// What we get: Weatherdata for today, tomorrow, the day after tomorrow
		for (let i = 0; i < 3; i++) {
			let forecastday = data.forecast.forecastday[i];

			if (forecastday != null) {
				forecastDays.day.push({
					date: forecastday.date.toString(),
					maxtemp_c: forecastday.day.maxtemp_c.toString(),
					mintemp_c: forecastday.day.mintemp_c.toString(),
				})
			}
		}
		
		return forecastDays;
	}
}

function getFormattedDate(date: Date){
	return [
		date.getFullYear(),
		(date.getMonth() + 1).toString().padStart(2, '0'),
		(date.getDate()).toString().padStart(2, '0'),
	  ].join('-')
}

function getIconURL(conditionCode:number){
	switch (conditionCode) {
		case 1000:
			return "src\\img\\sun.png"; 
			break;
	
		default:
			return "src\\img\\sun.png";
			break;
	}
}