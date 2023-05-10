<script lang="ts">
    let size = Math.random() * 6;
    let positionX = Math.random() * 100;
    let delay = Math.random() * -20;
    let duration = Math.random() * 8;
    //stops rain from falling too quickly, because of short duration of the animation
    if (duration < 3) {     //duration < 1 --> heavy rain
        duration += 10;
    }
</script>

<i class="raindrop" style="
    width: {size}px; 
    left: {positionX}vw; 
    animation-delay: {delay}s; 
    animation-duration: {duration}s; 
    ">

</i>

<style lang="scss">

    /*RAIN*/
    .raindrop {
        position: fixed;
        height: 100px;
        background: linear-gradient(transparent, white);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        animation: raining infinite;
        z-index: -10;

        display:block;
    }

    .raindrop:nth-child(3n + 1) {
        background: linear-gradient(transparent, grey);
    }
    
    @keyframes raining {
        0% {transform: translateY(-200px) }
        100% {transform: translateY(calc(100vh + 200px))}
    }
</style>