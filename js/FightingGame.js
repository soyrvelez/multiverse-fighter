import { Ryu } from './entities/characters/Ryu.js';
import { Stage } from './entities/Background.js';
import { FpsCounter } from './entities/FpsCounter.js';
import { STAGE_FLOOR } from './constants/stage.js';
import { Ken } from './entities/characters/Ken.js';
import { FighterDirection } from './constants/fighter.js';
import { registerKeyboardEvents } from './inputHandler.js';

export class FightingGame {
    constructor() {
        this.ctx = this.getContext();
        this.fighters = [
            new Ryu(104, STAGE_FLOOR, FighterDirection.RIGHT),
            new Ken(280, STAGE_FLOOR, FighterDirection.LEFT),
        ];

        this.entities = [
            new Stage(),
            ...this.fighters,
            new FpsCounter(),
        ];

        this.frameTime = {
            previous: 0,
            secondsPassed: 0,
        };
    }

    getContext() {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');

        ctx.imageSmoothingEnabled = false;
        return ctx;
    }

    update() {
        for (const entity of this.entities) {
            entity.update(this.frameTime, this.ctx);
        }
    }

    draw() {
        for (const entity of this.entities) {
            entity.draw(this.ctx);
        }
    }

    // animation function
    frame(time) {
        window.requestAnimationFrame(this.frame.bind(this));

        this.frameTime = {
            secondsPassed: (time - this.frameTime.previous) / 1000,
            previous: time,
        }

        this.update();
        this.draw();
    }

    start() {
        registerKeyboardEvents();
        //requests animation at monitor's refresh rate
        window.requestAnimationFrame(this.frame.bind(this));
    }
}
