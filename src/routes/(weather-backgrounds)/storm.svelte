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

<style>
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
		top: -170px;
	}

	#layer1 {
		z-index: -20;
		filter: invert(26%) sepia(5%) saturate(3436%) hue-rotate(161deg) brightness(90%) contrast(83%) drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement1 5s linear infinite alternate;		
	}
	#layer2 {
		z-index: -50;
		filter: invert(18%) sepia(34%) saturate(321%) hue-rotate(163deg) brightness(98%) contrast(89%) drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement2 5s linear infinite alternate;
	}
	#layer3 {
		z-index: -100;
		filter: invert(14%) sepia(3%) saturate(4825%) hue-rotate(163deg) brightness(95%) contrast(81%) drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement3 5s linear infinite alternate;
	}
	/*animation cloud layers*/
	@keyframes cloud-movement1 {
		from {right:-65px;}
		to {right: -25px;}
	}
	@keyframes cloud-movement2 {
		from {right:-25px;}
		to { right: -55px;}
	}
	@keyframes cloud-movement3 {
		from {right:-35px;}
		to {right: -10px;}
	}

</style>