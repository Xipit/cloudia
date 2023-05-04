<script lang="ts">
	import Header from './Header.svelte';

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


<!--
	TODO: caused performance problems
	<Storm />
-->

<div class="app">
	<Header bind:isLoggedIn={isLoggedIn} bind:savedLocations={savedLocations}/>

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
