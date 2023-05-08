<script lang="ts">
	import { applySettingToTemp } from "$lib/js/util/settingsUtils";


	export let weatherData:any;
	export let nextDaysWeatherData:any;
    export let visiblePlanetsData:any;
    export let settings:any;

</script>



<div class="grid-container">
    {#await weatherData}
        <p>hole Wetterinformationen...</p>
    {:then data}
        {#if data.error}
            <p>{data.error.message}</p>
        {:else}
        
            <div class="feelslike tile">
                <p class="description">gefühlte Temperatur</p>
                <p>	{applySettingToTemp(settings, data.feelslike)} </p>
            </div>
            <div class="condition tile">
                <p class="description">Wetter&shykondition</p>
                <p> {data.current.condition.text} </p>
            </div>
            <div class="humidity tile">
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
            <div class="temp-range tile">
                <p class="description">
                    Max: 
                    <span class="value">
                        {applySettingToTemp(settings, data.day[0].maxTemp)}
                    </span>
                </p> 
                <p class="description">
                    Min: 
                    <span class="value">
                        {applySettingToTemp(settings, data.day[0].minTemp)}
                    </span>
                </p> 
            </div>
            <div class="sun-and-moon tile">
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

    <!-- Visible Planets -->
    {#await visiblePlanetsData}
        <p>In den Sternenhimmel schauen ...</p>
    {:then visiblePlanetsData} 
        {#if visiblePlanetsData.error}
            <p>{visiblePlanetsData.error.message}</p>
        {:else}

            <div class="visiblePlanet tile">
                <p class="description">zu sehende Planeten:</p>
                {#each visiblePlanetsData as data}
                    <p>{data.name}</p>
                {/each}
            </div>
            
        {/if}
    {/await} 
</div>

<style lang="scss">
    @import './weather-tiles.scss';

    .grid-container {
        width: calc(100% - calc(2 * var(--spacing-sm)));
        padding-top: var(--spacing-sm);

        display: grid;
        grid-template-columns: 33.3% 33.3% 33.3%;
        grid-template-rows: auto auto auto auto;
        gap: var(--spacing-sm);
		
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

		.sun-and-moon {
			grid-column-start: 1;
			grid-column-end: 3;
			grid-row-start: 3;
			grid-row-end: 4;
			text-align: left !important;
			padding: 15px 0 0 15px !important;
			word-break: initial;
		}

		.temp-range {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
		}

		.description {
			font-size: 18px;
			font-weight: bold;

			.value {
				font-weight: normal;
				font-size: 16px;
			}
		}
    }
</style>