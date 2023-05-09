<script>

	import { fromLocalStorage } from "$lib/js/util/localStorageWrapper";

</script>

<div id="rain" class="background-images"> 
    <p>HI</p>
</div>



<style lang="scss">
    @import './cloud-animations.scss';

	.background-images {
		position: fixed;
		top:0px;
		right:0px;
		z-index: -20;
	}

    i {
        position: fixed;
        height: 200px;
        background: linear-gradient(transparent, white);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        animation: raining;
    }
    i:nth-child(3n + 1) {
        background: linear-gradient(transparent, grey);
    }

    @keyframes raining {
        0% {transform: translateY(-200px)}
        100% {transform: translateY(calc(100vh + 200px))}
    }

</style>