import { PUBLIC_API_KEY_WEATHER } from "$env/static/public";
import { getIconURL } from "$lib/js/util/weatherIconUtils";
import { Cache } from './cache';

const cache = new Cache();
const BASE_URL = "http://api.weatherapi.com/v1/";


// define data structure
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
		chanceOfRain: "",
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
		avgTemp: {
			c: "",
			k: "",
			f: ""
		},
		rainAmount: {
			mm: "",
			in: "", // not currently used
		},
		maxWindSpeed: {
			kph: "",
			ms: "",
			knot: "",
			beaufort: "",
		},
		sunrise: "",
		sunset: "",
		moonrise: "",
		moonset: "",
		conditionText: "",
		avgHumidity: "",
	}]
}

// Get current weather from the API
async function fetchCurrentWeatherData(location: string){
	let url = BASE_URL + "current.json?key=" + PUBLIC_API_KEY_WEATHER + "&q=" + location;
	let fetchOptions = {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
		}
	}

	let localStorageKeyPrefix = "weatherApiCurrent?q=";
	return await cache.fetchWithCache(localStorageKeyPrefix, location, url, fetchOptions, 1);
}

export async function getCurrentWeatherData(location: string){
	if (location == ""){
		return	{
			error: {
				message: "No location was set",
			}
		};
	}

	const data = await fetchCurrentWeatherData(location);

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
			},
			windSpeed: {
				kph: data.current.wind_kph.toString(),
				ms: (data.current.wind_kph / 3.6).toFixed(1).toString(),
				knot: (data.current.wind_mph * 0.86897624).toFixed(1).toString(),
				beaufort: (Math.ceil(Math.cbrt(Math.pow((data.current.wind_kph / 3.6) /0.836, 1)))).toString(),
			},
			windDirection: data.current.wind_dir.toString(),
		};
	}
}


// Get forecast from API

async function fetchForecastWeatherData(location: string){
	let url = BASE_URL + "forecast.json?key=" + PUBLIC_API_KEY_WEATHER + "&q=" + location + "&days=3";
	let fetchOptions = {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
		}
	}

	let localStorageKeyPrefix = "weatherApiForecast";
	//todo: check how long the data can/should be used until new data should be fetched? --> what value should "expiresAfterMinutes" have?
	// new enum property in "expireEnum"?
	return await cache.fetchWithCache(localStorageKeyPrefix, location, url, fetchOptions, 15);
}

async function getForecastWeatherData(location: string){
	if (location == ""){
		return	{
			error: {
				message: "No location was set",
			}
		};
	}

	const data = await fetchForecastWeatherData(location);

	if (data.error) {
		console.log("Errorcode: " + data.error.code + ", Errormessage: " + data.error.message);
	} 

	return data;
}

export async function getNextHoursWeatherData(location: string, daysInToTheFuture:number = 0){
	const data = await getForecastWeatherData(location);

	if (data.error){		
		return data;
	} else {
		// remove old items from list
		forecastHours.hour.splice(0);

		// for tomorrow, where current data is not avilable
		if(daysInToTheFuture > 0){
			const startHour = 6;
			const hourIncrement = 3;
			
			// Pushes the data for the next i-Hours into forecastHour.hour
			for (let i = 0; i < 5; i++) {

				const forecastDay = data.forecast.forecastday[daysInToTheFuture];

				const forecastHour = forecastDay.hour[startHour + (i * hourIncrement)]

				const formattedDateString = getFormattedDate(new Date(forecastDay.date_epoch * 1000));

				pushHour(forecastHour, forecastDay, formattedDateString, startHour + (i * hourIncrement)) 
			}
		}else {
			// for today, current data is available

			const hourIncrement = 1
			const startHour = getCurrentStart(); // This is used to get to know which is the next hour for the forecastHours.hour array
			let dayIndex = 0;
			
			// Pushes the data for the next i-Hours into forecastHour.hour
			for (let i = 0; i < 5; i++) {
				startHour.setHours(startHour.getHours() + hourIncrement);
				const formattedDateString = getFormattedDate(startHour);

				// if the date changes (if the nextHourDate changes from 11pm to 12am), the next element of the forecastday array is to be used from the API response
				if (daysInToTheFuture < 1 && data.forecast.forecastday[dayIndex].date.toString() != formattedDateString) {
					dayIndex ++;
				}

				const forecastDay = data.forecast.forecastday[dayIndex];
				const forecastHour = forecastDay.hour[startHour.getHours()];

				 pushHour(forecastHour, forecastDay, formattedDateString, null);
			}
		}	

		return forecastHours;
	}
}

function pushHour(hour:any, day:any, formattedDateString:string, overwriteHour: number|null){
	const time = 		new Date(hour.time_epoch * 1000); 								
	const timeString = (overwriteHour ?? time.getHours()).toString().padStart(2, '0') + ":" + time.getMinutes().toString().padStart(2, '0');						
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
		chanceOfRain: hour.chance_of_rain,
	})
}

function getCurrentStart(): Date{
	const timestampNow = Date.now();
	let dateReference = new Date(timestampNow);

	return(new Date(dateReference.getFullYear(), dateReference.getMonth(), dateReference.getDate(), dateReference.getHours()));
}


export async function getNextDaysWeatherData(location: string) {
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
					avgTemp: {
						f: forecastDay.day.avgtemp_f.toString(),
						c: forecastDay.day.avgtemp_c.toString(),
						k: (forecastDay.day.avgtemp_c + 273).toString(),
					},
					rainAmount: {
						mm: forecastDay.day.totalprecip_mm.toString(),
						in: "",
					},
					maxWindSpeed: {
						kph: forecastDay.day.maxwind_kph.toString(),
						ms: (forecastDay.day.maxwind_kph / 3.6).toFixed(1).toString(),
						knot: (forecastDay.day.maxwind_mph * 0.86897624).toFixed(1).toString(),
						beaufort: (Math.ceil(Math.cbrt(Math.pow((forecastDay.day.maxwind_kph / 3.6) /0.836, 1)))).toString(),
					},
					sunrise: forecastDay.astro.sunrise.toString(),
					sunset: forecastDay.astro.sunset.toString(),
					moonrise: forecastDay.astro.moonrise.toString(),
					moonset: forecastDay.astro.moonset.toString(),
					conditionText: forecastDay.day.condition.text.toString(),
					avgHumidity: forecastDay.day.avghumidity.toString(),
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
