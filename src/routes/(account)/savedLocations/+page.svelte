<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";
	import Location from "./location.svelte";

    export let data: PageData;

    let savedLocations: {[x: string]: any;}[] | null = data.savedLocations;


</script>

<div class="form-wrapper">
    <form
    class="submit-form"
    method="post"
    action="?/addLocation"
    >
        <div class="submit-form">
            <label for="email">E-Mail</label>
            <input id="email" type="text" value={data.session.user.email} disabled/>
        </div>

        <div class="submit-form">
            <label for="locationName">Neuer Ort</label>
            <input id="locationName" name="locationName" type="text"/>
        </div>


        <div class="submit-form">
            <input
                type="submit"
                value="Hinzufügen"
            />
        </div>

    </form>
    <h2>Gespeicherte Orte:</h2>
    {#if savedLocations}
        <ul>
            {#each savedLocations as location}
                <Location name={ location.location_name } />
            {/each}
        </ul>
    {/if}
</div>

<style>
    /* only there to test, can be thrown away */
    .submit-form {
        margin: 4px;
        padding: 4px;
        border: 1px solid black;
        border-radius: 4px;
    }
</style>