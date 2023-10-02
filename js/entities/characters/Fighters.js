import { FighterDirection, FighterState } from '../../constants/figther.js';
export class Character {
    constructor(name, x, y, direction) {
        this.name = name;
        this.image = new Image();
        this.frames = new Map();
        this.position = { x, y };
        this.direction = direction;
        this.velocity = 150 * direction;
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animations = {};
        this.currentState = this.changeState();

        this.states = {
            [FighterState.WALK_FORWARD]: {
                init: this.handleWalkForwardInit.bind(this),
                update: this.handleWalkForwardState.bind(this),
            },
            [FighterState.WALK_BACKWARD]: {
                init: this.handleWalkBackwardInit.bind(this),
                update: this.handleWalkBackwardState.bind(this),
            },
        }
    }

    changeState = () => this.velocity * this.direction < 0 ? FighterState.WALK_BACKWARD : FighterState.WALK_FORWARD;

    handleWalkForwardInit() {

    }

    handleWalkForwardState() {

    }

    handleWalkBackwardInit() {

    }

    handleWalkBackwardState() {

    }

    update(time, ctx) {
        const [[, , width]] = this.frames.get(this.animations[this.currentState][this.animationFrame]);

        if (time.previous > this.animationTimer + 60) {
            this.animationTimer = time.previous;

            this.animationFrame++;
            if (this.animationFrame > 5) {
                this.animationFrame = 0;
            }
        }

        this.position.x += this.velocity * time.secondsPassed;

        if (this.position.x > ctx.canvas.width - width / 2) {
            this.velocity = -150;
            this.currentState = this.changeState();
        }
        if (this.position.x < width / 2) {
            this.velocity = 150;
            this.currentState = this.changeState();
        }
    }

    drawDebug(ctx) {
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.moveTo(Math.floor(this.position.x) - 4.5, Math.floor(this.position.y));
        ctx.lineTo(Math.floor(this.position.x) + 4.5, Math.floor(this.position.y));
        ctx.moveTo(Math.floor(this.position.x), Math.floor(this.position.y) - 4.5);
        ctx.lineTo(Math.floor(this.position.x), Math.floor(this.position.y) + 4.5);
        ctx.stroke();
    }

    draw(ctx) {
        const [
            [x, y, width, height],
            [originX, originY],
        ] = this.frames.get(this.animations[this.currentState][this.animationFrame]);

        ctx.scale(this.direction, 1);
        ctx.drawImage(
            this.image,
            x, y,
            width, height,
            Math.floor(this.position.x * this.direction) - originX, Math.floor(this.position.y) - originY,
            width, height
            );
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        this.drawDebug(ctx);
    }
}
