<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';


	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import Menu from './Menu.svelte';
	import { Hamburger } from 'svelte-hamburgers';
	// AUTHENTICATION 
	export let data: LayoutData;
	$: ({ supabase, session } = data);
	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {
			console.log('Auth state change detected');
			//if (_session?.expires_at !== session?.expires_at){
				invalidate('supabase:auth');
			//}
		});
		return () => subscription.unsubscribe();
	})

	let isLoggedIn:boolean = data.session !== null;

</script>

<div class="app">
	<Header bind:isLoggedIn={isLoggedIn}/>

	<main>
		<slot />
	</main>
</div>

<style>
	:global(html) {
        background-image: linear-gradient(to top, #ffdd55, #80d9cf);
        font-family: Arial, Helvetica, sans-serif;
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

    .icon {
        position: absolute;
        left: 1.25em;
    }

</style>
