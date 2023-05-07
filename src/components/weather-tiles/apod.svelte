 <script lang="ts">
	import { getAPOD } from "$lib/js/api/apodApi";

	// APOD - Astronomy Picture of the Day
	let apodData = getAPOD();
 </script>
 


{#await apodData}
    <p>hole Astronomy Picture of the Day</p>
{:then data} 

    <div class="tile apod">
        <p class="description">{data.title}</p> 
        <!-- The following code line is required because the alt-tag of the image contains the word "picture" which throws a warning. -->
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img src={data.url} alt="APOD - Astronomy Picture of the Day">
    </div>
    
{:catch error}
    <p style="color: red">{error.message}</p>
{/await} 

<style lang="scss">
    @import './weather-tiles.scss';

    .apod {
        img {
            width: 100%;
        }
    }
</style>