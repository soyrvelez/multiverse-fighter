// import entity functions from entity modules
import { Ryu } from './entities/characters/Ryu.js';
import { Stage } from './entities/Stage.js';
import { Venom } from './entities/characters/Venom.js';
import { FpsCounter } from './entities/FpsCounter.js';

//Defining Game Screen Dimensions
const GameViewport = {
    width: 384,
    height: 224,
}

// Ensure page loads before code runs
window.onload = function () {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = GameViewport.width;
    canvas.height = GameViewport.height;

    const entities = [
        new Stage(),
        new Ryu(80, 110, 150),
        new Venom(80, 82, -150),
        new FpsCounter(),
    ];

    // Setting up refresh rate variables
    let previousTime = 0;
    let secondsPassed = 0;

    // animation function
    function frame(time) {
        secondsPassed = (time - previousTime) / 1000;
        previousTime = time;

        for (const entity of entities) {
            entity.update(secondsPassed, ctx);
        }

        for (const entity of entities) {
            entity.draw(ctx);
        }

        window.requestAnimationFrame(frame);
    }
    //requests animation at monitor's refresh rate
    window.requestAnimationFrame(frame);
}
