<script lang="ts">
    export let weatherData:any;
</script>


{#await weatherData}
    <p>hole Wetterinformationen...</p>
{:then data}
    {#if data.error}
        <p>{data.error.message}</p>
    {:else}
        <div class="main-info">
            <div class="temperature">{data.current.temp_c} °C</div>
            <div class="location">{data.location.name}</div>
        </div>
    {/if}		
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}


<style lang="scss">
	@import './weather-tiles.scss';

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