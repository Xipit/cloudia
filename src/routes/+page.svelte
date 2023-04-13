<!--

	This is based on: https://svelte.dev/tutorial/await-blocks

-->

<script>
	import {getCurrentWeatherData} from "../api/weatherApi.svelte";

	let location = "Dresden";
	let weatherData = getCurrentWeatherData(location);

	function handleWeatherDataClick(){
		weatherData = getCurrentWeatherData(location);
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
</section>