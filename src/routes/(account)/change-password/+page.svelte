<script lang="ts">
    import { page } from '$app/stores';
    import { enhance } from "$app/forms";
	import type { ActionData, PageData } from './$types';

  
    export let data:PageData;
    export let form:ActionData;

    const { url } = $page;
    const { searchParams } = url;

    const token = searchParams.get('token');
</script>
  
<div>
    <span>Account: {data.session?.user.email}</span>
    <br/>
    <span>Passwort ändern</span>
        <form method="POST" action="?/new_password" class="flex flex-col gap-2" use:enhance>
            <label for="password">New password:<input type="password" name="password" id="password" required /></label>
            {#if form?.errors?.password}
                <span class="text-red-500">{form?.errors?.password[0]}</span>
            {/if}
            <label for="confirm_password">Confirm password:<input type="password" name="confirm_password" id="confirm_password" required /></label>
            {#if form?.errors?.confirm_password}
                <span class="text-red-500">{form?.errors?.confirm_password[0]}</span>
            {/if}
            <input type="hidden" name="token" value={token} />
            {#if form?.errors?.token}
                <span class="text-red-500">{form?.errors?.token[0]}</span>
            {/if}
            <button type="submit" class="bg-blue-300 text-black font-semibold text-lg border border-solid border-black p-1 w-44 mt-4">Send</button>
        </form>

    {#if form && form.success === true }
        <div class="bg-green-300 p-2">
            <p>Your password was changed.</p>
        </div>
    {/if}

    {#if form && form.success === false }
        <div class="bg-red-300 p-2">
            <p>Could not change password.</p>
        </div>
    {/if}
</div>