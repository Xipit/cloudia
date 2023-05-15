<script lang="ts">
	import type { PageData } from "./$types";

	import nextDay from '$lib/assets/svg/homepage/nextDay.svg';
	import previousDay from '$lib/assets/svg/homepage/previousDay.svg';
	import resetLocation from '$lib/assets/svg/homepage/resetLocation.svg';

	import { weather } from "$lib/js/weatherStore";
	import { onDestroy } from "svelte";

	import MainWeatherInfo from "../components/weather-tiles/mainWeatherInfo.svelte";
	import NextHoursWeather from "../components/weather-tiles/nextHoursWeather.svelte";
	import WeatherOverview from "../components/weather-tiles/weatherOverview.svelte";
	import Apod from "../components/weather-tiles/apod.svelte";
	import SearchForm from "../components/searchForm.svelte";

    export let data: PageData;

	let { settings } = data;
	let isLoggedIn:boolean = data.session !== null;
	$: searchFormOpen = false;

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
	})

	onDestroy(unsubscribeWeather);
	
	let newLocation: string = "";

	let onLocationSubmit = async () => {
		weather.set(newLocation)
	}

	$: if (weatherData.error) {
		searchFormOpen = true;
	}

</script>

<main>
	{#if searchFormOpen}
		<section class="search-form">
			<SearchForm bind:isLoggedIn bind:open={searchFormOpen}/>
		</section>
	{:else}
    	<section>			
			<div class="main-wrapper">
				<MainWeatherInfo bind:weatherData bind:daysInToTheFuture bind:settings/>
				<div class="macro-buttons">
					<button
						class="tile"
						disabled={!weatherData.temp}
						on:click={() => {weather.resetData()}}
					>
						<img src={resetLocation} id="resetLocation" alt="Ort zurücksetzen">
					</button>

					<button 
						class="tile"
						disabled={!weatherData.temp || daysInToTheFuture == 0}
						on:click={() => {weather.setDaysInToTheFuture(daysInToTheFuture - 1);}}
					>
					<img src={previousDay} id="previousDay" alt="Tag vorher">
					</button>
					<button 
						class="tile"
						disabled={!weatherData.temp || daysInToTheFuture == 2}
						on:click={() => {weather.setDaysInToTheFuture(daysInToTheFuture + 1);}}
					>
						<img src={nextDay} id="nextDay" alt="Tag danach">
					</button>
				</div>
			</div>

			<NextHoursWeather bind:nextHoursWeatherData bind:settings/>
			<WeatherOverview bind:weatherData bind:nextDaysWeatherData bind:visiblePlanetsData bind:daysInToTheFuture bind:settings/>
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
			

			<form on:submit|preventDefault={onLocationSubmit}>
				<input type="search" name="location" bind:value={newLocation} placeholder="Ort eintragen" >
				<button type="submit">Wetterdaten bekommen</button>
			</form>

		</section>
	{/if}
</main>


<style lang="scss">
	@import '../components/weather-tiles/weather-tiles.scss';


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

		.main-info {
			flex: 2;
		}

		.macro-buttons {
			flex: 1;

			justify-content: flex-end;
			display: flex;
			flex-direction: column;
			align-content: flex-end;
			flex-wrap: wrap;
			align-items: stretch;
			gap: var(--spacing-sm);

			button {
				width: 40px;
				height: 40px;

				align-items: center;
				justify-content: center;
				display: inline-flex;
				padding: var(--spacing-sm);
				border: 0;

				&:disabled {
					opacity: 0.4;
				}
			}
		}

		.button {
			font-size: 1.3em;
			background-color: azure;		
			padding: 0.3em;

			&:hover, &:active, &:focus{
				background-color: blanchedalmond;
			}
		}
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