<script lang="ts">
    import { fly, scale } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
  
    export let open:boolean;
  </script>
  
  {#if open}
    <div class="menu">
        {#each ['Profil', 'Einstellungen', 'Ortsauswahl', 'Favoriten'] as link, i}
            <p transition:fly={{ x: -70, duration: 1000, delay: 50 * i }}>
                {link}
            </p>
        {/each}
    </div>
  
    <div class="bar" transition:fly={{ x:'-100%', duration: 750, easing: quadOut }} /> 
  {/if}
  
  <style>
    :global(html) {
        background-image: linear-gradient(to top, #ffdd55, #80d9cf);
        font-family: Arial, Helvetica, sans-serif;
    }
    .menu {
        text-align: left;
        font-size: 1.5em;
        letter-spacing: 0.15em;
        padding: 1em;
        padding-top: 0;
        color: black;
    }
    p {
        cursor: pointer;
        width: max-content;
        margin: 1rem auto;
        padding: 0.625em;
    }
    p:hover {
        text-shadow: 3px 3px 4px rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 0.65em );
        -webkit-backdrop-filter: blur( 0.65em );
        border-radius: 0.2em;
        padding: 0.625em;
    }
    .bar {
        position: fixed;
		top: 0;
		left: 0;
		background: #ddd;
		padding: 1em;
		height: 100vh;
		width: 18em;
		border-left: 0.063em solid rgba(0, 0, 0, .1);
		box-shadow: -0.125em 0px 0.375em -0.063em rgba(0, 0, 0, 0.1);
        z-index: -1;
    }
  </style>