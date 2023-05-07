<script lang="ts">
	import type { PageData } from "./$types";

	import { goto } from "$app/navigation";
	import { browser } from "$app/environment";

	import MainWeatherInfo from "./mainWeatherInfo.svelte";
	import NextHoursWeather from "./nextHoursWeather.svelte";
	import WeatherOverview from "./weatherOverview.svelte";

    export let data:PageData;

	// Weather API
	let location = data.location;

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
        <MainWeatherInfo bind:data/>
		<NextHoursWeather bind:data/>
		<WeatherOverview bind:data/>


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
		

		<form on:submit|preventDefault={onLocationSubmit}>
			<input type="search" name="location" bind:value={location} placeholder="Ort eintragen" >
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

	section {
		margin: 0.5em;
	}	
</style>