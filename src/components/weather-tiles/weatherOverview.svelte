<script lang="ts">
	import {latitude, longitude} from "../../lib/js/api/weatherApi"
	import {getAPOD} from "../../lib/js/api/apodApi";
	import {getVisiblePlanetsData} from "../../lib/js/api/visiblePlanetsAPI";

	export let weatherData:any;
	export let nextDaysWeatherData:any;

	
	// APOD - Astronomy Picture of the Day
	let apodData = getAPOD();

	// Visible Planets API
	let visiblePlanetsData = getVisiblePlanetsData(latitude, longitude);

    function handleVisiblePlanetsClick(){
        visiblePlanetsData = getVisiblePlanetsData(latitude, longitude);
    }
</script>



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

        {/if}		
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}



    {#await nextDaysWeatherData}
        <p>hole Wetterinformationen...</p>
    {:then data}
        {#if data.error}
            <p>{data.error.message}</p>
        {:else}
            <div class="temp-range">
                <div class="description">Max: <span class="value">{data.day[0].maxtemp_c} °C</span></div> 
                <div class="description">Min: <span class="value">{data.day[0].mintemp_c} °C</span></div> 
            </div>
            <div class="sun-and-moon">
                <div class="description">Sonnen&shyaufgang: <span class="value">{data.day[0].sunrise}</span></div> 
                <div class="description">Sonnen&shyuntergang: <span class="value">{data.day[0].sunset}</span></div> 
                <div class="description">Mond&shyaufgang: <span class="value">{data.day[0].moonrise}</span></div> 
                <div class="description">Mond&shyuntergang: <span class="value">{data.day[0].moonset}</span></div> 
                <p></p>
            </div>
        {/if}		
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}


    <!-- APOD - Astronomy Picture of the Day -->

    {#await apodData}
        <p>hole Astronomy Picture of the Day</p>
    {:then data} 

        <div class="apod">
            <p class="description">{data.title}</p> 
            <!-- The following code line is required because the alt-tag of the image contains the word "picture" which throws a warning. -->
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img src={data.url} alt="APOD - Astronomy Picture of the Day">
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
</div>

<style lang="scss">
	$background-tiles-color: rgba(88, 88, 88, 0.3);

    .grid-container {
			display: grid;
			grid-template-columns: 34.5% 34.5% 34.5%;
			grid-template-rows: 120px 120px 120px 120px 120px;
			gap: var(--spacing-sm);
			padding-right: 1em;
		}
			
		.grid-container > div {
			text-align: center;
			background: $background-tiles-color;
			gap: 1.25em;
			padding: 0 10px 10px 10px;
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
			grid-row-end: 4;
		}

		.apod {
			grid-column-start: 1;
			grid-column-end: 4;
			grid-row-start: 4;
			grid-row-end: 6;

			img {
				width: 70%;
				height:70%;
			}
		}

		.sun-and-moon {
			grid-column-start: 1;
			grid-column-end: 3;
			grid-row-start: 3;
			grid-row-end: 4;
			text-align: left !important;
			padding: 15px 0 0 15px !important;
			
		}

		.temp-range {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
			text-align: left !important;
			padding: 35px 0 0 15px !important;
		}

		.description {
			font-size: 18px;
			font-weight: bold;
		 	color: var(--text-color);

			.value {
				font-weight: normal;
				font-size: 16px;
			}
		}
</style>