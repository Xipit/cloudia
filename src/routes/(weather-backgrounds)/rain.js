//creates a amount of raindrops which are animated with randomized delay and duration on a random x position 
//to create an altering rain effekt
    function rain() {
        let amount = 50;
        let rain = document.getElementById('rain');
        let i = 0;
        while(i < amount){
            let drop = document.createElement('i');
            
            let size = Math.random() * 5;
            let positionX = (Math.random() * window.innerWidth);
            let delay = Math.random() * -20;
            let duration = Math.random() * 5;

            drop.style.width = 0.2 + size + 'px';
            drop.style.left = positionX + 'px';
            drop.style.animationDelay = delay + 's';
            drop.style.animationDuration = duration + 's';
            if (rain!==null) {
               rain.appendChild(drop); 
            }
            i++;
        }
   }