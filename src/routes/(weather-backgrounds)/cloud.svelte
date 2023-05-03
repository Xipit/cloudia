<script lang="ts">  
    import layer1 from '$lib/assets/svg/background/layer1.svg';
	import layer2 from '$lib/assets/svg/background/layer2.svg';
	import layer3 from '$lib/assets/svg/background/layer3.svg';
</script>

<!--background cloud layers-->
<img src={layer1} class="clouds" id="layer1" alt="moving clouds">
<img src={layer2} class="clouds" id="layer2" alt="moving clouds">
<img src={layer3} class="clouds" id="layer3" alt="moving clouds">
<!--keeps the page size from changing when cloud layers move-->
<div style="width:3000px; position:absolute;"></div>

<style>
/*cloud layers*/
	.clouds {
    	position: absolute;
    	min-width: 2000px;
	}
	#layer1 {
		z-index: -20;
        filter: invert(100%) sepia(0%) saturate(6441%) hue-rotate(14deg) brightness(136%) contrast(80%) drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
        animation: cloud-movement1 5s linear infinite alternate;
	}
	#layer2 {
		z-index: -50;
        filter: invert(93%) sepia(0%) saturate(70%) hue-rotate(159deg) brightness(95%) contrast(89%) drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement2 5s linear infinite alternate;
	}
	#layer3 {
		z-index: -100;
        filter: invert(62%) sepia(0%) saturate(3162%) hue-rotate(96deg) brightness(92%) contrast(90%) drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement3 5s linear infinite alternate;
	}
	/*animation cloud layers*/
	@keyframes cloud-movement1 {
		from {top: -95px; right:-65px;}
		to {top: -95px; right: -25px;}
	}
	@keyframes cloud-movement2 {
		from {top: -35px; right:-25px;}
		to {top: -35px; right: -55px;}
	}
	@keyframes cloud-movement3 {
		from {top: 0px; right:-35px;}
		to {top: 0px; right: -10px;}
	}

</style>