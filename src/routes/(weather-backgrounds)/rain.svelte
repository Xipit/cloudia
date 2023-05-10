<script lang="ts">
	import { browser } from "$app/environment";
	import RainDrop from "./raindrop.svelte";

    import layer1 from '$lib/assets/svg/background/layer1.svg';
	import layer2 from '$lib/assets/svg/background/layer2.svg';
	import layer3 from '$lib/assets/svg/background/layer3.svg';

    const amount = browser ? window.innerWidth / 5 : 0;
</script>

<div class="rain-container" > 
    <div class="background-images">
        <img src={layer1} class="clouds" id="layer1" alt="moving clouds">
        <img src={layer2} class="clouds" id="layer2" alt="moving clouds">
        <img src={layer3} class="clouds" id="layer3" alt="moving clouds">
    </div>
    {#each { length: amount } as _, i}
        <RainDrop />
    {/each}
</div>



<style lang="scss">
    @import './cloud-animations.scss';

	/*cloud layers*/
	.background-images {
		position: fixed;
		top:0px;
		right:0px;
		z-index: -20;
	}

	.clouds {
    	position: fixed;
		max-width: unset;
		top: -190px;
	}

	/*
	Filter generated with: https://codepen.io/sosuke/pen/Pjoqqp
	Original color of SVG must be black, in order to get the right color with the filter
	*/

	#layer1 {
		z-index: -20;
        filter: invert(78%) sepia(33%) saturate(210%) hue-rotate(178deg) brightness(93%) contrast(83%)
		drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement1 5s linear infinite alternate;		
	}
	#layer2 {
		z-index: -50;
		filter: invert(56%) sepia(13%) saturate(1618%) hue-rotate(177deg) brightness(89%) contrast(85%) 
		drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement2 5s linear infinite alternate;
	}
	#layer3 {
		z-index: -100;
		filter: invert(44%) sepia(12%) saturate(2062%) hue-rotate(179deg) brightness(90%) contrast(86%)  
		drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement3 5s linear infinite alternate;
	}


</style>