<script lang="ts">  
    import layer1 from '$lib/assets/svg/background/layer1.svg';
	import layer2 from '$lib/assets/svg/background/layer2.svg';
	import layer3 from '$lib/assets/svg/background/layer3.svg';
</script>

<!--background cloud layers-->
<div class="background-images">
	<img src={layer1} class="clouds" id="layer1" alt="moving clouds">
	<img src={layer2} class="clouds" id="layer2" alt="moving clouds">
	<img src={layer3} class="clouds" id="layer3" alt="moving clouds">
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
        filter: invert(100%) sepia(0%) saturate(6441%) hue-rotate(14deg) brightness(136%) contrast(80%) 
		drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement1 5s linear infinite alternate;		
	}
	#layer2 {
		z-index: -50;
		filter: invert(93%) sepia(0%) saturate(70%) hue-rotate(159deg) brightness(95%) contrast(89%) 
		drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement2 5s linear infinite alternate;
	}
	#layer3 {
		z-index: -100;
		filter: invert(62%) sepia(0%) saturate(3162%) hue-rotate(96deg) brightness(92%) contrast(90%) 
		drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement3 5s linear infinite alternate;
	}


</style>