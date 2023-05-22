 <script lang="ts">
	import { getAPOD } from "$lib/js/api/apodApi";

    export let daysInToTheFuture:number;

	// APOD - Astronomy Picture of the Day
	let apodData = getAPOD();
 </script>
 

 <!--integration of the picture of the day-->
{#await apodData}
    <p>hole Astronomy Picture of the Day</p>
{:then data} 

    <div class="tile apod">
        {#if daysInToTheFuture == 0}
            <p class="title">Astronomy Picture of the Day</p>
        {:else}
            <p class="title">Astronomy Picture of the Day ({data.date})</p>
        {/if}
        <!-- The following code line is required because the alt-tag of the image contains the word "picture" which throws a warning. -->
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={data.url} alt="APOD - Astronomy Picture of the Day">
        <p class="description">{data.title}</p> 
    </div>
    
{:catch error}
    <p style="color: red">{error.message}</p>
{/await} 

<style lang="scss">
    @import './weather-tiles.scss';

    .apod {
        margin-top: var(--spacing-sm);

        .title{
            font-family: $font-accent;
            font-size: 1.6rem;
            padding: var(--spacing-sm);
            margin: 0;
        }
        .description{
            margin: 0;
            padding: var(--spacing-sm);
        }
        img {
            width: 100%;
        }
    }

    //for big screens
	@media only screen and (min-width: 850px) {
        .apod {
            img {
                width: 50%;
            }
        }
    }
</style>