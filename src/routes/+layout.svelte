<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';


	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	import Storm from './(weather-backgrounds)/storm.svelte';

	

	// AUTHENTICATION 
	export let data: LayoutData;
	$: ({ savedLocations, supabase, session } = data);

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

</script>

<!--
	to display different weather backgrounds add a switch statement
	that looks current weather condition to determent the right component
-->

<Storm />

<div class="app">
	<Header bind:isLoggedIn={isLoggedIn} bind:savedLocations={savedLocations}/>

	<main>
		<slot />
	</main>
</div>

<style>
	:global(html) {
        background-image: linear-gradient(to top, #626060, #394651);
        font-family: 'Atkinson Hyperlegible', sans-serif;
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
