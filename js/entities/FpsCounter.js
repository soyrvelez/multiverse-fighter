export class FpsCounter {
    constructor() {
        this.fps = 0;
    }

    update(secondsPassed) {
        this.fps = Math.trunc(1 / secondsPassed);
    }

    draw(ctx) {
        ctx.font = "bold 20px Arial"
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`FPS: ${this.fps}`, ctx.canvas.width / 2, 30);
    }
}
