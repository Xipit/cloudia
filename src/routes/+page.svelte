<!--

	This is based on: https://svelte.dev/tutorial/await-blocks

-->

<script>
	let weatherData = getCurrentWeatherData();
	const BASE_URL = "http://api.weatherapi.com/v1/";
	const API_KEY = "d02fc8f55f1a44e481294946230304";
	let location = "Dresden";

	let weatherDataObject = {
		location: typeof(String),
		temp_C: typeof(String),
		feelslike_c: typeof(String),
		condition: typeof(String),
		humidity: typeof(String)
	}

	async function API_REQUEST(){
		let url = BASE_URL + "current.json?key=" + API_KEY + "&q=" + location;

        return await fetch(
            url,
            {
                method: 'GET',
            }
        );
	}

	async function getCurrentWeatherData(){
		const response = await API_REQUEST();
        const data = await response.json();		

		weatherDataObject = {
			location: data.location.name,
			temp_C: data.current.temp_c,
			feelslike_c: data.current.feelslike_c,
			condition: data.current.condition.text,
			humidity: data.current.humidity
		}

		if (response.ok){
			return weatherDataObject;
		} else {
			throw new Error(data)
		}
	}

	function handleClick(){
		weatherData = getCurrentWeatherData();
	}
	
</script>

<section>
	<h1>API Prototype</h1>
	<h2>Wetter API</h2>
	<input placeholder="Ort eintragen" bind:value={location}>
	<button on:click={handleClick}>Wetterdaten bekommen</button>

	{#await weatherData}
		<p>hole Wetterinformationen...</p>
	{:then data}
		<p>Es sind zur Zeit {data.temp_C} °C in {data.location}.</p>
		<p>Es fühlt sich wie {data.feelslike_c} °C an.</p>
		<p>Folgende Wetterkonditionen liegen vor: {data.condition}.</p>
		<p>Die Luftfeuchtigkeit liegt bei {data.humidity} %.</p>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}

</section>