<script lang="ts">
	import { weather } from "$lib/js/weatherStore";

    import nextDay          from '$lib/assets/svg/homepage/nextDay.svg';
	import previousDay      from '$lib/assets/svg/homepage/previousDay.svg';
	import resetLocation    from '$lib/assets/svg/homepage/resetLocation.svg';
    import loading          from '$lib/assets/svg/homepage/loading.svg';
    import bookmarkFull     from '$lib/assets/svg/menu/bookmark-full.svg';
    import bookmarkEmpty    from '$lib/assets/svg/menu/bookmark-empty.svg';
	import { enhance } from "$app/forms";

    export let disable: any;
    export let daysInToTheFuture: number;
    export let savedLocations:{ [x: string]: any; }[] | null;
    export let session: any;

    $: locationName = weather.getLocation();
    $: isCurrentLocationSaved = savedLocations?.some(savedLocation => savedLocation.location_name === locationName);

    let isLocationSavingLoading = false;
</script>


<div class="macro-buttons">

    {#if session}
        <form
            method="post"
            action= {isCurrentLocationSaved 
                ? "savedLocations?/deleteLocation" 
                : "savedLocations?/addLocation"
            }
            class={disable || isLocationSavingLoading
                ? "tile disabled"
                : "tile"
            }
            use:enhance={() => {
                isLocationSavingLoading = true;
                return async ({ update }) => {
                    await update();
                    isLocationSavingLoading = false;
                };
            }}
        >

            <input name="locationName" type="hidden" value={locationName}>

            <input 
                type="image"
                src={isLocationSavingLoading
                    ? loading
                    : isCurrentLocationSaved
                        ? bookmarkFull
                        : bookmarkEmpty
                }
                alt={isCurrentLocationSaved 
                    ? "Von gespeicherten Orten entfernen"
                    : "Zu gepseicherten Orten hinzufügen"
                }
            />
    
        </form>
 
    {:else}
        <div class="tile" style="visibility: hidden;"></div>
    {/if}

    <button
        class="tile"
        disabled={disable}
        on:click={() => {weather.resetData();}}
    >
        <img src={resetLocation} id="resetLocation" alt="Ort zurücksetzen">
    </button>

    <button 
        class="tile"
        disabled={disable || daysInToTheFuture == 0}
        on:click={() => {weather.setDaysInToTheFuture(daysInToTheFuture - 1);}}
    >
    <img src={previousDay} id="previousDay" alt="Tag vorher">
    </button>
    <button 
        class="tile"
        disabled={disable || daysInToTheFuture == 2}
        on:click={() => {weather.setDaysInToTheFuture(daysInToTheFuture + 1);}}
    >
        <img src={nextDay} id="nextDay" alt="Tag danach">
    </button>
</div>

<style lang="scss">
    @import '../components/weather-tiles/weatherTiles.scss';


    .macro-buttons {
        justify-content: flex-end;
        display: flex;
        flex-direction: row;
        align-content: flex-end;
        flex-wrap: wrap;
        flex-basis: 100px;
        align-items: stretch;
        gap: var(--spacing-sm);

        button, form {
            width: 40px;
            height: 40px;

            align-items: center;
            justify-content: center;
            display: inline-flex;
            padding: var(--spacing-sm);
            border: 0;
            box-sizing: border-box;

            &:disabled, &.disabled {
                opacity: 0.4;
                pointer-events: none;
            }

            &:is(:hover, :active, :focus){
                cursor: pointer;
                border: 1px solid var(--text-color);
            }
        }

        form{
            padding: 0;
            width: 40px;
            height: 40px;
        }

        input[type="image"]{
            border: 0;
            aspect-ratio: 1;
            padding: 6px;
        }
    }

    @media only screen and (min-width: 450px) {
        .macro-buttons {
            flex-basis: 200px;
        }
    }
</style>