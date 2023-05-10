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
		maxTemp: {
			c: "",
			k: "",
			f: ""
		},
		minTemp: {
			c: "",
			k: "",
			f: ""
		},
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
		return {
			...data,
			// append temperature data to pure API data
			// is necessary to switch temperature unit
			temp: {
				f: data.current.temp_f.toString(),
				c: data.current.temp_c.toString(),
				k: (data.current.temp_c + 273).toString(),
			},
			feelslike: {
				f: data.current.feelslike_f.toString(),
				c: data.current.feelslike_c.toString(),
				k: (data.current.feelslike_c + 273).toString()
			}
		};
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

export async function getNextHoursWeatherData(location: String, daysInToTheFuture:number = 0){
	const data = await getForecastWeatherData(location);

	if (data.error){		
		return data;
	} else {
		// remove old items from list
		forecastHours.hour.splice(0);

		const timestampNow = Date.now();
		let dateReference = new Date(timestampNow);

		if(daysInToTheFuture > 0){
			const forecastDay = data.forecast.forecastday[daysInToTheFuture];

			const date:Date = new Date(forecastDay.date_epoch * 1000);

			console.log(date.toISOString());



			for (let i = 0; i < 5; i++) {
				const forecastHour = forecastDay.hour[i];

				console.log((new Date(forecastHour.time_epoch * 1000).toISOString()));

				const formattedDateString = getFormattedDate(date);

				pushHour(forecastHour, forecastDay, formattedDateString);
			}

		} else {
			// This is used to get to know which is the next hour for the forecastHours.hour array
			const nextHourDate = new Date(dateReference.getFullYear(), dateReference.getMonth(), dateReference.getDate(), dateReference.getHours())
			const hourIncrement = 1;

			let dayIndex = 0;
			
			// Pushes the data for the next i-Hours into forecastHour.hour
			for (let i = 0; i < 5; i++) {
				nextHourDate.setHours(nextHourDate.getHours() + hourIncrement);
				const formattedDateString = getFormattedDate(nextHourDate);

				// if the date changes (if the nextHourDate changes from 11pm to 12am), the next element of the forecastday array is to be used from the API response
				if (data.forecast.forecastday[dayIndex].date.toString() != formattedDateString) {
					dayIndex ++;
				}

				const forecastDay = data.forecast.forecastday[dayIndex];
				const forecastHour = forecastDay.hour[nextHourDate.getHours()];

				pushHour(forecastHour, forecastDay, formattedDateString);
			}
		}
		
		return forecastHours;
	}
}

function pushHour(hour:any, day:any, formattedDateString:string){
	const time = 		new Date(hour.time_epoch * 1000);
	const timeString = 	time.getHours().toString().padStart(2, '0') + ":" + time.getMinutes().toString().padStart(2, '0');
	const iconURL = 	getIconURL(hour.condition.code, day.astro.sunrise, day.astro.sunset, timeString);

	forecastHours.hour.push({
		date: formattedDateString,
		time: timeString,
		temp: {
			f: hour.temp_f.toString(),
			c: hour.temp_c.toString(),
			k: (hour.temp_c + 273).toString()
		},
		conditionIconURL: iconURL, 
	})
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
					maxTemp: {
						f: forecastDay.day.maxtemp_f,
						c: forecastDay.day.maxtemp_c.toString(),
						k: (forecastDay.day.maxtemp_c + 273).toString()
					},
					minTemp: {
						f: forecastDay.day.mintemp_f.toString(),
						c: forecastDay.day.mintemp_c.toString(),
						k: (forecastDay.day.mintemp_c + 273).toString(),
					},
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
