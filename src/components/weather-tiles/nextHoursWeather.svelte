<script lang="ts">
	import type { PageData } from "../../routes/$types";

    export let data:PageData;

	// Weather API
	$:nextHoursWeatherData = data.nextHoursWeatherData;
</script>


{#await nextHoursWeatherData}
    <p>checke Wetter für die nächsten Stunden</p>
{:then data} 
    {#if data.error}
        <p>{data.error.message}</p>
    {:else}
        <div class="weather-indicator">
            {#each data.hour as hour}
                <div class="time-element">
                    {hour.time}
                    <img src={hour.conditionIconURL} alt="Sun">
                    <hr>
                    <div class="temp-hour">
                        {hour.temp_c}°C
                    </div>
                </div>
            {/each}
        </div>
    {/if}	
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
<br>


<style lang="scss">
    $font-accent: 'Chewy', cursive;
	$background-tiles-color: rgba(88, 88, 88, 0.3);

    .weather-indicator{
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: $background-tiles-color;
			margin-top: 1.25em;
			margin-right: 500px;
			height: 9.375em;
			width: 100%;
			border-radius: 0.438em;
			padding: var(--spacing-sm);

			.time-element {
				text-align: center;
				font-family: $font-accent;
				color: var(--text-color);
				font-size: 20px;

				.temp-hour {
					padding-top: 5px;
				}

				hr {
					border-top: 3px solid var(--text-color);
					width: 70%;
				}
			}

			img {
				height: 35px;
				padding-top: 10px;
			}
		}
</style>