<script lang="ts">
    import { weather } from "$lib/js/weatherStore";

    export let isLoggedIn:boolean;
    export let open:boolean;

    let newLocation: string = "";

    let onLocationSubmit = async () => {
        weather.set(newLocation);
        open = false;
    }
</script>

<main>
	<h1 class="headline">Wetter in...</h1>
	<form on:submit|preventDefault={onLocationSubmit}>

		<input type="search" name="location" bind:value={newLocation} placeholder="Ort eintragen" >

		<input type="submit" value="Wetterdaten bekommen" />

	</form>

    {#if isLoggedIn === false}
		<a href="/login">Login</a>
        <a href="/register">Registrieren</a>
    {/if}
</main>

<style lang="scss">
	h1 {
    	color:var(--text-color);
    	font-family: 'Chewy', cursive;
    	text-shadow: 2px 4px 4px #716666;
    	font-size: min(4.5em, 10vw);
    	padding-top:var(--spacing-xl);
    }

    h2 {
    	color:var(--text-color);
    	font-family: 'Chewy', cursive;
    	text-shadow: 2px 4px 4px #716666;
    	font-size: min(3em, 6vw);
    	padding-top:var(--spacing-sm);
    }

    form{
    	width: 100%;
    	margin-bottom: var(--spacing-md);
    }

    main{
    	width: 100%;
    	max-width: 600px;


    	display: flex;
    	flex-direction: column;
    	align-items: start;
    	flex-wrap: wrap;
    	align-self: center;
    }

    input, select{
    	width:100%;
    	border: 2px solid var(--primary-accent-color);
    	border-radius: .4em;
    	box-sizing: border-box;
    	padding: var(--spacing-sm) var(--spacing-md);
    }

    input[type=text]{
    	margin: var(--spacing-sm) 0;
    }

    input[type=button], input[type=submit] {
    	width: 100%;
    	background-color: var(--primary-accent-color);
    	padding: var(--spacing-md) var(--spacing-lg);
    	text-decoration: none;
    	margin: var(--spacing-sm) 0;
    	cursor: pointer;

    	border: 2px solid white;

    	color: var(--text-color);
    	font-size: min(1.5em, 5vw);
    	font-weight: bold;
    }

    a{
    	font-size: 1.2em;
    	margin-top: var(--spacing-sm);
        width: 100%;
        text-align: center;
        color: var(--text-color);
    }
</style>