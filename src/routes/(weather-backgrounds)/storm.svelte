<script lang="ts">  
    import layer1 from '$lib/assets/img/layer1.svg';
	import layer2 from '$lib/assets/img/layer2.svg';
	import layer3 from '$lib/assets/img/layer3.svg';
</script>

<!--background cloud layers-->
<img src={layer1} class="clouds" id="layer1" alt="moving clouds">
<img src={layer2} class="clouds" id="layer2" alt="moving clouds">
<img src={layer3} class="clouds" id="layer3" alt="moving clouds">

<style>
/*cloud layers*/
	.clouds {
    	position: absolute;
    	filter: drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		min-width: 2000px;
	}
	#layer1 {
		animation: cloud-movement1 5s linear infinite alternate;
		/*change color svg???, https://stackoverflow.com/questions/22252472/how-can-i-change-the-color-of-an-svg-element/53336754#53336754
		filter: invert(99%) sepia(3%) saturate(377%) hue-rotate(208deg) brightness(116%) contrast(100%);*/
		z-index: -20;
	}
	#layer2 {
		z-index: -50;
		animation: cloud-movement2 5s linear infinite alternate;
	}
	#layer3 {
		z-index: -100;
		animation: cloud-movement3 5s linear infinite alternate;
	}
	/*animation cloud layers*/
	@keyframes cloud-movement1 {
		from {top: -95px; right:-40px;}
		to {top: -95px; right: 0px;}
	}
	@keyframes cloud-movement2 {
		from {top: -35px; right:0px;}
		to {top: -35px; right: -30px;}
	}
	@keyframes cloud-movement3 {
		from {top: 0px; right:-15px;}
		to {top: 0px; right: 10px;}
	}

</style>