import { Ryu } from './entities/characters/Ryu.js';
import { Stage } from './entities/stage/Background.js';
import { FpsCounter } from './entities/FpsCounter.js';
import { STAGE_MID_POINT, STAGE_PADDING } from './constants/stage.js';
import { Ken } from './entities/characters/Ken.js';
import { FIGHTER_START_DISTANCE, FighterDirection } from './constants/fighter.js';
import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from './inputHandler.js';
import { Shadow } from './entities/characters/Shadow.js';
import { StatusBar } from './entities/overlays/StatusBar.js';
import { Camera } from './Camera.js';
import { getContext } from './utilities/context.js';

export class FightingGame {
    constructor() {
        this.stage = new Stage();

        this.ctx = getContext();
        this.fighters = [new Ryu(0), new Ken(1)];

        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];

        this.camera = new Camera(STAGE_MID_POINT + STAGE_PADDING - (this.ctx.canvas.width / 2), 16, this.fighters);

        this.entities = [
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

    update() {
        this.camera.update(this.frameTime, this.ctx);
        this.stage.update(this.frameTime, this.ctx);

        for (const entity of this.entities) {
            entity.update(this.frameTime, this.ctx, this.camera);
        }
    }

    draw() {
        this.stage.drawBackground(this.ctx, this.camera);
        for (const entity of this.entities) {
            entity.draw(this.ctx, this.camera);
        }

        this.stage.drawForeground(this.ctx, this.camera);
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
