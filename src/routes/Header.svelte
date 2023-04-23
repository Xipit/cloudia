<script lang="ts">
    
    import Menu from './Menu.svelte';

    // hamburger menu
	let open:boolean;
</script>

<div class="header">
	<Menu bind:open />
</div>


<style>
    .header {
        position: fixed;
        z-index: 999;
    }
</style>