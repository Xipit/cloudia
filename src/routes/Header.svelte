<script lang="ts">
    
    import Menu from './Menu.svelte';

    // hamburger menu
	let open:boolean;

    export let isLoggedIn:boolean;
</script>

<div class="header">
	<Menu bind:open bind:isLoggedIn/>
</div>


<style>
    .header {
        position: fixed;
        z-index: 999;
    }
</style>