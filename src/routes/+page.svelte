<script lang="ts">
	import { enhance, type SubmitFunction } from "$app/forms";
	import { supabaseClient } from "$lib/js/supabase";
	import type { PageData } from "./$types";
    import { Hamburger } from 'svelte-hamburgers';
    import Menu from './Menu.svelte';

    export let data:PageData;
    let open:boolean;


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
    <!--
    <div class="icon">
        <Hamburger
        bind:open
        --color="black" />
    
        <Menu bind:open />
    </div>
-->
	<h1>SvelteKit & Supabase Auth</h1>
    {#if data.session }
        <p>Welcome {data.session.user.email}</p>
        <form action="/logout" method="POST">
            <button type="submit" class="btn btn-primary">LogOut</button>
        </form>
    {:else}
	<p>Let's learn how to register and login users!</p>
	<div class="auth-buttons">
		<a href="/login" class="btn btn-primary">Login</a>
		<a href="/register" class="btn btn-secondary">Register</a>
	</div>
    {/if}
</main>


<style>
    .icon {
        position: absolute;
        left: 1.25em;
    }
</style>