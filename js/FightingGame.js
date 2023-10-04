import { Ryu } from './entities/characters/Ryu.js';
import { Stage } from './entities/Background.js';
import { FpsCounter } from './entities/FpsCounter.js';
import { STAGE_FLOOR } from './constants/stage.js';
import { Ken } from './entities/characters/Ken.js';
import { FighterDirection } from './constants/fighter.js';
import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from './inputHandler.js';
import { Shadow } from './entities/characters/Shadow.js';
import { StatusBar } from './entities/overlays/StatusBar.js';

export class FightingGame {
    constructor() {
        this.ctx = this.getContext();
        this.fighters = [
            new Ryu(104, STAGE_FLOOR, FighterDirection.RIGHT, 0),
            new Ken(280, STAGE_FLOOR, FighterDirection.LEFT, 1),
        ];

        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];

        this.entities = [
            new Stage(),
            ...this.fighters.map(fighter => new Shadow(fighter)),
            ...this.fighters,
            new FpsCounter(),
            new StatusBar(this.fighters),
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

        pollGamepads();
        this.update();
        this.draw();
    }

    start() {
        registerKeyboardEvents();
        registerGamepadEvents();
        //requests animation at monitor's refresh rate
        window.requestAnimationFrame(this.frame.bind(this));
    }
}
