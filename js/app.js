// import entity functions from entity modules
import { Ryu } from './Ryu.js';
import { Stage } from './Stage.js';
import { Venom } from './Venom.js';
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

    const ryu = new Ryu(80, 110, 1);
    const venom = new Venom(80, 82, -1);
    const stage = new Stage();

    // animation function
    function frame() {
        ryu.update(ctx);
        venom.update(ctx);

        stage.draw(ctx);
        ryu.draw(ctx);
        venom.draw(ctx);

        window.requestAnimationFrame(frame);
    }
    //requests animation at monitor's refresh rate
    window.requestAnimationFrame(frame);
}
