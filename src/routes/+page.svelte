<script lang="ts">
    import { Hamburger } from 'svelte-hamburgers';
    import Menu from './Menu.svelte';

    let open:boolean;
</script>

<div class="icon">
    <Hamburger
    bind:open
    --color="black" />

    <Menu bind:open />
</div>




<style>
    .icon {
        position: absolute;
        left: 1.25em;
    }
</style>