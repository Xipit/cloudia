<script lang="ts">
    import { page } from '$app/stores';
    import { enhance } from "$app/forms";
	import type { ActionData, PageData } from './$types';

    export let data:PageData;
    export let form:ActionData;

    const { url } = $page;
    const { searchParams } = url;

    // the token is in the link, that gets send to via email to authenticate password changes
    const token = searchParams.get('token');
</script>
  
<main>
    <h1>Passwort ändern </h1>
    <form method="POST" action="?/newPassword" class="flex flex-col gap-2" use:enhance>
        <label for="email">E-Mail</label>
        <input id="email" type="text" value={data.session?.user.email} disabled/>

        <label for="password">New password:</label>
        <input type="password" name="password" id="password" required />
        {#if form?.errors?.password}
            <span class="text-red-500">{form?.errors?.password[0]}</span>
        {/if}

        <label for="confirm_password">Confirm password:</label>
        <input type="password" name="confirm_password" id="confirm_password" required />
        {#if form?.errors?.confirm_password}
            <span class="text-red-500">{form?.errors?.confirm_password[0]}</span>
        {/if}

        <input type="hidden" name="token" value={token} />
        {#if form?.errors?.token}
            <span class="text-red-500">{form?.errors?.token[0]}</span>
        {/if}
        
        <input type="submit" value="Absenden" />
    </form>


    <!-- this message is ephemeral; it exists because the page was rendered in
           response to a form submission. it will vanish if the user reloads -->
    {#if form?.success === true }
        <div class="bg-green-300 p-2">
            <p>Your password was changed.</p>
        </div>
    {/if}

    {#if form?.success === false }
        <div class="bg-red-300 p-2">
            <p>Could not change password.</p>
        </div>
    {/if}
</main>


<style lang="scss">
    @import '../accountPages.scss';
</style>