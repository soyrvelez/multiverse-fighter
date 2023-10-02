import { FighterDirection, FighterState } from '../../constants/fighter.js';
export class Character {
    constructor(name, x, y, direction) {
        this.name = name;
        this.image = new Image();
        this.frames = new Map();
        this.position = { x, y };
        this.direction = direction;
        this.velocity = 0;
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animations = {};

        this.states = {
            [FighterState.WALK_FORWARD]: {
                init: this.handleWalkForwardInit.bind(this),
                update: this.handleWalkForwardState.bind(this),
            },
            [FighterState.WALK_BACKWARD]: {
                init: this.handleWalkBackwardsInit.bind(this),
                update: this.handleWalkBackwardsState.bind(this),
            },
        }
        this.changeState(FighterState.WALK_BACKWARD);
    }

    changeState(newState) {
        this.currentState = newState;
        this.animationFrame = 0;

        this.states[this.currentState].init();
    }

    handleWalkForwardInit() {
        this.velocity = 150 * this.direction;
    }

    handleWalkForwardState() {

    }

    handleWalkBackwardsInit() {
        this.velocity = -150 * this.direction;
    }

    handleWalkBackwardsState() {

    }

    updateStageConstraints(ctx) {
        const WIDTH = 32;

        if (this.position.x > ctx.canvas.width - WIDTH) {
            this.position.x = ctx.canvas.width - WIDTH;
        }
        if (this.position.x < WIDTH) {
            this.position.x = WIDTH;
        }
    }

    update(time, ctx) {
        if (time.previous > this.animationTimer + 60) {
            this.animationTimer = time.previous;

            this.animationFrame++;
            if (this.animationFrame > 5) this.animationFrame = 0;
        }

        this.position.x += this.velocity * time.secondsPassed;

        this.states[this.currentState].update(time, ctx);
        this.updateStageConstraints(ctx);

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
