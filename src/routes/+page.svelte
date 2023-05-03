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
	import { page } from "$app/stores";
	import { goto, invalidate } from "$app/navigation";
	import { browser } from "$app/environment";

    export let data:PageData;

	// Weather API
	let location = data.location;
	$:weatherData = data.weatherData;
	$:nextHoursWeatherData = data.nextHoursWeatherData;
	$:nextDaysWeatherData = data.nextDaysWeatherData;

	// adapted from : https://www.thinkprogramming.co.uk/search-via-querystring-sveltekit/ 
	let onLocationSubmit = async () => {
		let currentLocationParam: string | null = '';

		if(browser){
			const urlParams = new URLSearchParams(window.location.search);
			currentLocationParam = urlParams.get('location');
		}

		if(location.trim() === currentLocationParam?.trim())
			return;

		await goto(`/?location=${encodeURIComponent(location.trim())}`, {
			keepFocus: true
		})
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
        <p>Sie sind noch nicht eingeloggt. Navigieren sie zum Burgermenü.</p> <br>
    {/if}
    </section>

<!-- BEGIN: general weather information -->
    <section>		
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
            {/if}		
        {:catch error}
            <p style="color: red">{error.message}</p>
        {/await}


<!-- BEGIN: weather for the next 5 hours -->
		{#await nextHoursWeatherData}
			<p>checke Wetter für die nächsten Stunden</p>
		{:then data} 
			{#if data.error}
				<p>{data.error.message}</p>
			{:else}
				<div class="weather-indicator">
					{#each data.hour as hour}
						<div class="time-element">
							<div class="temp-hour">
								{hour.temp_c}°C
							</div>
							<img src={hour.conditionIconURL} alt="Sun">
							<hr>
							{hour.time}
						</div>
					{/each}
				</div>
			{/if}	
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
		<br>

	<!--<h3>Wetterdaten für die nächsten 3 Tage:</h3>
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


<!-- BEGIN: weater of the day overview -->
		<div class="grid-container">
			{#await weatherData}
			<p>hole Wetterinformationen...</p>
			{:then data}
			{#if data.error}
				<p>{data.error.message}</p>
			{:else}
			
				<div class="feelslike">
					<p class="description">gefühlte Temperatur</p>
					<p>	{data.current.feelslike_c} °C </p>
				</div>
				<div class="condition">
					<p class="description">Wetter&shykondition</p>
					<p> {data.current.condition.text} </p>
				</div>
				<div class="humidity">
					<p class="description">Luftfeuchtig&shykeit</p>
					<p>	{data.current.humidity} % </p>
				</div>
				<div class="temp-range">Maximale und Minimale Temperatur</div>
				<div class="sun-and-moon">Sonnenauf- und -untergang</div>
				
			 
			{/if}		
			{:catch error}
			<p style="color: red">{error.message}</p>
			{/await}

		

		

	<!-- APOD - Astronomy Picture of the Day -->

			<!-- button on:click={handleAPODClick}>Picture of the Day</button-->

			{#await apodData}
				<p>hole Astronomy Picture of the Day</p>
			{:then data} 

				<div class="apod">
					<p class="description">{data.title}</p> 
					<!-- The following code line is required because the alt-tag of the image contains the word "picture" which throws a warning. -->
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img src={data.url} alt="APOD - Astronomy Picture of the Day" width="50%">
				</div>
				
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await} 

		

	<!-- Visible Planets -->

			<button on:click={handleVisiblePlanetsClick}>Suche Planeten am Himmel</button>

			{#await visiblePlanetsData}
				<p>Suche sichtbare Planeten...</p>
			{:then visiblePlanetsData} 
				{#if visiblePlanetsData.error}
					<p>{visiblePlanetsData.error.message}</p>
				{:else}

					<div class="visiblePlanet">
						<p class="description">zu sehende Planeten:</p>
						{#each visiblePlanetsData as data}
							<p>{data.name}</p>
						{/each}
					</div>
					
				{/if}
			{/await} 

		<!--{/await}-->
		<form on:submit|preventDefault={onLocationSubmit}>
			<input type="search" name="location" bind:value={location} placeholder="Ort eintragen" >
			<button type="submit">Wetterdaten bekommen</button>
		</form>
	</section>
</main>


<style lang="scss">
	$font-accent: 'Chewy', cursive;
	$light-color: white;
	$background-tiles-color: rgba(88, 88, 88, 0.3);


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
			color: $light-color;
			text-shadow: 2px 4px 4px #716666; /* horizontal vertiacal blur color */

			.temperature {
				font-family: $font-accent;
				font-size: 3.5em;
			}

			.location {
				font-size: 1.55em;
				margin-top: -1em;
			}
		}

		.weather-indicator{
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: $background-tiles-color;
			margin-top: 1.25em;
			height: 9.375em;
			width: 100%;
			border-radius: 0.438em;

			.time-element {
				text-align: center;
				font-family: $font-accent;
				color: $light-color;
				font-size: 16px;

				.temp-hour {
					font-size: 21px;
				}

				hr {
					border-top: 3px solid $light-color;
					padding-bottom: 5px;
				}
			}

			img {
				width: 50px;
				padding: 10px;
			}
		}

		//BEGIN: everything for the grid-container
		.grid-container {
			display: grid;
			grid-template-columns: 33% 33% 33%;
			grid-template-rows: 120px 120px 120px 120px;
			gap: 10px;
			padding-right: 1em;
		}
			
		.grid-container > div {
			text-align: center;
			background: $background-tiles-color;
			gap: 1.25em;
			padding: 0.625em;
			border-radius: 0.438em;
		}

		.humidity {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 2;
			grid-row-end: 3;
		}

		.visiblePlanet {
			grid-column-start: 3;
			grid-column-end: 4;
			grid-row-start: 1;
			grid-row-end: 3;
		}

		.apod {
			grid-column-start: 2;
			grid-column-end: 4;
			grid-row-start: 3;
			grid-row-end: 5;

			img {
				width: 100%;
			}
		}

		.sun-and-moon {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 4;
		}

		.temp-range {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 4;
			grid-row-end: 5;
		}
		//END: everything for the grid-container

		.description {
			font-size: larger;
		 	font-family: "Chewy";
		 	color: $light-color;
		}
		
	}	
</style>