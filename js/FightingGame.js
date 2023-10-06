import { Ryu } from './entities/characters/Ryu.js';
import { KenStage } from './entities/stage/KenStage.js';
import { FpsCounter } from './entities/overlays/FpsCounter.js';
import { STAGE_MID_POINT, STAGE_PADDING } from './constants/stage.js';
import { Ken } from './entities/characters/Ken.js';
import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from './engine/InputHandler.js';
import { Shadow } from './entities/characters/Shadow.js';
import { StatusBar } from './entities/overlays/StatusBar.js';
import { Camera } from './engine/Camera.js';
import { getContext } from './utilities/context.js';

export class FightingGame {
    ctx = getContext();
    fighters = [new Ryu(0), new Ken(1)];
    frameTime = {
        previous: 0,
        secondsPassed: 0,
    };
    camera = new Camera(STAGE_MID_POINT + STAGE_PADDING - (this.ctx.canvas.width / 2), 16, this.fighters);

    constructor() {
        this.stage = new KenStage();

        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];

        this.entities = [
            ...this.fighters.map(fighter => new Shadow(fighter)),
            ...this.fighters,
        ];

        this.overlays = [
            new FpsCounter(),
            new StatusBar(this.fighters),
        ];
    }

    update() {
        this.camera.update(this.frameTime, this.ctx);
        this.stage.update(this.frameTime, this.ctx);

        for (const entity of this.entities) {
            entity.update(this.frameTime, this.ctx, this.camera);
        }

        for (const overlay of this.overlays) {
            overlay.update(this.frameTime, this.ctx, this.camera);
        }
    }

    draw() {
        this.stage.drawBackground(this.ctx, this.camera);
        for (const entity of this.entities) {
            entity.draw(this.ctx, this.camera);
        }

        for (const overlay of this.overlays) {
            overlay.draw(this.ctx, this.camera);
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
