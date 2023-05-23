<script lang="ts">
	import type { PageData } from "./$types";

	import { weather } from "$lib/js/weatherStore";
	import { onDestroy } from "svelte";

	import MainWeatherInfo from "../components/weather-tiles/mainWeatherInfo.svelte";
	import NextHoursWeather from "../components/weather-tiles/nextHoursWeather.svelte";
	import WeatherOverview from "../components/weather-tiles/weatherOverview.svelte";
	import Apod from "../components/weather-tiles/apod.svelte";
	import SearchForm from "../components/searchForm.svelte";
	import HomepageButtons from "../components/homepageButtons.svelte";

	// gets data from [load] function in +page.ts
    export let data: PageData;

	$: ({ settings, savedLocations } = data);
	let isLoggedIn:boolean 		= data.session !== null;
	let newLocationIsSet = false;

	// weather data, which was fetched in [load] function in +page.ts
	let weatherData: any		  = data.weatherData;
	let nextHoursWeatherData: any = data.nextHoursWeatherData;
	let nextDaysWeatherData: any  = data.nextDaysWeatherData;

	let visiblePlanetsData: any   = data.visiblePlanetsData;

	let daysInToTheFuture:number  = data.daysInToTheFuture;

	let isNoWeatherDataPresent 	= data.weatherData.error != undefined;
	
	// react to any change in weatherStore
	const unsubscribeWeather = weather.subscribe(() => {
		const weatherDataObject = weather.getWeather();
		weatherData 			= weatherDataObject.weatherData;
		nextHoursWeatherData 	= weatherDataObject.nextHoursWeatherData;
		nextDaysWeatherData 	= weatherDataObject.nextDaysWeatherData;
	
		visiblePlanetsData 		= weather.getVisiblePlanets();

		daysInToTheFuture 		= weather.getDaysInToTheFuture();

		isNoWeatherDataPresent 	= weatherDataObject.weatherData.error != undefined;

		newLocationIsSet = true;
	})

	onDestroy(unsubscribeWeather);
</script>

<main>
	{#if isNoWeatherDataPresent}
		<!-- display search form if no weather data is present -->
		<section class="search-form">
			<SearchForm bind:savedLocations bind:isLoggedIn/>
		</section>
	{:else}
		<!-- display weather data if it is present -->
    	<section>			
			<div class="main-wrapper">
				<MainWeatherInfo bind:weatherData bind:daysInToTheFuture bind:settings/>
				<HomepageButtons disable={!weatherData.temp} bind:daysInToTheFuture bind:savedLocations bind:session={data.session} bind:newLocationIsSet/>
			</div>
	
			<NextHoursWeather bind:nextHoursWeatherData bind:settings/>
			<WeatherOverview bind:weatherData bind:nextDaysWeatherData bind:nextHoursWeatherData bind:visiblePlanetsData bind:daysInToTheFuture bind:settings/>
			<Apod bind:daysInToTheFuture/>

		</section>
	{/if}
</main>


<style lang="scss">
	@import '../components/weather-tiles/weatherTiles.scss';

	main {
		margin-top: 5em;
		max-width: var(--main-max-width);
	}

	.button {
		background-color: azure;		
		padding: 0.3em;

		&:hover, &:active, &:focus{
			background-color: blanchedalmond;
		}
	}

	.main-wrapper{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
	}

	.search-form {
		display: flex;
		justify-content: center;
	}

	//for big screens
	@media only screen and (min-width: 450px) {
        .main-wrapper .macro-buttons {
			flex-direction: row;
		}
    }

	section {
		margin: 0.5em 0;
	}	
</style>