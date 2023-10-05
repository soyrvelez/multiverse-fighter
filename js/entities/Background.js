import { drawFrame } from '../utilities/context.js';

export class Stage {
    constructor() {
        this.image = document.querySelector('img[alt="stage"]');

        this.frames = new Map([
            ['stage-background', [72, 208, 768, 176]],
            ['stage-boat', [8, 16, 521, 180]],
            ['stage-floor', [8, 392, 896, 72]],
        ]);

        this.boat = {
            animationFrame: 0,
            animationTimer: 0,
            animationDelay: 0,
            animation: [0, -1, -2, -3, -4, -3, -2, -1],
        };
    }

    updateBoat(time) {

    }

    update(time) {
        this.updateBoat(time);
    }

    drawFrame(ctx, frameKey, x, y) {
        drawFrame(ctx, this.image, this.frames.get(frameKey), x, y);
    }

    draw(ctx, camera) {
        this.drawFrame(ctx, 'stage-background', Math.floor(16 - (camera.position.x / 2.157303)), -camera.position.y);
        this.drawFrame(ctx, 'stage-boat', Math.floor(150 - (camera.position.x / 1.613445)), -1 - camera.position.y);
        this.drawFrame(ctx, 'stage-floor', Math.floor(192 - camera.position.x), 176 - camera.position.y);
    }
}
