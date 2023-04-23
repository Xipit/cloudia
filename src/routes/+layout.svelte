<head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Chewy&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
</head>

<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';


	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	// AUTHENTICATION 
	export let data: LayoutData;
	$: ({ supabase, session } = data);
	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at){
				invalidate('supabase:auth');
			}
		});
		return () => subscription.unsubscribe();
	})
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>
</div>

<style>
	:global(html) {
        background-image: linear-gradient(to top, #ffdd55, #80d9cf);
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
