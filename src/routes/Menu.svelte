
<script lang="ts">
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import { Hamburger } from 'svelte-hamburgers';
  
    export let open:boolean;
    export let isLoggedIn:boolean;
    export let savedLocations: {[x: string]: any;}[] | null;

    const menuItems = [
        ...(isLoggedIn 
            ? [
                { name: 'Account', href: '/account' },
                { name: 'Orte', href: '/savedLocations' }
            ] 
            : [ 
                { name: 'Login', href: '/login' },
                { name: 'Registrieren', href: '/register' },
            ]
        ),
        // { name: 'Einstellungen' }
    ];
    const menuItemsBottom = [
        ...(isLoggedIn
            ? [
                { name: 'Logout', href: '/' },
            ]
            : []
        ),
    ];
</script>
  <div class="icon">
    <Hamburger
        bind:open
        --color="black" />
  </div>
  
  {#if open}
    <div class="burger-menu">
        <a href="/" transition:fly={{ x: -70, duration: 1000, delay: 50}} class="cloudia"> Cloudia </a>
        {#each menuItems as link, i}
            <a href={link.href} transition:fly={{ x: -70, duration: 1000, delay: 50 * i }}>
                {link.name}
            </a>
        {/each}

        {#if savedLocations}
            <ul>
                {#each savedLocations as location}
                    <p>{location.location_name}</p>
                {/each}
            </ul>
        {/if}

        <a href='/' transition:fly={{ x: -70, duration: 1000, delay: 50 }} class="logout">Logout</a>
        
        <div class="burger-menu-background" transition:fly={{ x:'-100%', duration: 750, easing: quadOut }} /> 
    </div>
    {/if}
  
  <style lang="scss">
    .icon {
        padding-top: 10px;
        padding-left: 10px;
    }

    .burger-menu {
        width: 300px;
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

        .cloudia {
            position: absolute;
            top: 0.9em;
            left: 7.6em;
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

        .burger-menu-background {
        position: absolute;
        width: 100%;
		top: 0;
		left: 0;
		background: #ddd;
		padding: 1em;
		height: 100vh;
		border-left: 0.063em solid rgba(0, 0, 0, .1);
		box-shadow: -0.125em 0px 0.375em -0.063em rgba(0, 0, 0, 0.1);
        z-index: -1;
        }
    }

    
  </style>