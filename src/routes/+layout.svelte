<head>
	 <!-- The following lines are just temporary  -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true">
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

<!--background cloud layers-->
<img src="src\img\layer1.svg" class="layer" id="layer1" alt="moving clouds">
<img src="src\img\layer2.svg" class="layer" id="layer2" alt="moving clouds">
<img src="src\img\layer3.svg" class="layer" id="layer3" alt="moving clouds">

<div class="app">
	<Header bind:isLoggedIn={isLoggedIn}/>

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
	/*cloud layers*/
	.layer {
    	position: absolute;
    	filter: drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		min-width: 2000px;
	}
	#layer1 {
		animation: cloud-movement1 5s linear infinite alternate;
		/*change color svg???, https://stackoverflow.com/questions/22252472/how-can-i-change-the-color-of-an-svg-element/53336754#53336754
		filter: invert(99%) sepia(3%) saturate(377%) hue-rotate(208deg) brightness(116%) contrast(100%);*/
		z-index: -20;
	}
	#layer2 {
		z-index: -50;
		animation: cloud-movement2 5s linear infinite alternate;
	}
	#layer3 {
		z-index: -100;
		animation: cloud-movement3 5s linear infinite alternate;
	}
	/*animation cloud layers*/
	@keyframes cloud-movement1 {
		from {top: -95px; right:-40px;}
		to {top: -95px; right: 0px;}
	}
	@keyframes cloud-movement2 {
		from {top: -35px; right:0px;}
		to {top: -35px; right: -30px;}
	}
	@keyframes cloud-movement3 {
		from {top: 0px; right:-15px;}
		to {top: 0px; right: 10px;}
	}
</style>
