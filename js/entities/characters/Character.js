export class Character {
    constructor(name, x, y, velocity) {
        this.name = name;
        this.image = new Image();
        this.position = {x, y};
        this.velocity = velocity;
    }

    update(secondsPassed, ctx) {
        this.position.x += this.velocity * secondsPassed;

        if (this.position.x > ctx.canvas.width - this.image.width || this.position.x < 0) {
            this.velocity = -this.velocity;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}
