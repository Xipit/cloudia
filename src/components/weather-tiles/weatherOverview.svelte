<script lang="ts">
	import { applySettingToSpeed, applySettingToTemp } from "$lib/js/util/settingsUtils";


	export let weatherData:any;
	export let nextDaysWeatherData:any;
    export let nextHoursWeatherData:any;
    export let visiblePlanetsData:any;
    export let settings:any;
    export let daysInToTheFuture:number;

</script>



<div class="grid-container">
    <!--integration of the individual tiles with data-->
    {#await weatherData}
        <p>hole Wetterinformationen...</p>
    {:then data}
        <!-- svelte-ignore empty-block -->
        {#if data.error}
            <p>{data.error.message}</p>
        {:else if daysInToTheFuture > 0}
        {:else}
            <div class="feelslike tile">
                <p class="description">gefühlte Tempe&shyratur</p>
                <span class="value">{applySettingToTemp(settings, data.feelslike)} </span>
            </div>
            <div class="condition tile">
                <p class="description">aktuelle Wetter&shykondition</p>
                <p class="value"> {data.current.condition.text} </p> <!-- TODO daysintothefuture-->
            </div>
            <div class="humidity tile">
                <p class="description">Luftfeuchtig&shykeit</p>
                <p class="value">{data.current.humidity} % </p>
            </div>
            <div class="wind tile">
                <p class="description">Wind</p>
                <span class="value">{applySettingToSpeed(settings, data.windSpeed) + " von " + data.windDirection}</span>
            </div>
        {/if}		
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}


    <!--integration of the individual tiles with data for the next two days-->
    {#await nextDaysWeatherData}
        <p>hole Wetterinformationen...</p>
    {:then data}
        {#if data.error}
            <p>{data.error.message}</p>
        {:else}

            {#if daysInToTheFuture > 0}
                <div class="feelslike tile">
                    <p class="description">Temperatur (Durch&shyschnitt)</p>
                    <span class="value">{applySettingToTemp(settings, data.day[daysInToTheFuture].avgTemp)} </span>
                </div>
                <div class="condition tile">
                    <p class="description">Wetter&shykondition (Durch&shyschnitt)</p>
                    <p class="value"> {data.day[daysInToTheFuture].conditionText} </p> <!-- TODO daysintothefuture-->
                </div>
                <div class="humidity tile">
                    <p class="description">Luftfeuchtig&shykeit (Durch&shyschnitt)</p>
                    <p class="value">	{data.day[daysInToTheFuture].avgHumidity} % </p> <!-- TODO daysintothefuture-->
                </div>
                <div class="wind tile">
                    <p class="description">Max. Windgeschwindigkeit</p>
                    <span class="value">{applySettingToSpeed(settings, data.day[daysInToTheFuture].maxWindSpeed)}</span>
                </div>
            {/if}

            <div class="temp-range tile">
                <p class="description">
                    Max: 
                    <span class="value">
                        {applySettingToTemp(settings, data.day[daysInToTheFuture].maxTemp)}
                    </span>
                </p> 
                <p class="description">
                    Min: 
                    <span class="value">
                        {applySettingToTemp(settings, data.day[daysInToTheFuture].minTemp)}
                    </span>
                </p> 
            </div>

            <div class="rain-amount tile">
                <p class="description">Regen&shymenge</p>
                <span class="value">{data.day[daysInToTheFuture].rainAmount.mm} mm</span>
            </div>

            <div class="sun-and-moon tile">
                <div class="description">
                    Sonnen&shyaufgang: <span class="value">{data.day[daysInToTheFuture].sunrise}</span>
                </div> 
                <div class="description">
                    Sonnen&shyuntergang: <span class="value">{data.day[daysInToTheFuture].sunset}</span>
                </div> 
                <div class="description moon">
                    Mond&shyaufgang: <span class="value">{data.day[daysInToTheFuture].moonrise}</span>
                </div> 
                <div class="description moon">
                    Mond&shyuntergang: <span class="value">{data.day[daysInToTheFuture].moonset}</span>
                </div> 
                <p></p>
            </div>
        {/if}		
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}

    {#await nextHoursWeatherData}
        <p>hole Wetterinformationen...</p>
    {:then data}
        {#if data.error}
            <p>{data.error.message}</p>
        {:else}
            <div class="rain-chance tile">
                <p class="description">Regen&shywahrschein&shylich&shykeit ({data.hour[0].time})</p>
                <span class="value">{data.hour[0].chanceOfRain} %</span>
            </div> 
        {/if}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}

    <!-- Code for Visible Planets -->
    {#await visiblePlanetsData}
        <p>In den Sternenhimmel schauen ...</p>
    {:then visiblePlanetsData} 
        {#if visiblePlanetsData.error}
            <p>{visiblePlanetsData.error.message}</p>
        {:else if daysInToTheFuture > 0}
            <div class="visiblePlanet tile">
                <p class="description">sichtbare Planeten:</p>
                <p class="value"> Keine Vorschau möglich. </p>
            </div>
        {:else}

            <div class="visiblePlanet tile">
                <p class="description">sichtbare Planeten:</p>
                {#each visiblePlanetsData as data}
                    <p class="value">{data.name}</p>
                {/each}
            </div>
            
        {/if}
    {/await} 
</div>

<style lang="scss">
    @import './weatherTiles.scss';

    .grid-container {
        width: calc(100% - calc(2 * var(--spacing-sm)));
        padding-top: var(--spacing-sm);

        display: grid;
        grid-template-columns: 33.5% 33.5% 33.5%;
        grid-template-rows: auto auto auto auto auto;
        gap: var(--spacing-sm);

		// the following lines define the position of every tile
		.humidity {
			grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 2;
			grid-row-end: 3;
		}

        .wind {
            grid-column-start: 3;
			grid-column-end: 4;
			grid-row-start: 1;
			grid-row-end: 2;
        }

		.visiblePlanet {
			grid-column-start: 3;
			grid-column-end: 4;
			grid-row-start: 2;
			grid-row-end: 5;
		}

		.sun-and-moon {
			grid-column-start: 1;
			grid-column-end: 3;
			grid-row-start: 4;
			grid-row-end: 5;
			text-align: left !important;
			padding: 15px 15px 0 15px !important;
			word-break: initial;
		}

		.temp-range {
			grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 2;
			grid-row-end: 3;
		}

        .rain-amount{
            grid-column-start: 1;
			grid-column-end: 2;
			grid-row-start: 3;
			grid-row-end: 4;
        }

        .rain-chance {
            grid-column-start: 2;
			grid-column-end: 3;
			grid-row-start: 3;
			grid-row-end: 4;
        }
        //end of definiton

		.description {
			font-size: 1.1em;
			font-weight: bold;

			.value {
				font-weight: normal;
				font-size: 0.9em;
			}
		}

        .value {
            font-weight: normal;
            font-size: 1em;
        }
    }

    //for big screens
	@media only screen and (min-width: 850px) {
        .grid-container {
            grid-template-rows: auto auto 120px auto;
            .sun-and-moon {
                padding: 35px 50px 15px 30px !important;

                .moon {
                    position: relative;
                    bottom: 54px;
                    left: 58%;
                    text-align: left;
                }
            }

            .description {
                font-size: 1.32em;

                .value {
                    font-size: 0.8em;
                }
            }

            .value {
                font-size: 1.19em;
            }
        }
    }
</style>