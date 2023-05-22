<script lang="ts">
    import { weather } from "$lib/js/weatherStore";
	import bookmarkFull from '$lib/assets/svg/menu/bookmark-full.svg';

    export let isLoggedIn:boolean;
    export let savedLocations: {[x: string]: any;}[] | null;

    let newLocation: string = "";

    let onLocationSubmit = async () => {
        weather.set(newLocation);
    }

	let geoLocationLoading = false;
	let onGeoLocationSubmit = async () => {
		geoLocationLoading = true;
		navigator.geolocation.getCurrentPosition((pos) => {
			weather.set(pos.coords.latitude + "," + pos.coords.longitude);
		}, 
		(error) => {
			geoLocationLoading = false;
		}), {
			timeout: 5000,
  			maximumAge: 0,
		};
	}
</script>

<main>
	<h1 class="headline">Wetter in...</h1>
	<form on:submit|preventDefault={onLocationSubmit}>
		<input type="search" name="location" bind:value={newLocation} placeholder="Ort eintragen" required>

		<input type="submit" value="Nach Ort suchen" />
	</form>

	<p>oder</p>

	<form on:submit|preventDefault={onGeoLocationSubmit}>
		<input 
			type="submit" 
			value={geoLocationLoading ? "Nach Koordinaten suchen ..." : "Standort benutzen"} 
		/>
	</form>

    {#if isLoggedIn === false}
		<a href="/login">Login</a>
        <a href="/register">Registrieren</a>

	{:else}
	<div class="locations">
		{#if savedLocations}
			<h2>Gespeicherte Orte</h2>
			{#each savedLocations as location}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="savedLocation" on:click|preventDefault="{() => weather.set(location.location_name)}">
					<img src={bookmarkFull} alt="bookmark">
					<p>{location.location_name}</p>
				</div>
			{/each}                            
		{/if}
	</div>
    {/if}
</main>

<style lang="scss">
	@import '../routes/\(account\)/accountpage-layout.scss';

	form, h2 {
		display: contents;
	}

	p {
		margin: var(--spacing-sm);
    	align-self: center;
	}

	.locations {
		margin-top: var(--spacing-lg);
		width: 100%;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: stretch;
		gap: var(--spacing-sm);

		.savedLocation{
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			gap: var(--spacing-md);
			background: var(--primary-accent-color);
			padding: var(--spacing-sm);
			flex-wrap: nowrap;
			border-radius: 4px;
			box-sizing: border-box;
			cursor: pointer;
			
			img {
				width: 32px;
			}

			p{
				flex: 1;
				font-size: 2em;
    			margin: 0;
			}
		}
	}

</style>