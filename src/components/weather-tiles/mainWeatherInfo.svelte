<script lang="ts">
	import { applySettingToTemp } from "$lib/js/util/settingsUtils";

    export let weatherData: any;
    export let settings: any;
    export let daysInToTheFuture:number;
</script>


{#await weatherData}
    <p>hole Wetterinformationen...</p>
{:then data}
    {#if data.error}
        <p>{data.error.message}</p>
    {:else}
        <div class="main-info">
            <div class="temperature">
                {#if daysInToTheFuture == 0}
                    {applySettingToTemp(settings, data.temp)}
                {:else if daysInToTheFuture == 1}
                    Morgen 
                {:else}
                    Übermorgen
                {/if}
            </div>
            <div class="location">
                {daysInToTheFuture > 0
                    ? data.location.name + " (Lokale Zeit)"
                    : data.location.name
                }
            </div>
        </div>
    {/if}		
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}


<style lang="scss">
	@import './weatherTiles.scss';

    .main-info {
			margin-top: 4.375em;
			margin-left: 0.625em;
			text-shadow: 2px 4px 4px #716666; /* horizontal vertiacal blur color */

			.temperature {
				font-family: $font-accent;
				font-size: 3.5em;
			}

			.location {
				font-size: 1.55em;
			}
		}
</style>