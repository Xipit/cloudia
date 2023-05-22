<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
    import type { ActionData, PageData } from './$types';

    export let data: PageData;
    export let form: ActionData;

    let { session, settings } = data;

    let settingsForm: any;

    let loading = false;
    let temperatureUnit: string | null = settings?.temperature_unit;
    let speedUnit: string | null = settings?.speed_unit;

    // if js enabled, then just run layout stuff and dont refresh browser
    function handleUpdateSettings() {
		loading = true;
		return async () => {
			loading = false;
            invalidateAll();
		};
	}

</script>

<main >
    <h1>
        Account
    </h1>
    <form
        class="submit-form"
        method="post"
        action="?/update"
        bind:this={settingsForm}
        use:enhance={handleUpdateSettings}
    >

        <label for="email">E-Mail</label>
        <input id="email" type="text" value={session.user.email} disabled/>

        <label for="temperatureUnit">Temperatureinheit</label>
        <select name="temperatureUnit" id="temperatureUnit">
            <option value="celsius"     selected={temperatureUnit == "celsius"}     >Celsius</option>
            <option value="kelvin"      selected={temperatureUnit == "kelvin"}      >Kelvin</option>
            <option value="fahrenheit"  selected={temperatureUnit == "fahrenheit"}  >Fahrenheit</option>
        </select>

        <label for="speedUnit">Geschwindigkeitseinheit</label> 
        <select name="speedUnit" id="speedUnit">
            <option value="kmh"         selected={speedUnit == "kmh"}       >km/h</option>
            <option value="ms"          selected={speedUnit == "ms"}        >m/s</option>
            <option value="beaufort"    selected={speedUnit == "beaufort"}  >Beaufort</option>
            <option value="knot"        selected={speedUnit == "knot"}      >Knoten</option>
        </select>

        <input
            type="submit"
            value={loading ? 'Laden ...': 'Aktualisieren'}
            disabled={loading}
        />
    </form>

    <form action="/logout" method="POST">
        <input type="submit" value="LogOut" />
    </form>

    <a href="/change-password">Passwort ändern</a>

    
    <h2>Account löschen</h2>
    <form 
        action="?/deleteUser" 
        method="POST"
        use:enhance
    >
        <label for="email">Bestätige E-Mail</label>
        <input id="email" name="email" type="text" required/>

        <input type="submit" value="Account löschen" />
    </form>

</main>

<style>
	@import '../accountpage-layout.scss';
</style>