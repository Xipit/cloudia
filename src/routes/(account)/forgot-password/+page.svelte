<script lang="ts">
	import type { ActionData } from "./$types";

    export let form:ActionData;
</script>

<main>
    <h1>Passwort vergessen</h1>
    <form action="?/sendRecovery" method="POST" class="auth-form">

        <label for="email"> Email </label>
        <input type="text" name="email" required/>
        
        <input type="submit" value="Passwort zurücksetzen" required/>

    </form>
</main>


{#if form?.error}
    <!-- this message is ephemeral; it exists because the page was rendered in
           response to a form submission. it will vanish if the user reloads -->
    <p>Fehler: {form.error}</p>
{/if}

{#if form?.success}
    <!-- this message is ephemeral; it exists because the page was rendered in
           response to a form submission. it will vanish if the user reloads -->
    <p>Es wurde eine E-Mail mit Passwort-zurücksetzen Link an {form?.email} geschickt.</p>
{/if}

<style lang="scss">
    @import '../accountPages.scss';
</style>
