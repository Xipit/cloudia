<script lang="ts">
	import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import type { PageData } from "./$types";

    export let data: PageData;

    $:{
        const redirectTo = $page.url.searchParams.get('redirect');

        // check if user has been set in session store (= is logged in), then redirect
        if(browser && data.session){
            goto(redirectTo ?? '/account');
        }
    }
</script>

<section class="loading">
    Laden ...
</section>

<style>
    .loading{
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
        height: 90svh;
    }
</style>