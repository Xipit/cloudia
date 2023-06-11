<script lang="ts">
    import nasaBlackhole from "$lib/assets/pictures/nasa-first-image-blackhole.jpg";
</script>


<div class="tile apod">
    <p class="title">Astronomy Picture of the Day konnte nicht erreicht werden ...</p>
    <img src={nasaBlackhole} alt="verschwommenes Schwarzes Loch">
    <p class="description">... Deswegen seht ihr hier das erste Bild eines Schwarzen Loches (2019, Nasa)</p> 
</div>


<!--
    copied from apod.svelte
-->
<style lang="scss">
    @import './weatherTiles.scss';

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