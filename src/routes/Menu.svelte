
<script lang="ts">
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import { Hamburger } from 'svelte-hamburgers';
    import { page } from '$app/stores';
    import { navigating } from '$app/stores'
    import { goto, } from "$app/navigation";
    import person from '$lib/assets/svg/menu/person.svg';
    import search from '$lib/assets/svg/menu/search.svg';
    import star from '$lib/assets/svg/menu/star.svg';
    import logout from '$lib/assets/svg/menu/logout.svg';
    import login from '$lib/assets/svg/menu/login.svg';
    import register from '$lib/assets/svg/menu/register.svg';
    import { clickOutside } from "$lib/js/clickOutside";    

    export let open:boolean;
    export let isLoggedIn:boolean;
    export let savedLocations: {[x: string]: any;}[] | null;
    export let email: string|undefined;
    let location:string;

    $: if ($navigating){
        open = false;
    }

    $: errorMessage = "";


	let onLocationSubmit = async () => {
        //todo: Errorhandling when its a wrong location
        errorMessage = "";

		await goto(`/?location=${location}`);

        location = "";
	}

    function closeMenu(){
        open = false;
    }

</script>
    <div class="icon">
        <Hamburger
            bind:open
            --color=var(--text-color) />
    </div>

    {#if open}
        <div id="burger-menu" class="burger-menu" transition:fly={{ x:'-100%', duration: 500, easing: quadOut }} use:clickOutside={'#burger-menu'} on:click_outside={closeMenu}>
            <div class="burger-menu-top">
                <a class="cloudia" href="/" >cloudia</a>
            </div>

            {#if isLoggedIn}
                <div class="burger-menu-mid">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="secondary-button account-button" on:click|preventDefault="{() => goto(`/account`)}" >
                        <img src={person} alt="person">
                        <p>{email}</p>
                    </div>
                    <div class="locations">
                        {#if savedLocations}
                            {#each savedLocations as location}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <div class="savedLocation" on:click|preventDefault="{() => goto(`/?location=${location.location_name}`)}">
                                    <img src={star} alt="star" class="star-icon">
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
                            <img src={search} alt="search">
                        </button>
                    </form>

                    <form action="/logout" method="POST">
                        <button type="submit" class="secondary-button">
                            <img src={logout} alt="person">
                            <p>Logout</p>
                        </button>
                    </form>
                </div>
                {:else}
                <div class="burger-menu-mid">
                    <form on:submit|preventDefault={onLocationSubmit} class="search-wrapper">
                        <input type="search" name="location" bind:value={location} placeholder="Ort eintragen" class="search-input">
                        <button type="submit" class="search-button">
                            <img src={search} alt="search">
                        </button>
                    </form>

                    <p class="search-error-message">{errorMessage}</p>

                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="secondary-button" on:click|preventDefault="{() => goto(`/login`)}">
                        <img src={login} alt="login">
                        <p>Login</p>
                    </div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div class="secondary-button" on:click|preventDefault="{() => goto(`/register`)}">
                        <img src={register} alt="login">
                        <p>Register</p>
                    </div>
                </div>
            {/if}
            
            <div class="burger-menu-background" />
        </div>
    {/if}

  
<style lang="scss">
    .icon {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 10;
    }

    .burger-menu {
        width: var(--burger-menu-width);
        text-align: left;
        font-size: 1.5em;
        letter-spacing: 0.15em;
        padding: 0;
        color: black;
        overflow: hidden;
        height: 100dvh;

        display: flex;
        flex-direction: column;

        .burger-menu-top {
            padding-left: var(--burger-menu-padding);
            padding-right: var(--burger-menu-padding);
            flex: 1;
            display: flex;
            justify-content: flex-end;
        }
    
        .burger-menu-mid {
            padding-left: var(--burger-menu-padding);
            padding-right: var(--burger-menu-padding);
            flex: 8;

            display:flex;
            flex-direction: column;

            overflow: auto;
        }
    
        .burger-menu-bottom {
            flex: 1;
            padding: var(--burger-menu-padding);
        }
    }

    .account-button{
        flex:1;
        margin-top: 0;
    }

    .locations {
        flex: 50;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-right: 5px;
        padding-left: 1em;
    
        &::-webkit-scrollbar {
            width: 5px;
        }
    
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: #fff6e563;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: rgb(158, 158, 158);
        }       
    }

    .savedLocation {
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

    .cloudia {
        color: var(--text-color);
        font-size:x-large;
        font-family: 'Chewy', cursive;
        text-decoration: none;
        margin-top: var(--burger-menu-padding);
    }

    .burger-menu-background {
        position: absolute;
        width: var(--burger-menu-width);
	    top: 0;
	    left: 0;
	    background: linear-gradient(0deg, rgba(128, 217, 207, 0.1), rgba(128, 217, 207, 0.1)), #000000;
        box-shadow: 5px 0px 4px rgba(0, 0, 0, 0.25);
	    height: 100dvh;
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

    .search-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0em;

        background: #FFFFFF;
        border: 0;
        border-radius: 50px;
    }
        
    .search-error-message {
        color: red;
        font-size: small;
        letter-spacing: normal;
    }
        
    .search-input {
        flex-grow: 2;
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
        border-radius: 0 50px 50px 0;
        padding: 0.5em;
        width: fit-content;
            
        &:hover {
            cursor: pointer;
            filter: brightness(1);
        }
            
        img {
            margin-left: .5em;
            margin-right: .5em;
        }
    }
</style>