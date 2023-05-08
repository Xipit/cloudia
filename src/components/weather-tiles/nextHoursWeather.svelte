<script lang="ts">
	import { applySettingToTemp } from "$lib/js/util/settingsUtils";

    export let nextHoursWeatherData:any;
	export let settings:any;

</script>


{#await nextHoursWeatherData}
    <p>checke Wetter für die nächsten Stunden</p>
{:then data} 
    {#if data.error}
        <p>{data.error.message}</p>
    {:else}
        <div class="weather-indicator tile">
            {#each data.hour as hour}
                <div class="time-element">
                    <div class="hour">
						{hour.time}
					</div>
                    <img src={hour.conditionIconURL} alt="Sun">
                    <hr>
                    <div class="temp">
						{applySettingToTemp(settings, hour.temp)}
                    </div>
                </div>
            {/each}
        </div>
    {/if}	
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}

<style lang="scss">
	@import './weather-tiles.scss';

    .weather-indicator{
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 1.25em;
			width: 99%;
			border-radius: 0.438em;
			padding: var(--spacing-sm);

			.time-element {
				text-align: center;
				font-family: $font-accent;
				font-size: 20px;

				.hour, .temp{
					width: 100%;
				}

				.temp {
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
				filter: drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));
			}
		}

	@media only screen and (min-width: 850px) {
		.weather-indicator {
			.time-element {
				text-align: left;
				width: 20%;
				padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) var(--spacing-lg);
				border-left: 2px solid rgba(88, 88, 88, 0.3);
				border-right: 2px solid rgba(88, 88, 88, 0.3);

				.hour {
					margin-bottom: -70px;
				}

				hr {
					border: 0;
				}
			}

			img {
				position: relative;
				left: 60%;
				top: 45px;
				height: 40%;
			}
		}
	}
</style>