<script lang="ts">
	import Menu from "./Menu.svelte";

    // hamburger menu
	let open:boolean;

    export let isLoggedIn:boolean;
    export let savedLocations: {[x: string]: any;}[] | null;
    export let email:string|undefined;
</script>

<div class="header">
	<Menu bind:open bind:isLoggedIn bind:savedLocations bind:email/>
</div>


<style>
    .header {
        position: fixed;
        z-index: 999;
    }
</style>