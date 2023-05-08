
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
<!--transition:fly={{ x:'-100%', duration: 750, easing: quadOut }}-->
  <div class="burger-menu-top icon">
    <Hamburger
        bind:open
        --color=var(--text-color) 
        --active-color=#989898/>
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
                <div class="locations">
                    {#if savedLocations}
                        {#each savedLocations as location}
                            <div class="savedLocations">
                                <a href="/?location={location.location_name}" >{location.location_name}</a>
                                <img src="src\lib\assets\svg\menu\star.svg" alt="star" class="star-icon">
                            </div>
                        {/each}
                        
                    {/if}

                </div>

                <form on:submit|preventDefault={onLocationSubmit} class="search-wrapper">
                    <input type="search" name="location" bind:value={location} placeholder="Ort eintragen" class="search-button">
                    <button type="submit" class="">
                        <img src="src\lib\assets\svg\menu\search.svg" alt="search" class="search-icon">
                    </button>
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
                    <button type="submit">
                        <img src="src\lib\assets\svg\menu\search.svg" alt="search">
                    </button>
                </form>
                
                <p class="search-error-message">{errorMessage}</p>
                <input type="button" value="login" on:click={() => goto('/login')}>
                <input type="button" value="register" on:click={() => goto('/register')}>
            </div>

            
        {/if}
        
        <div class="burger-menu-background"  />
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
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-right: 1em;
    }

    .burger-menu-mid {
        flex: 10;
        overflow-y: scroll;
    }

    .burger-menu-bottom {
        flex: 1;
    }

    .search-wrapper {
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
        background: #FFFFFF;
        border: 2px solid #a3a3a3;
        box-shadow: inset 0px 0px 10px 2px rgba(168, 168, 168, 0.25);
        border-radius: 50px;
        padding: 1em;
        width: 100%;
    }

    .cloudia {
        color: #716666;
        font-size:x-large;
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

    
    .locations {
        display: flex;
        flex-direction: column;

        .savedLocations {
            margin-bottom: 15px;
            padding-left: 1em;
            padding-right: 1em;
            background: #D9D9D9;
            box-shadow: -3px 4px 0px rgba(0, 0, 0, 0.25);
            border-radius: 4px;

            display: flex;
            flex-direction: row;
            justify-content: space-between
        }
        
        a {
            color: black;
            text-decoration: none;
            font-weight: 400;
            font-size: 2em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .star-icon {
            height: 3em;
            color: #606060;
            align-self: center;
        }
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
	background: #ffffff;
	padding: 1em;
	height: 100vh;
	border-left: 0.063em solid rgba(0, 0, 0, .1);
	box-shadow: -0.125em 0px 0.375em -0.063em rgba(0, 0, 0, 0.1);
    z-index: -1;
    }
    
    .button {
        width: 10em;
        height: 3em;
        color: var(--secondary-accent-color);
        background-color: var(--secondary-bg-color);
        border: 0.063em solid rgba(0, 0, 0, .1);
        border-radius: 5px;
    }
    
  </style>