
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
        --color=var(--text-color) />
    {#if open}
        <a class="cloudia" href="/" >cloudia</a>
    {/if}
  </div>
  
  {#if open}
    <div class="burger-menu" >
        {#if isLoggedIn}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="secondary-button account-button" on:click|preventDefault="{() => goto(`/account`)}">
                <img src="src\lib\assets\svg\menu\person.svg" alt="person" class="person-icon">
                <p>langemail@example.com</p>
            </div>
            
            <div class="burger-menu-mid">
                <div class="locations">
                    {#if savedLocations}
                        {#each savedLocations as location}
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div class="savedLocations" on:click|preventDefault="{() => goto(`/?location=${location.location_name}`)}">
                                <img src="src\lib\assets\svg\menu\star.svg" alt="star" class="star-icon">
                                <!--a href="/?location={location.location_name}" data-sveltekit-preload-data="off">{location.location_name}</a-->
                                <p>{location.location_name}</p>
                            </div>
                        {/each}
                        
                    {/if}

                </div>

                
            </div>
            <div class="burger-menu-bottom">
                <form on:submit|preventDefault={onLocationSubmit} class="search-wrapper">
                    <input type="search" name="location" bind:value={location} placeholder="Ort eintragen" class="search-input">
                    <button type="submit" class="search-button">
                        <img src="src\lib\assets\svg\menu\search.svg" alt="search" class="search-icon">
                    </button>
                </form>

                <form action="/logout" method="POST">
                    <button type="submit" class="secondary-button">
                        <img src="src\lib\assets\svg\menu\logout.svg" alt="person" class="person-icon">
                        <p>Logout</p>
                    </button>
                </form>
            </div>
        {:else}
            <div class="burger-menu-mid">
                <form on:submit|preventDefault={onLocationSubmit} class="search-wrapper">
                    <input type="search" name="location" bind:value={location} placeholder="Ort eintragen" class="search-input">
                    <button type="submit" class="search-button">
                        <img src="src\lib\assets\svg\menu\search.svg" alt="search" class="search-icon">
                    </button>
                </form>
                
                <p class="search-error-message">{errorMessage}</p>
                <input type="button" value="login" on:click={() => goto('/login')} class="secondary-button">
                <input type="button" value="register" on:click={() => goto('/register')} class="secondary-button">
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
        flex: 8;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-right: 5px;

        &::-webkit-scrollbar {
            width: 5px;
        }
      
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            //-webkit-box-shadow: inset 0 0 6px rgb(214, 214, 214); 
            background: #fff6e563;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: rgb(158, 158, 158);
        }
    }

    .burger-menu-bottom {
        flex: 1;
    }

    .search-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 1em;

        background: #FFFFFF;
        border: 0;
        border-radius: 50px;

        display: flex;
        flex-direction: row;
    }

    .search-error-message {
        color: red;
        font-size: small;
        letter-spacing: normal;
    }

    .search-input {
        flex-grow: 1;
        background-color: transparent;
        border: 0;
        border-radius: 50px 0px 0px 50px;
        
        padding-left: 1.5em;
        font-size: large;
    }

    .search-button {
        background-color: var(--secondary-accent-color);
        filter: brightness(1.4);
        border: 0;
        border-radius: 50px;
        padding: 0.5em;
        width: fit-content;

        border-radius: 0 50px 50px 0;

        &:hover {
            cursor: pointer;
            filter: brightness(1);
        }

        img {
            margin-left: .5em;
            margin-right: .5em;
        }
    }

    .cloudia {
        color: var(--text-color);
        font-size:x-large;
        font-family: 'Chewy', cursive;
        text-decoration: none;
    }
    
    .locations {
        display: flex;
        flex-direction: column;
        margin-left: 1em;

        .savedLocations {
            margin-bottom: 15px;
            padding-left: 1em;
            padding-right: 1em;
            background: var(--primary-accent-color);
            box-shadow: -3px 4px 0px rgba(0, 0, 0, 0.25);
            border-radius: 4px;

            display: flex;
            flex-direction: row;
            justify-content: space-between;

            p {
                color: black;
                font-size: xx-large;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin: 0.2em;
            }

            .star-icon {
                height: 1.5em;
                align-self: center;
            }

            &:hover {
                cursor: pointer;
                filter: brightness(1.2);
            }
        }
    }

    .burger-menu-background {
        position: absolute;
        width: 350px;
	    top: 0;
	    left: 0;
	    background: linear-gradient(0deg, rgba(128, 217, 207, 0.1), rgba(128, 217, 207, 0.1)), #000000;
        box-shadow: 5px 0px 4px rgba(0, 0, 0, 0.25);
	    padding: 1em;
	    height: 100vh;
	    border-left: 0.063em solid rgba(0, 0, 0, .1);
        z-index: -1;
    }
    
    .secondary-button {
        height: fit-content;
        min-height: 50px;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        background-color: var(--secondary-accent-color);
        border-radius: 5px;
        padding: .3em;
        padding-right: 0.5em;
        color: var(--text-color);
        display: flex;
        flex-direction: row;
        border: 0;
        align-items: center;
        
        img {
            height: 34px;
            margin: 5px;
        }

        p {
            margin: 0.5em;
            font-size: x-large;
            letter-spacing: normal;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        &:hover {
            cursor: pointer;
            filter: brightness(1.4);
        }
    }
  </style>