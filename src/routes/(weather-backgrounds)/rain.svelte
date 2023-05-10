<script lang="ts">
	import RainDrop from "./raindrop.svelte";
</script>

<div class="rain-container" > 
    
    {#each { length: 100 } as _, i}
        <RainDrop />
    {/each}
</div>



<style lang="scss">
    @import './cloud-animations.scss';

	.background-images {
		position: fixed;
		top:0px;
		right:0px;
		z-index: -20;
	}


</style>