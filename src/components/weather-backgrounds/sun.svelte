<script lang="ts">
    import sun from '$lib/assets/svg/background/sun.svg';
    import sunbeams from '$lib/assets/svg/background/sunbeams.svg';
</script>

<img src={sun} id="sun" alt="sun">
<img src={sunbeams} id="sunbeams" alt="sunbeam">


<style lang="scss">
    #sun {
        position: fixed;
        top:-40px;
		right:-40px;
        width: 190px;
        z-index: -100;
        filter: drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
    }
    #sunbeams {
        position: fixed;
        top:-2567px;
		right:-2559px;
        width: 5250px;
        z-index: -100;
        filter: drop-shadow(6px 10px 3px rgb(0 0 0 / 0.4));
        animation: rotateBeams infinite 5s ease-in-out;
        transform-origin: center center;
    }
    @keyframes rotateBeams {
        0% {transform: rotate(1deg)}
        50% {transform: rotate(0deg)}
        100% {transform: rotate(1deg)}
    }
</style>