export class FpsCounter {
    constructor() {
        this.fps = 0;
    }

    update(time) {
        this.fps = Math.trunc(1 / time.secondsPassed);
    }

    draw(ctx) {
        ctx.font = "20px Arial"
        ctx.fillStyle = "#00FF00";
        ctx.textAlign = "right";
        ctx.fillText(`${this.fps}`, ctx.canvas.width - 2, ctx.canvas.height - 2);
    }
}
