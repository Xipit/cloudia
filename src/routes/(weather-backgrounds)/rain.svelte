<script>

	import { fromLocalStorage } from "$lib/js/util/localStorageWrapper";

</script>
<div id="rain"> 

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

<!--<script>
    function rain() {
        let amount = 50;
        let body = document.querySelector('body');
        let i = 0;
        while(i < amount){
            let drop = document.createElement('i');
            
            let size = Math.random() * 5;
            let positionX = Math.fromLocalStorage(Math.random() * window.innerWidth);
            let delay = Math.random() * -20;
            let duration = Math.random() * 5;

            drop.style.width = 0.2 + size + 'px';
            drop.style.left = positionX + 'px';
            drop.StyleSheet.animationDelay = delay + 's';
            drop.StyleSheet.animationDuration = duration + 's';
            body.appendChild(drop);
            i++
        }
    }
    rain();
</script>-->