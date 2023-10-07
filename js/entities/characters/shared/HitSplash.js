import { FRAME_TIME } from '../../../constants/game.js';

export class HitSplash {
    constructor(x, y, playerId, onEnd) {
        this.position = { x, y };
        this.image = document.querySelector('img[alt="attack-splashes"]');
        this.playerId = playerId;
        this.onEnd = onEnd;

        this.frames = [];
        this.animationFrame = -1;
        this.animationTimer = 0;
    }

    update(time) {
        if (time.previous < this.animationTimer + 4 * FRAME_TIME) return;
        this.animationFrame += 1;
        this.animationTimer = time.previous;

        if (this.animationFrame >= 4) this.onEnd(this);
    }

    draw(ctx, camera) {
        const [
            [x, y, width, height], [originX, originY],
        ] = this.frames[this.animationFrame + this.playerId * 4];

        ctx.drawImage(
            this.image,
            x, y,
            width, height,
            Math.floor(this.position.x - camera.position.x - originX),
            Math.floor(this.position.y - camera.position.y - originY),
            width, height,
        );
    }
}
