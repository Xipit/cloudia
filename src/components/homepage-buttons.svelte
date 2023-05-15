<script lang="ts">
	import { weather } from "$lib/js/weatherStore";

    import nextDay from '$lib/assets/svg/homepage/nextDay.svg';
	import previousDay from '$lib/assets/svg/homepage/previousDay.svg';
	import resetLocation from '$lib/assets/svg/homepage/resetLocation.svg';
    import star from '$lib/assets/svg/menu/star.svg';

    export let disable: any;
    export let daysInToTheFuture: number;
    export let savedLocations:{ [x: string]: any; }[] | null;

    $: locationName = weather.getLocation();
    $: isCurrentLocationSaved = savedLocations?.some(savedLocation => savedLocation.location_name === locationName);
</script>


<div class="macro-buttons">

    <form
        method="post"
        action= {isCurrentLocationSaved 
            ? "savedLocations?/deleteLocation" 
            : "savedLocations?/addLocation"
        }
        class={disable
            ? "tile disabled"
            : "tile"
        }
    >

        <input name="locationName" type="hidden" value={locationName}>

        <input 
            type="image"
            src={star}
            alt={isCurrentLocationSaved 
                ? "Von gespeicherten Orten entfernen"
                : "Zu gepseicherten Orten hinzufügen"
            }
        />
 
    </form>
    <button
        class="tile"
        disabled={disable}
        on:click={() => {}}
    >
        <img src={star} id="saveLocation" alt="Ort speichern">
    </button>

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
    @import '../components/weather-tiles/weather-tiles.scss';


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
    }

    @media only screen and (min-width: 450px) {
        .macro-buttons {
            flex-basis: 200px;
        }
    }
</style>