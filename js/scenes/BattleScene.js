import { Camera } from '../engine/Camera.js';
import { STAGE_MID_POINT, STAGE_PADDING } from '../constants/stage';
import { FpsCounter } from '../entities/overlays/FpsCounter.js';
import { StatusBar } from '../entities/overlays/StatusBar.js';
import { KenStage } from '../entities/stage/KenStage.js';

export class BattleScene {
    fighters = [];
    camera = undefined;
    shadows = [];

    constructor() {
        this.stage = new KenStage();

        this.overlays = [
            new StatusBar(this.fighters),
            new FpsCounter(),
        ];

        this.fighters = this.getFighterEntities();
        this.camera = new Camera(STAGE_MID_POINT + STAGE_PADDING - 192, 16, this.fighters);
        this.shadows = this.fighters.map(fighters => new Shadow(fighter));
    }

    getFighterEntities() {
        const fighterEntities = [new Ryu(0), new Ken(1)];

        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];

        return fighterEntities;
    }

    updateFighters(time, ctx) {

    }

    updateShadows(time, ctx) {

    }

    updateEntities(time, ctx) {

    }

    updateOverlays(time, ctx) {

    }

    update(time, ctx) {
        this.updateFighters(time, ctx);
        this.updateShadows(time, ctx);
        this.stage.update(time);
        this.updateEntities(time, ctx);
    }

    draw(ctx) {

    }
}
