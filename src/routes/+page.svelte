<!--

	This is based on: https://svelte.dev/tutorial/await-blocks

-->

<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { supabaseClient } from "$lib/js/supabase";
	import type { PageData } from "./$types";

	import {getCurrentWeatherData, latitude, longitude, getNextHoursWeatherData, getNextDaysWeatherData} from "../api/weatherApi"
	import {getAPOD} from "../api/apodApi";
	import {getVisiblePlanetsData} from "../api/visiblePlanetsAPI";

    export let data:PageData;

	// Weather API
	let location = "";
	let weatherData = getCurrentWeatherData(location);
	let nextHoursWeatherData = getNextHoursWeatherData(location);
	let nextDaysWeatherData = getNextDaysWeatherData(location);

	function handleWeatherDataClick(){
		weatherData = getCurrentWeatherData(location);
		nextHoursWeatherData = getNextHoursWeatherData(location);
		nextDaysWeatherData = getNextDaysWeatherData(location);
	}
	
	// APOD - Astronomy Picture of the Day
	let apodData = getAPOD();

	function handleAPODClick(){
		apodData = getAPOD();
	}

    	// Visible Planets API
	let visiblePlanetsData = getVisiblePlanetsData(latitude, longitude);

    function handleVisiblePlanetsClick(){
        visiblePlanetsData = getVisiblePlanetsData(latitude, longitude);
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
        <p>Sie sind noch nicht eingeloggt. Navigieren sie zum Burgermenü.</p>
    {/if}
    </section>
    <section>
        <h1>API Prototype</h1>
        <h2>Wetter API</h2>
		
        {#await weatherData}
            <p>hole Wetterinformationen...</p>
        {:then data}
            {#if data.error}
                <p>{data.error.message}</p>
            {:else}
                <div class="main-info">
	                <div class="temperature">{data.current.temp_c} °C</div>
				<div class="location">{data.location.name}</div>
			</div>

			<div class="weather-indicator"></div>

			<div class="side-info">
	                <p>gefühlte Temperatur: {data.current.feelslike_c} °C</p>
	                <p>Wetterkondition: {data.current.condition.text}</p>
	                <p>Luftfeuchtigkeit: {data.current.humidity} %</p>
			</div>
            {/if}		
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}

		<!--<h3>Wetterdaten für die nächsten 5 Stunden:</h3>
		{#await nextHoursWeatherData}
			<p>checke Wetter für die nächsten Stunden</p>
		{:then data} 
			{#if data.error}
				<p>{data.error.message}</p>
			{:else}
				{#each data.hour as hour}
					<p>{hour.time}: {hour.temp_c}°C</p>
				{/each}
			{/if}	
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
		<br>
		<h3>Wetterdaten für die nächsten 3 Tage:</h3>
		{#await nextDaysWeatherData}
			<p>checke Wetter für die nächsten Tage</p>
		{:then data} 
			{#if data.error}
				<p>{data.error.message}</p>
			{:else}
				{#each data.day as day}
					<p>{day.date}</p>
					<p>- max temp: {day.maxtemp_c}°C</p>
					<p>- min temp: {day.mintemp_c}°C</p>
				{/each}
			{/if}	
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}-->

		<!-- <h2>APOD - Astronomy Picture of the Day</h2>
		<button on:click={handleAPODClick}>Picture of the Day</button>

		{#await apodData}
			<p>hole Astronomy Picture of the Day</p>
		{:then data} 
			<p>{data.title} - {data.date}</p> -->
			<!-- The following code line is required because the alt-tag of the image contains the word "picture" which throws a warning. -->
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<!-- <img src={data.url} alt="APOD - Astronomy Picture of the Day" width="50%">
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await} -->

		<!-- <h2>Visible Planets</h2>
		<button on:click={handleVisiblePlanetsClick}>Suche Planeten am Himmel</button>
		{#await visiblePlanetsData}
			<p>Suche sichtbare Planeten...</p>
		{:then visiblePlanetsData} 
			{#if visiblePlanetsData.error}
				<p>{visiblePlanetsData.error.message}</p>
			{:else}
				{#each visiblePlanetsData as data}
					<p>{data.name}</p>
				{/each}
			{/if}

		{/await} -->
		<form>
			<input placeholder="Ort eintragen" bind:value={location}>
			<input class="button" type="submit" value="Wetterdaten bekommen" on:click={handleWeatherDataClick}>
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



	section {
		margin: 0.5em;

		.main-info {
			margin-top: 4.375em;
			margin-left: 0.625em;
			color: white;
			text-shadow: 2px 4px 4px #716666; /* horizontal vertiacal blur color */

			.temperature {
				font-family: 'Chewy', cursive;
				font-size: 3.5em;
			}

			.location {
				font-size: 1.55em;
				margin-top: -1em;
			}
		}

		.weather-indicator{
			background: rgba(255, 255, 255, 0.3);
			margin-top: 1.25em;
			height: 9.375em;
			width: 100%;
			border-radius: 0.438em;
		}

		.side-info {
			background: rgba(255, 255, 255, 0.3);
			margin-top: 1.25em;
			padding: 0.625em;
			height: 18.75em;
			width: 100%;;
			border-radius: 0.438em;
		}
	}	
</style>