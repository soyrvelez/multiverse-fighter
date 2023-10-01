export class Character {
    constructor(name, x, y, velocity) {
        this.name = name;
        this.image = new Image();
        this.frames = new Map();
        this.position = { x, y };
        this.velocity = velocity;
        this.animationFrame = 1;
        this.animationTimer = 0;
    }

    update(time, ctx) {
        const [, , width] = this.frames.get(`forwards-${this.animationFrame}`);

        if (time.previous > this.animationTimer + 60) {
            this.animationTimer = time.previous;

            this.animationFrame++;
            if (this.animationFrame > 6) {
                this.animationFrame = 1;
            }
        }

        this.position.x += this.velocity * time.secondsPassed;

        if (this.position.x > ctx.canvas.width - width || this.position.x < 0) {
            this.velocity = -this.velocity;
        }
    }

    draw(ctx) {
        const [x, y, width, height] = this.frames.get(`forwards-${this.animationFrame}`);

        ctx.drawImage(this.image, x, y, width, height, this.position.x, this.position.y, width, height);
    }
}
