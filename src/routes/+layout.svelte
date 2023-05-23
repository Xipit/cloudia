<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import { redirect } from '@sveltejs/kit';
	import type { LayoutData } from './$types';
	
	// Import different Weather Backgrounds
	import Storm 	from '../components/weather-backgrounds/storm.svelte';
	import Rain 	from '../components/weather-backgrounds/rain.svelte';
	import Snow 	from '../components/weather-backgrounds/snow.svelte';
	import Cloud 	from '../components/weather-backgrounds/cloud.svelte';
	import Sun 		from '../components/weather-backgrounds/sun.svelte';
	
	import Header 	from '../components/burger-menu/header.svelte';

	import { weather } from '$lib/js/weatherStore';
	import { GeneralWeatherCondition } from '$lib/js/util/weatherStoreUtils';

	
	export let data: LayoutData;
	$: ({ savedLocations, supabase, session } = data);

	// run after component has been mounted into DOM
	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {

			// react to password recovery link and redirect to appropriate page
			if(event === "PASSWORD_RECOVERY"){
				throw redirect(302, '/login/change-password?token=' + _session?.access_token);
			}

			console.log('Auth state change detected');
			
			// throw away current session data, as it is no longer up to date
			invalidate('supabase:auth');
		});
		return () => subscription.unsubscribe();
	})

	let isLoggedIn:boolean = data.session !== null;
	let email:string|undefined = data.session?.user.email;


	let generalisedWeatherCondition:GeneralWeatherCondition;

	// react to weatherStore changes
	const unsubscribeWeather = weather.subscribe(() => {
		generalisedWeatherCondition = weather.getGeneralisedWeatherCondition();
	})

	onDestroy(unsubscribeWeather);
</script>

<!--
	to display different weather backgrounds add a switch statement
	that looks at current weather condition to determent the right component
-->

{#if generalisedWeatherCondition === GeneralWeatherCondition.storm}
	<Storm />
{:else if generalisedWeatherCondition === GeneralWeatherCondition.rain}
	<Rain />
{:else if generalisedWeatherCondition === GeneralWeatherCondition.snow}
	<Snow />
{:else if generalisedWeatherCondition === GeneralWeatherCondition.cloud}
	<Cloud />
{:else if generalisedWeatherCondition === GeneralWeatherCondition.sun}
	<Sun />
{:else}
	<!-- no location selected -->
{/if}

<div class="app">
	<Header bind:isLoggedIn bind:savedLocations bind:email/>

	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	@import '../app.scss';

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
		max-width: var(--main-max-width);
		margin: 0 auto;
		box-sizing: border-box;
	}
	
</style>
