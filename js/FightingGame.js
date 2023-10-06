import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from './engine/InputHandler.js';
import { getContext } from './utilities/context.js';
import { BattleScene } from './scenes/BattleScene.js';

export class FightingGame {
    ctx = getContext();

    frameTime = {
        previous: 0,
        secondsPassed: 0,
    };

    constructor() {
        this.scene = new BattleScene();
    }

    // animation function
    frame(time) {
        window.requestAnimationFrame(this.frame.bind(this));

        this.frameTime = {
            secondsPassed: (time - this.frameTime.previous) / 1000,
            previous: time,
        }

        pollGamepads();
        this.scene.update(this.frameTime, this.ctx);
        this.scene.draw(this.ctx);
    }

    start() {
        registerKeyboardEvents();
        registerGamepadEvents();
        //requests animation at monitor's refresh rate
        window.requestAnimationFrame(this.frame.bind(this));
    }
}
