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


export function getIconURL(conditionCode:number, sunrise:string, sunset:string, now:string){

	const nowSplit:Array<string> 		= now.split(":");
	const nowSplitHour:number 			= parseInt(nowSplit[0]);
	const nowTime:number 				= 60 * nowSplitHour;

	const sunriseSplit:Array<string>	= sunrise.split(":");
	const sunriseSplitHour:number		= parseInt(sunriseSplit[0]);
	const sunriseSplitMinutes:number	= parseInt(sunriseSplit[1]);
	const sunriseTime:number 			= 60 * sunriseSplitHour + sunriseSplitMinutes;

	const sunsetSplit:Array<string> 	= sunset.split(":");
	const sunsetSplitHour:number 		= parseInt(sunsetSplit[0]);
	const sunsetSplitMinutes:number 	= parseInt(sunsetSplit[1]);
	const sunsetTime:number 			= 60 * sunsetSplitHour + sunsetSplitMinutes + 720;
	

	const isSunVisible = (sunriseTime < nowTime) && (nowTime < sunsetTime);

	return translateConditionCodeToSVG(conditionCode, isSunVisible);
}

function translateConditionCodeToSVG(conditionCode:number, isSunVisible:boolean)
{
	// conditionnCodes are provided by weatherAPI and represent different weather conditions
	// these conditions get grouped as more general weather conditions, which decide which icon is displayed 

	switch (conditionCode) {
		case 1006: 
		case 1009:
			return cloudy; 

		case 1135:
		case 1030:
		case 1147:
			return fog;

		case 1063:
		case 1150:
		case 1153:
		case 1180:
		case 1183:
		case 1240:
			return lightRain;

		case 1066:
		case 1210:
		case 1213:
		case 1255:
			return lightSnow;

		case 1003:
			return isSunVisible 
				? partlyCloudy
				: partlyCloudyNight;

		case 1276:
		case 1273:
			return rainWithThunder;

		case 1186: 
		case 1189: 
		case 1192:
		case 1195: 
		case 1243:
		case 1246:
			return rain;

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

		case 1282:
		case 1279:
			return snowWithThunder;

		case 1114:
		case 1117:
		case 1216:
		case 1219:
		case 1222: 
		case 1225: 
		case 1258:
			return snow;

		case 1000: 
			return isSunVisible
				? sunny
				: clear;
			
		case 1087:
			return thunder;
	
		default:
			return sunny;
	}	
}