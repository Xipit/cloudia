
<script lang="ts">
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import { Hamburger } from 'svelte-hamburgers';
    import { page } from '$app/stores';
    import { navigating } from '$app/stores'
    import { goto, } from "$app/navigation";
  
    export let open:boolean;
    export let isLoggedIn:boolean;
    export let savedLocations: {[x: string]: any;}[] | null;
    let location:string;

    $: if ($navigating){
        open = false;
    }

    $: errorMessage = "";


	let onLocationSubmit = async () => {
        //todo: Errorhandling when its a wrong location
        errorMessage = "";

		await goto(`/?location=${location}`);
	}

</script>
  <div class="burger-menu-top icon">
    <Hamburger
        bind:open
        --color=var(--text-color) />
    {#if open}
        <p class="cloudia">Cloudia</p>
    {/if}
  </div>
  
  {#if open}
    <div class="burger-menu" >
        {#if isLoggedIn}
            
            <div class="burger-menu-mid">
                <div class="account">

                </div>
                <div class="location">
                    {#if savedLocations}
                        <ul class="savedLocations">
                            {#each savedLocations as location}
                                <li><a href="/?location={location.location_name}" >{location.location_name}</a></li>
                            {/each}
                        </ul>
                    {/if}

                </div>

                <form on:submit|preventDefault={onLocationSubmit} class="search-wrapper">
                    <input type="search" name="location" bind:value={location} placeholder="Ort eintragen" >
                    <button type="submit">Wetterdaten bekommen</button>
                </form>
            </div>
            <div class="burger-menu-bottom">
                <form action="/logout" method="POST">
                    <button type="submit" class="button">LogOut</button>
                </form>
            </div>
        {:else}
            <div class="burger-menu-mid">
                <form on:submit|preventDefault={onLocationSubmit} class="search-wrapper">
                    <input type="search" name="location" bind:value={location} placeholder="Ort eintragen" >
                    <button type="submit">Wetterdaten bekommen</button>
                </form>
                
                <p class="search-error-message">{errorMessage}</p>
                <input type="button" value="login" on:click={() => goto('/login')}>
                <input type="button" value="register" on:click={() => goto('/register')}>
            </div>

            
        {/if}
        
        <div class="burger-menu-background" transition:fly={{ x:'-100%', duration: 750, easing: quadOut }} />
    </div>
    {/if}
  
  <style lang="scss">
    .icon {
        padding-top: 10px;
        padding-left: 10px;
    }

    .burger-menu {
        width: 350px;
        text-align: left;
        font-size: 1.5em;
        letter-spacing: 0.15em;
        padding: 1em;
        padding-top: 0;
        color: black;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 90vh;
    }

    .burger-menu-top {
        flex: 1;
        background-color: aqua;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .burger-menu-mid {
        flex: 10;
        background-color: chartreuse;
        overflow-y: scroll;
    }

    .burger-menu-bottom {
        flex: 1;
        background-color: coral;
    }

    .search-wrapper {
        background-color: aqua;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin-top: 1em;
    }

    .search-error-message {
        color: red;
        font-size: small;
        letter-spacing: normal;
    }

    .search-input {

    }

    .search-button {
    }

    .cloudia {
        font-size: large;
        font-family: 'Chewy', cursive;
    }

    a {
        width: 100%;
        margin: 1rem auto;
        padding: 0.1em;
        word-break: break-word;

        &:hover, &:active, &:focus {
            text-shadow: 2px 4px 4px #716666; // horizontal vertiacal blur color
        //    backdrop-filter: blur( 0.65em );
        //    -webkit-backdrop-filter: blur( 0.65em );
        //    border-radius: 0.2em;
        //    padding: 0.1em;
        } 
    }

    .logout{
        position: absolute;
        bottom: 1em;
        left: 1rem;
    }
    
    .location {
    }

    .savedLocations{
        margin-left: 1em;
        font-size:large;
    }

    .burger-menu-background {
    position: absolute;
    width: 350px;
	top: 0;
	left: 0;
	background: #ddd;
	padding: 1em;
	height: 100vh;
	border-left: 0.063em solid rgba(0, 0, 0, .1);
	box-shadow: -0.125em 0px 0.375em -0.063em rgba(0, 0, 0, 0.1);
    z-index: -1;
    }
    

    
  </style>