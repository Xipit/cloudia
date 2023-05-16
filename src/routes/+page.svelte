<script lang="ts">
	import type { PageData } from "./$types";

	import { weather } from "$lib/js/weatherStore";
	import { onDestroy } from "svelte";

	import MainWeatherInfo from "../components/weather-tiles/mainWeatherInfo.svelte";
	import NextHoursWeather from "../components/weather-tiles/nextHoursWeather.svelte";
	import WeatherOverview from "../components/weather-tiles/weatherOverview.svelte";
	import Apod from "../components/weather-tiles/apod.svelte";
	import SearchForm from "../components/searchForm.svelte";
	import HomepageButtons from "../components/homepage-buttons.svelte";

    export let data: PageData;

	$: ({ settings, savedLocations } = data);
	let isLoggedIn:boolean = data.session !== null;
	let searchFormOpen = data.weatherData.error != undefined;

	// Weather API
	let visiblePlanetsData: any   = data.visiblePlanetsData;

	let weatherData: any		  = data.weatherData;
	let nextHoursWeatherData: any = data.nextHoursWeatherData;
	let nextDaysWeatherData: any  = data.nextDaysWeatherData;

	let daysInToTheFuture:number  = data.daysInToTheFuture;
	
	const unsubscribeWeather = weather.subscribe(() => {
		const weatherDataObject = weather.getWeather();
		weatherData 			= weatherDataObject.weatherData;
		nextHoursWeatherData 	= weatherDataObject.nextHoursWeatherData;
		nextDaysWeatherData 	= weatherDataObject.nextDaysWeatherData;
	
		visiblePlanetsData 		= weather.getVisiblePlanets();

		daysInToTheFuture 		= weather.getDaysInToTheFuture();

		searchFormOpen 			= weatherDataObject.weatherData.error != undefined;
	})

	onDestroy(unsubscribeWeather);
</script>

<main>
	{#if searchFormOpen}
		<section class="search-form">
			<SearchForm bind:isLoggedIn/>
		</section>
	{:else}
    	<section>			
			<div class="main-wrapper">
				<MainWeatherInfo bind:weatherData bind:daysInToTheFuture bind:settings/>
				<HomepageButtons disable={!weatherData.temp} bind:daysInToTheFuture bind:savedLocations bind:session={data.session}/>
			</div>
	
			<NextHoursWeather bind:nextHoursWeatherData bind:settings/>
			<WeatherOverview bind:weatherData bind:nextDaysWeatherData bind:nextHoursWeatherData bind:visiblePlanetsData bind:daysInToTheFuture bind:settings/>
			<Apod bind:daysInToTheFuture/>

			<!--<h3>Wetterdaten für die nächsten 3 Tage:</h3>
			{#await nextDaysWeatherData}
				<p>checke Wetter für die nächsten Tage</p>
			{:then data} 
				{#if data.error}
					<p>{data.error.message}</p>
				{:else}
					{#each data.day as day}
						<p>{day.date}</p>
						<p>- max temp: {day.maxtemp.c}°C</p>
						<p>- min temp: {day.mintemp.c}°C</p>
					{/each}
				{/if}	
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}-->
		</section>
	{/if}
</main>


<style lang="scss">
	@import '../components/weather-tiles/weather-tiles.scss';

	main {
		margin-top: 5em;
	}

	/* The following lines are just temporary */
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

	@media only screen and (min-width: 450px) {
        .main-wrapper .macro-buttons {
			flex-direction: row;
		}
    }

	section {
		margin: 0.5em 0;
	}	
</style>