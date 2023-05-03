import { PUBLIC_API_KEY_WEATHER } from "$env/static/public";
import { Cache } from './cache';

//import of all weather-icons
import clear from '$lib/assets/svg/weather-icons/clear.svg';
import cloudy from '$lib/assets/svg/weather-icons/cloudy.svg';
import fog from '$lib/assets/svg/weather-icons/fog.svg';
import lightRain from '$lib/assets/svg/weather-icons/light-rain.svg';
import lightSnow from '$lib/assets/svg/weather-icons/light-snow.svg';
import partlyCloudyNight from '$lib/assets/svg/weather-icons/partly-cloudy-night.svg';
import partlyCloudy from '$lib/assets/svg/weather-icons/partly-cloudy.svg';
import rainWithThunder from '$lib/assets/svg/weather-icons/rain-with-thunder.svg';
import rain from '$lib/assets/svg/weather-icons/rain.svg';
import sleet from '$lib/assets/svg/weather-icons/sleet.svg';
import snowWithThunder from '$lib/assets/svg/weather-icons/snow-with-thunder.svg';
import snow from '$lib/assets/svg/weather-icons/snow.svg';
import sunny from '$lib/assets/svg/weather-icons/sunny.svg';
import thunder from '$lib/assets/svg/weather-icons/thunder.svg';

const cache = new Cache();
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
		latitude = null;
		longitude = null;
		console.log("Errorcode: " + data.error.code + ", Errormessage: " + data.error.message);
		return data;
	} else {
		latitude = data.location.lat;
		longitude = data.location.lon;
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
		case 1006: 
		case 1009:
			return cloudy; 
			break;
		case 1135:
		case 1030:
		case 1147:
			return fog;
			break;
		case 1063:
		case 1150:
		case 1153:
		case 1180:
		case 1183:
		case 1240:
			return lightRain;
			break;
		case 1066:
		case 1210:
		case 1213:
		case 1255:
			return lightSnow;
			break;
		case 1003:
			return partlyCloudy;
			break;
		case 1276:
		case 1273:
			return rainWithThunder;
			break;
		case 1186: 
		case 1189: 
		case 1192:
		case 1195: 
		case 1243:
		case 1246:
			return rain;
			break;
		case 1069: 
		case 1072:
		case 1168:
		case 1171:
		case 1198:
		case 1201:
		case 1204:
		case 1207:
		case 1237:
		case 1249:
		case 1252:
		case 1261:
		case 1264:
			return sleet;
			break;
		case 1282:
		case 1279:
			return snowWithThunder;
			break;
		case 1114:
		case 1117:
		case 1216:
		case 1219:
		case 1222: 
		case 1225: 
		case 1258:
			return snow;
			break;
		case 1000: 
			return sunny;
			break;
		case 1087:
			return thunder;
			break;
	
		default:
			return sunny;
			break;
	}
}