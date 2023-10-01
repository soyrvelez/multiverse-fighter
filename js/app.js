// import entity functions from entity modules
import { drawRyu, updateRyu } from './character1.js';
import { drawBackground } from './stage.js';

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

    // animation function
    function frame() {
        updateRyu(ctx);

        drawBackground(ctx);
        drawRyu(ctx);

        window.requestAnimationFrame(frame);
    }
    //requests animation at monitor's refresh rate
    window.requestAnimationFrame(frame);
}
