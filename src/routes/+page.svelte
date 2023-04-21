<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { supabaseClient } from "$lib/js/supabase";
	import type { PageData } from "./$types";
    import { Hamburger } from 'svelte-hamburgers';
    import Menu from './Menu.svelte';

    export let data:PageData;


    // -> progressive enhancement with js: https://www.youtube.com/watch?v=lSm0GNnh-0I
    // didnt work ;/
    /*
    const submitLogout: SubmitFunction = async ({ cancel }) => {
        const { error } = await supabaseClient.auth.signOut();
        if(error){
            console.log(error);
        }
        console.log('submitLogout');

        cancel();
    }
    */
</script>

<main>
    
    {#if data.session }
        <p>Welcome {data.session.user.email}</p>
        <form action="/logout" method="POST">
            <button type="submit" class="button">LogOut</button>
        </form>
    {:else}
        <p>Sie sind noch nicht eingeloggt. Navigieren sie zum Burgermenü.</p>
    {/if}
</main>
