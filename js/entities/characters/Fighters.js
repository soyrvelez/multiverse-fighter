import { FighterDirection, FighterState } from '../../constants/fighter.js';
import { STAGE_FLOOR } from '../../constants/stage.js';
import * as control from '../../inputHandler.js';
import { rectsOverlap } from '../../utilities/collisions.js';

export class Character {
    constructor(name, x, y, direction, playerId) {
        this.name = name;
        this.playerId = playerId;
        this.position = { x, y };
        this.velocity = { x: 0, y: 0 };
        this.initialVelocity = {};
        this.direction = direction;
        this.gravity = 0;

        this.frames = new Map();
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animations = {};

        this.image = new Image();

        this.opponent;

        this.pushBox = { x: 0, y: 0, width: 0, height: 0 };

        this.states = {
            [FighterState.IDLE]: {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this),
                validFrom: [
                    undefined,
                    FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD,
                    FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                    FighterState.CROUCH_UP, FighterState.JUMP_LAND, FighterState.IDLE_TURN,
                ],
            },
            [FighterState.WALK_FORWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkForwardState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.WALK_BACKWARD,
                ],
            },
            [FighterState.WALK_BACKWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkBackwardsState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.WALK_FORWARD,
                ],
            },
            [FighterState.JUMP_START]: {
                init: this.handleJumpStartInit.bind(this),
                update: this.handleJumpStartState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.JUMP_LAND,
                    FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD,
                ],
            },
            [FighterState.JUMP_UP]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START],
            },
            [FighterState.JUMP_FORWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START],
            },
            [FighterState.JUMP_BACKWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
                validFrom: [FighterState.JUMP_START],
            },
            [FighterState.JUMP_LAND]: {
                init: this.handleJumpLandInit.bind(this),
                update: this.handleJumpLandState.bind(this),
                validFrom: [
                    FighterState.JUMP_UP, FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                ],
            },
            [FighterState.CROUCH]: {
                init: () => { },
                update: this.handleCrouchState.bind(this),
                validFrom: [FighterState.CROUCH_DOWN, FighterState.CROUCH_TURN],
            },
            [FighterState.CROUCH_DOWN]: {
                init: this.handleCrouchDownInit.bind(this),
                update: this.handleCrouchDownState.bind(this),
                validFrom: [FighterState.IDLE, FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD],
            },
            [FighterState.CROUCH_UP]: {
                init: () => { },
                update: this.handleCrouchUpState.bind(this),
                validFrom: [FighterState.CROUCH],
            },
            [FighterState.IDLE_TURN]: {
                init: () => { },
                update: this.handleIdleTurnState.bind(this),
                validFrom: [
                    FighterState.IDLE, FighterState.JUMP_LAND,
                    FighterState.WALK_FORWARD, FighterState.WALK_BACKWARD,
                ],
            },
            [FighterState.CROUCH_TURN]: {
                init: () => { },
                update: this.handleCrouchTurnState.bind(this),
                validFrom: [FighterState.CROUCH],
            },
        }
        this.changeState(FighterState.IDLE);
    }

    hasCollidedWithOpponent = () => rectsOverlap(
        this.position.x + this.pushBox.x,
        this.position.y + this.pushBox.y,
        this.pushBox.width, this.pushBox.height,
        this.opponent.position.x + this.opponent.pushBox.x,
        this.opponent.position.y + this.opponent.pushBox.y,
        this.opponent.pushBox.width, this.opponent.pushBox.height,
    );

    getDirection() {
        if (
            this.position.x + this.pushBox.x + this.pushBox.width
            <= this.opponent.position.x + this.opponent.pushBox.x
        ) {
            return FighterDirection.RIGHT;
        } else if (
            this.position.x + this.pushBox.x
            >= this.opponent.position.x + this.opponent.pushBox.x + this.opponent.pushBox.width
        ) {
            return FighterDirection.LEFT;
        }
        return this.direction;
    }

    getPushBox(frameKey) {
        const [, [x, y, width, height] = [0, 0, 0, 0]] = this.frames.get(frameKey);

        return { x, y, width, height };
    }

    changeState(newState) {
        if (newState === this.currentState
            || !this.states[newState].validFrom.includes(this.currentState)) return;
        this.currentState = newState;
        this.animationFrame = 0;

        this.states[this.currentState].init();
    }

    handleIdleInit() {
        this.velocity.x = 0;
        this.velocity.y = 0;
    }

    handleMoveInit() {
        this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
    }

    handleJumpInit() {
        this.velocity.y = this.initialVelocity.jump;
        this.handleMoveInit();
    }

    handleCrouchDownInit() {
        this.handleIdleInit();
    }

    handleJumpStartInit() {
        this.handleIdleInit();
    }

    handleJumpLandInit() {
        this.handleIdleInit();
    }

    handleIdleState() {
        if (control.isUp(this.playerId)) this.changeState(FighterState.JUMP_START);
        if (control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_DOWN);
        if (control.isBackward(this.playerId, this.direction)) this.changeState(FighterState.WALK_BACKWARD);
        if (control.isForward(this.playerId, this.direction)) this.changeState(FighterState.WALK_FORWARD);

        const newDirection = this.getDirection();

        if (newDirection !== this.direction) {
            this.direction = newDirection;
            this.changeState(FighterState.IDLE_TURN);
        }
    }

    handleWalkForwardState() {
        if (!control.isForward(this.playerId, this.direction)) this.changeState(FighterState.IDLE);
        if (control.isUp(this.playerId)) this.changeState(FighterState.JUMP_START);
        if (control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_DOWN);

        this.direction = this.getDirection();
    }

    handleWalkBackwardsState() {
        if (!control.isBackward(this.playerId, this.direction)) this.changeState(FighterState.IDLE);
        if (control.isUp(this.playerId)) this.changeState(FighterState.JUMP_START);
        if (control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_DOWN);

        this.direction = this.getDirection();
    }

    handleCrouchDownState() {
        if (this.animations[this.currentState][this.animationFrame][1] === -2) {
            this.changeState(FighterState.CROUCH);
        }

        if (!control.isDown(this.playerId)) {
            this.currentState = FighterState.CROUCH_UP;
            this.animationFrame = this.animations[FighterState.CROUCH_UP][this.animationFrame].length
            - this.animationFrame;
        }
    }

    handleCrouchUpState() {
        if (this.animations[this.currentState][this.animationFrame][1] === -2) {
            this.changeState(FighterState.IDLE);
        }
    }

    handleJumpStartState() {
        if (this.animations[this.currentState][this.animationFrame][1] === -2) {
            if (control.isBackward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_BACKWARD);
            } else if (control.isForward(this.playerId, this.direction)) {
                this.changeState(FighterState.JUMP_FORWARD);
            } else {
                this.changeState(FighterState.JUMP_UP);
            }
        }
    }

    handleJumpLandState() {
        if (this.animationFrame < 1) return;

        let newState = FighterState.IDLE;

        if (!control.isIdle(this.playerId)) {
            this.direction = this.getDirection();
            this.handleIdleState();
        } else {
            const newDirection = this.getDirection();

            if (newDirection !== this.direction) {
                this.direction = newDirection;
                newState = FighterState.IDLE_TURN;
            } else {
                if (this.animations[this.currentState][this.animationFrame][1] !== -2) return;
            }
        }

        this.changeState(newState);
    }

    handleIdleTurnState() {
        this.handleIdleState();

        if (this.animations[this.currentState][this.animationFrame][1] !== -2) return;
        this.changeState(FighterState.IDLE);
    }

    handleCrouchTurnState() {
        this.handleCrouchState();

        if (this.animations[this.currentState][this.animationFrame][1] !== -2) return;
        this.changeState(FighterState.CROUCH);
    }

    handleJumpState(time) {
        this.velocity.y += this.gravity * time.secondsPassed;

        if (this.position.y > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR;
            this.changeState(FighterState.JUMP_LAND);
        }
    }

    handleCrouchState() {
        if (!control.isDown(this.playerId)) this.changeState(FighterState.CROUCH_UP);

        const newDirection = this.getDirection();

        if (newDirection !== this.direction) {
            this.direction = newDirection;
            this.changeState(FighterState.CROUCH_TURN);
        }
    }

    updateStageConstraints(time, ctx) {
        if (this.position.x > ctx.canvas.width - this.pushBox.width) {
            this.position.x = ctx.canvas.width - this.pushBox.width;
        }
        if (this.position.x < this.pushBox.width) {
            this.position.x = this.pushBox.width;
        }

        if (this.hasCollidedWithOpponent()) {
            if (this.position.x <= this.opponent.position.x) {
                this.position.x = Math.max(
                    (this.opponent.position.x + this.opponent.pushBox.x) - (this.pushBox.x + this.pushBox.width),
                    this.pushBox.width,
                );

                if ([
                    FighterState.IDLE, FighterState.CROUCH, FighterState.JUMP_UP,
                    FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                ].includes(this.opponent.currentState)) {
                    this.opponent.position.x += 66 * time.secondsPassed;
                }
            }

            if (this.position.x >= this.opponent.position.x) {
                this.position.x = Math.min(
                    (this.opponent.position.x + this.opponent.pushBox.x + this.opponent.pushBox.width)
                    + (this.pushBox.width + this.pushBox.x),
                    ctx.canvas.width - this.pushBox.width,
                );

                if ([
                    FighterState.IDLE, FighterState.CROUCH, FighterState.JUMP_UP,
                    FighterState.JUMP_FORWARD, FighterState.JUMP_BACKWARD,
                ].includes(this.opponent.currentState)) {
                    this.opponent.position.x -= 66 * time.secondsPassed;
                }
            }
        }
    }

    updateAnimation(time) {
        const animation = this.animations[this.currentState];
        const [frameKey, frameDelay] = animation[this.animationFrame];

        if (time.previous > this.animationTimer + frameDelay) {
            this.animationTimer = time.previous;

            if (frameDelay > 0) {
                this.animationFrame++;
                this.pushBox = this.getPushBox(frameKey);
            }

            if (this.animationFrame >= animation.length) {
                this.animationFrame = 0
            };
        }
    }

    update(time, ctx) {
        this.position.x += (this.velocity.x * this.direction) * time.secondsPassed;
        this.position.y += this.velocity.y * time.secondsPassed;

        this.states[this.currentState].update(time, ctx);
        this.updateAnimation(time);
        this.updateStageConstraints(time, ctx);

    }

    drawDebug(ctx) {
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const pushBox = this.getPushBox(frameKey);
        ctx.lineWidth = 1;

        // PushBox
        ctx.beginPath();
        ctx.strokeStyle = '#55FF55';
        ctx.fillStyle = '#55FF5555';
        ctx.fillRect(
            Math.floor(this.position.x + pushBox.x) + 0.5,
            Math.floor(this.position.y + pushBox.y) + 0.5,
            pushBox.width,
            pushBox.height,
        );
        ctx.rect(
            Math.floor(this.position.x + pushBox.x) + 0.5,
            Math.floor(this.position.y + pushBox.y) + 0.5,
            pushBox.width,
            pushBox.height,
        );
        ctx.stroke();

        // Origin Point Tracker
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.moveTo(Math.floor(this.position.x) - 4, Math.floor(this.position.y) - 0.5);
        ctx.lineTo(Math.floor(this.position.x) + 5, Math.floor(this.position.y) - 0.5);
        ctx.moveTo(Math.floor(this.position.x) + 0.5, Math.floor(this.position.y) - 5);
        ctx.lineTo(Math.floor(this.position.x) + 0.5, Math.floor(this.position.y) + 4);
        ctx.stroke();
    }

    draw(ctx) {
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const [[
            [x, y, width, height],
            [originX, originY],
        ]] = this.frames.get(frameKey);

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
