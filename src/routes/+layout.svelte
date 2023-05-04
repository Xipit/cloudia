<script lang="ts">
	import Header from './Header.svelte';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	// Import different Weather Backgrounds
	import Storm from './(weather-backgrounds)/storm.svelte';
	import Cloud from './(weather-backgrounds)/cloud.svelte';
	import Sun from './(weather-backgrounds)/sun.svelte';
	import Snow from './(weather-backgrounds)/snow.svelte';
	import Rain from './(weather-backgrounds)/rain.svelte';
	import { generalWeatherCondition, getGeneralisedWeatherCondition } from '$lib/js/latestLocationUtil';
	import { latestWeatherCondition } from '$lib/stores';
	import { get } from 'svelte/store';

	// AUTHENTICATION 
	export let data: LayoutData;
	$: ({ supabase, session } = data);
	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {
			console.log('Auth state change detected');
			invalidate('supabase:auth');

		});
		return () => subscription.unsubscribe();
	})

	let isLoggedIn:boolean = data.session !== null;

	let weatherCondition = get(latestWeatherCondition);
</script>

<!--
	to display different weather backgrounds add a switch statement
	that looks current weather condition to determent the right component
-->

{#if weatherCondition === generalWeatherCondition.storm}
	<Storm />
{:else if weatherCondition === generalWeatherCondition.rain}
	<Rain />
{:else if weatherCondition === generalWeatherCondition.snow}
	<Snow />
{:else if weatherCondition === generalWeatherCondition.cloud}
	<Cloud />
{:else if weatherCondition === generalWeatherCondition.sun}
	<Sun />
{:else}
	<Sun />
{/if}


<!--
	TODO: caused performance problems
	<Storm />
-->

<div class="app">
	<Header bind:isLoggedIn={isLoggedIn}/>

	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	@import '../app.scss';

	:global(html) {
        background-image: linear-gradient(to top, var(--primary-bg-color), var(--secondary-bg-color));
        font-family: 'Atkinson Hyperlegible', sans-serif;
		color: var(--text-color);
    }
	
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
	
</style>
