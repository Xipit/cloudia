<script lang="ts">
    import type { ActionData, PageData } from './$types';

    export let data: PageData;
    export let form: ActionData;

    let { session, settings } = data;

    let settingsForm: any;

    let loading = false;
    let temperatureUnit: string | null = settings?.temperature_unit;
    let speedUnit: string | null = settings?.speed_unit;

</script>

<div>
    <form
        method="post"
        action="?/update"
        bind:this={settingsForm}
    >
        <div>
            <label for="email">E-Mail</label>
            <input id="email" type="text" value={session.user.email} disabled/>
        </div>

        <div>
            <label for="temperatureUnit">Temperatureinheit</label>
            <input id="temperatureUnit" name="temperatureUnit" type="text" value={form?.temperatureUnit ?? temperatureUnit} />
        </div>

        <div>
            <label for="speedUnit">Geschwindigkeitseinheit</label>
            <input id="speedUnit" name="speedUnit" type="text" value={form?.speedUnit ?? speedUnit} />
        </div>

        <div>
            <input
                type="submit"
                value={loading ? 'Laden ...': 'Aktualisieren'}
                disabled={loading}
            />
        </div>

    </form>
    
    <form action="/logout" method="POST">
        <button type="submit" class="button">LogOut</button>
    </form>
</div>