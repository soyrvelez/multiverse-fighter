export class HitSplash {
    constructor(x, y, playerId) {
        this.position = { x, y };
        this.image = document.querySelector('img[alt="attack-splashes"]');
        this.playerId = playerId;

        this.frames = [];
        this.animationFrame = -1;
        this.animationTimer = 0;
    }

    update() {

    }

    draw() {

    }
}
