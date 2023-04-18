<!--

	This is based on: https://svelte.dev/tutorial/await-blocks

-->

<script>
	import {getCurrentWeatherData, latitude, longitude} from "../api/weatherApi.svelte";
	import {getAPOD} from "../api/apodApi.svelte";
	import {getVisiblePlanetsData} from "../api/visiblePlanetsAPI.svelte";

	// Weather API
	let location = "Dresden";
	let weatherData = getCurrentWeatherData(location);

	function handleWeatherDataClick(){
		weatherData = getCurrentWeatherData(location);
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

<section>
	<h1>API Prototype</h1>
	<h2>Wetter API</h2>
	<input placeholder="Ort eintragen" bind:value={location}>
	<button on:click={handleWeatherDataClick}>Wetterdaten bekommen</button>

	{#await weatherData}
		<p>hole Wetterinformationen...</p>
	{:then data}
		<p>Wetterdaten für: {data.location}</p>
		<p>Temperatur: {data.temp_C} °C</p>
		<p>gefühlte Temperatur: {data.feelslike_c} °C</p>
		<p>Wetterkondition: {data.condition}</p>
		<p>Luftfeuchtigkeit: {data.humidity} %</p>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}

	<h2>APOD - Astronomy Picture of the Day</h2>
	<button on:click={handleAPODClick}>Picture of the Day</button>

	{#await apodData}
		<p>hole Astronomy Picture of the Day</p>
	{:then data} 
		<p>{data.title} - {data.date}</p>
		<!-- The following code line is required because the alt-tag of the image contains the word "picture" which throws a warning. -->
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img src={data.url} alt="APOD - Astronomy Picture of the Day" width="50%">
	{/await}

	<h2>Visible Planets</h2>
	<button on:click={handleVisiblePlanetsClick}>Scuhe Planeten am Himmel</button>
	{#await visiblePlanetsData}
		<p>Suche sichtbare Planeten...</p>
	{:then visiblePlanetsData} 
		{#each visiblePlanetsData as data}
			<p>{data.name}</p>
		{/each}
	{/await}
</section>