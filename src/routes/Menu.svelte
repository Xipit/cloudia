<script lang="ts">
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import { Hamburger } from 'svelte-hamburgers';
  
    export let open:boolean;
  </script>
  
  <Hamburger
  bind:open
  --color="black" />

  {#if open}
    <div class="burger-menu">
        {#each ['Profil', 'Einstellungen', 'Ortsauswahl', 'Favoriten'] as link, i}
            <a href="/" transition:fly={{ x: -70, duration: 1000, delay: 50 * i }}>
                {link}
            </a>
        {/each}
        <div class="burger-menu-background" transition:fly={{ x:'-100%', duration: 750, easing: quadOut }} /> 
    </div>
    {/if}
  
  <style lang="scss">
    
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

        a {
            width: 100%;
            margin: 1rem auto;
            padding: 0.625em;
            word-break: break-word;

            &:hover, &:active, &:focus {
                text-shadow: 3px 3px 4px rgba( 31, 38, 135, 0.37 );
                backdrop-filter: blur( 0.65em );
                -webkit-backdrop-filter: blur( 0.65em );
                border-radius: 0.2em;
                padding: 0.625em;
            }
        }
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
  </style>