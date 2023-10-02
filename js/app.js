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
window.addEventListener('load', function () {
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

    let frameTime = {
        previous: 0,
        secondsPassed: 0,
    };

    // animation function
    function frame(time) {
        window.requestAnimationFrame(frame);

        frameTime = {
            secondsPassed: (time - frameTime.previous) / 1000,
            previous: time,
        }
        for (const entity of entities) {
            entity.update(frameTime, ctx);
        }

        for (const entity of entities) {
            entity.draw(ctx);
        }
    }
    //requests animation at monitor's refresh rate
    window.requestAnimationFrame(frame);
}
);
