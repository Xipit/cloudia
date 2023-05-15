<script lang="ts">
	import type { PageData } from "./$types";

	import { weather } from "$lib/js/weatherStore";
	import { onDestroy } from "svelte";

	import MainWeatherInfo from "../components/weather-tiles/mainWeatherInfo.svelte";
	import NextHoursWeather from "../components/weather-tiles/nextHoursWeather.svelte";
	import WeatherOverview from "../components/weather-tiles/weatherOverview.svelte";
	import Apod from "../components/weather-tiles/apod.svelte";
	import HomepageButtons from "../components/homepage-buttons.svelte";

    export let data: PageData;

	let { settings } = data;

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
</script>

<main>
    <section>
        {#if data.session }
        <p>Welcome {data.session.user.email}</p>
        <form action="/logout" method="POST">
            <button type="submit" class="button">LogOut</button>
        </form>
    {:else}
        <p>Sie sind noch nicht eingeloggt. Navigieren sie zum Burgermenü.</p> <br>
    {/if}
    </section>


    <section>		
		<div class="main-wrapper">
			<MainWeatherInfo bind:weatherData bind:daysInToTheFuture bind:settings/>
			<HomepageButtons disable={!weatherData.temp} bind:daysInToTheFuture />
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
</main>


<style lang="scss">
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

	section {
		margin: 0.5em 0;
	}	
</style>