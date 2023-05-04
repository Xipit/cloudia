<script lang="ts">  
    import layer1 from '$lib/assets/svg/background/layer1.svg';
	import layer2 from '$lib/assets/svg/background/layer2.svg';
	import layer3 from '$lib/assets/svg/background/layer3.svg';
    import snowflakes from '$lib/assets/svg/background/snowflakes.svg';
    import snowflakessmall from '$lib/assets/svg/background/snowflakes-small.svg';
</script>

<!--background cloud layers-->
<div class="background-images">
	<img src={layer1} class="clouds" id="layer1" alt="moving clouds">
	<img src={layer2} class="clouds" id="layer2" alt="moving clouds">
	<img src={layer3} class="clouds" id="layer3" alt="moving clouds">
    <img src={snowflakes} class="snowflake snowflake-big animation" alt="snowflakes">
    <img src={snowflakes} class="snowflake snowflake-big animation left-side-big" alt="snowflakes">
    <img src={snowflakes} class="snowflake snowflake-big animation-delay" alt="snowflakes">
    <img src={snowflakes} class="snowflake snowflake-big animation-delay left-side-big" alt="snowflakes">
    <img src={snowflakessmall} class="snowflake snowflake-small animation-small" alt="snowflakes">
    <img src={snowflakessmall} class="snowflake snowflake-small animation-small left-side-small" alt="snowflakes">
    <img src={snowflakessmall} class="snowflake snowflake-small animation-small-delay" alt="snowflakes">
    <img src={snowflakessmall} class="snowflake snowflake-small animation-small-delay left-side-small" alt="snowflakes">
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

    /*
	Filter generated with: https://codepen.io/sosuke/pen/Pjoqqp
	Original color of SVG must be black, in order to get the right color with the filter
	*/

	#layer1 {
		z-index: -20;
		filter: invert(92%) sepia(7%) saturate(475%) hue-rotate(183deg) brightness(95%) contrast(89%) 
        drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement1 5s linear infinite alternate;		
	}
	#layer2 {
		z-index: -50;
		filter: invert(65%) sepia(13%) saturate(110%) hue-rotate(140deg) brightness(96%) contrast(86%) 
        drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement2 5s linear infinite alternate;
	}
	#layer3 {
		z-index: -100;
		filter: invert(56%) sepia(5%) saturate(102%) hue-rotate(71deg) brightness(97%) contrast(90%) 
        drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
		animation: cloud-movement3 5s linear infinite alternate;
	}
    
    /*Snowflakes DEFINITION*/
    .snowflake {
        position: fixed;
        right: 0px;
        top: -800px;
        
    }
    .snowflake-big {
        width:1200px;
        z-index: 10;
    }
    .snowflake-small {
        width:1000px;
        z-index: 8;
    }
    .left-side-big {
        right:1200px;
    }
    .left-side-small {
        right:1000px;
    }
    .animation {
        animation: snowfall 30s linear infinite;
    }
    .animation-delay {
        animation: snowfall 30s linear 11s infinite
    }
    .animation-small {
        animation: snowfall 20s linear infinite;
    }
    .animation-small-delay {
        animation: snowfall 20s linear 11s infinite
    }
    
	/*animation cloud layers*/
	@keyframes cloud-movement1 {
		from {right:-65px;}
		to {right: -25px;}
	}
	@keyframes cloud-movement2 {
		from {right:-25px;}
		to {right: -55px;}
	}
	@keyframes cloud-movement3 {
		from {right:-35px;}
		to {right: -10px;}
	}

    /*animation snowflakes*/

    @keyframes snowfall {
        0% {top:-800px;}
        100% {top:1000px;}
    }

</style>