import { PUBLIC_API_KEY_WEATHER } from "$env/static/public";
import { getIconURL } from "$lib/js/util/weatherIconUtils";
import { Cache } from './cache';

const cache = new Cache();
const BASE_URL = "http://api.weatherapi.com/v1/";

const forecastHours = {
	hour: [{
		date: "",
		time: "",
		temp: {
			c: "",
			k: "",
			f: ""
		},
		conditionIconURL: "",
	}]
}

const forecastDays = {
	day: [{
		date: "",
		maxtemp_c: "",
		mintemp_c: "",
		sunrise: "",
		sunset: "",
		moonrise: "",
		moonset: "",
	}]
}

// Get current weather from the API

async function API_REQUEST_CURRENT(location: String){
	let url = BASE_URL + "current.json?key=" + PUBLIC_API_KEY_WEATHER + "&q=" + location;
	let fetchOptions = {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
		}
	}

	let localStorageKey = "weatherApiCurrent?q=" + location;
	return await cache.fetchWithCache(localStorageKey, url, fetchOptions, 15);
}

export async function getCurrentWeatherData(location: String){
	if (location == ""){
		return	{
			error: {
				message: "No location was set",
			}
		};
	}

	const data = await API_REQUEST_CURRENT(location);

	if (data.error) {
		console.log("Errorcode: " + data.error.code + ", Errormessage: " + data.error.message);
		return data;
	} else {
		return data;
	}
}


// Get forecast from API

async function API_REQUEST_FORECAST(location: String){
	let url = BASE_URL + "forecast.json?key=" + PUBLIC_API_KEY_WEATHER + "&q=" + location + "&days=3";
	let fetchOptions = {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
		}
	}

	let localStorageKey = "weatherApiForecast" + location;
	//todo: check how long the data can/should be used until new data should be fetched? --> what value should "expiresAfterMinutes" have?
	// new enum property in "expireEnum"?
	return await cache.fetchWithCache(localStorageKey, url, fetchOptions, 15);
}

async function getForecastWeatherData(location: String){
	if (location == ""){
		return	{
			error: {
				message: "No location was set",
			}
		};
	}

	const data = await API_REQUEST_FORECAST(location);

	if (data.error) {
		console.log("Errorcode: " + data.error.code + ", Errormessage: " + data.error.message);
	} 

	return data;
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
			let iconURL = getIconURL(forecastHour.condition.code, forecastday.astro.sunrise, forecastday.astro.sunset, timeString);

			forecastHours.hour.push({
				date: formattedDateString,
				time: timeString,
				temp: {
					f: forecastHour.temp_f.toString(),
					c: forecastHour.temp_c.toString(),
					k: (forecastHour.temp_c + 273).toString()
				},
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
			let forecastDay = data.forecast.forecastday[i];

			if (forecastDay != null) {
				forecastDays.day.push({
					date: forecastDay.date.toString(),
					maxtemp_c: forecastDay.day.maxtemp_c.toString(),
					mintemp_c: forecastDay.day.mintemp_c.toString(),
					sunrise: forecastDay.astro.sunrise.toString(),
					sunset: forecastDay.astro.sunset.toString(),
					moonrise: forecastDay.astro.moonrise.toString(),
					moonset: forecastDay.astro.moonset.toString(),
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
