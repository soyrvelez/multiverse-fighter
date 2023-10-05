import { FRAME_TIME } from '../../constants/game.js';
import { drawFrame } from '../../utilities/context.js';
import { BackgroundAnimation } from './shared/BackgroundAnimation.js';
import { SkewedFloor } from './shared/SkewedFloor.js';

export class Stage {
    constructor() {
        this.image = document.querySelector('img[alt="stage"]');
        this.floor = new SkewedFloor(this.image, [8, 392, 896, 72]);

        this.frames = new Map([
            ['stage-background', [72, 208, 768, 176]],
            ['stage-boat', [8, 16, 521, 180]],
            ['stage-floor', [8, 392, 896, 72]],

            // Grey Suit Fellow
            ['second-person-1', [600, 24, 16, 24]],
            ['second-person-2', [600, 88, 16, 24]],
        ]);

        this.flag = new BackgroundAnimation(
            this.image,
            [
                ['flag-1', [848, 312, 40, 32]],
                ['flag-2', [848, 264, 40, 32]],
                ['flag-3', [848, 216, 40, 32]],
            ],
            [['flag-1', 133], ['flag-2', 133], ['flag-3', 133]],
        );

        this.firstPerson = new BackgroundAnimation(
            this.image,
            [
                ['first-person-1', [552, 8, 40, 64]],
                ['first-person-2', [552, 72, 40, 64]],
                ['first-person-3', [552, 136, 40, 64]],
            ],
            [['first-person-1', 100], ['first-person-2', 133], ['first-person-3', 664], ['first-person-2', 133]],
        );

        this.secondPerson = {
            animationFrame: 0,
            animationTimer: 0,
            animationDelay: 0,

        }

        this.thirdPerson = new BackgroundAnimation(
            this.image,
            [
                ['third-person-1', [624, 16, 32, 56]],
                ['third-person-2', [624, 80, 32, 56]],
                ['third-person-3', [624, 144, 32, 56]],
            ],
            [['third-person-1', 216], ['third-person-2', 216], ['third-person-3', 216], ['third-person-2', 216]],
        );

        this.fourthPerson = new BackgroundAnimation(
            this.image,
            [
                ['fourth-person-1', [664, 16, 32, 56]],
                ['fourth-person-2', [664, 80, 32, 56]],
            ],
            [['fourth-person-1', 664], ['fourth-person-2', 498], ['fourth-person-1', 133],
            ['fourth-person-2', 133]],
        );

        // Blue coat fellow
        this.fifthPerson = new BackgroundAnimation(
            this.image,
            [
                ['fifth-person-1', [704, 16, 48, 56]],
                ['fifth-person-2', [704, 80, 48, 56]],
                ['fifth-person-3', [704, 144, 48, 56]],
            ],
            [
                ['fifth-person-1', 996], ['fifth-person-2', 133], ['fifth-person-3', 100],
                ['fifth-person-2', 133], ['fifth-person-1', 249], ['fifth-person-2', 133],
                ['fifth-person-3', 100], ['fifth-person-2', 133],
            ],
        );

        // Brown Coat Dude
        this.sixthPerson = new BackgroundAnimation(
            this.image,
            [
                ['sixth-person-1', [760, 16, 40, 40]],
                ['sixth-person-2', [760, 64, 40, 40]],
                ['sixth-person-3', [760, 112, 40, 40]],
            ],
            [['sixth-person-1', 133], ['sixth-person-2', 133], ['sixth-person-3', 133],
            ['sixth-person-2', 133]],
        );

        this.seventhPerson = new BackgroundAnimation(
            this.image,
            [
                ['seventh-person-1', [808, 24, 48, 32]],
                ['seventh-person-2', [808, 72, 48, 32]],
                ['seventh-person-3', [808, 120, 48, 32]],
            ],
            [['seventh-person-1', 1992], ['seventh-person-2', 166], ['seventh-person-3', 166],
            ['seventh-person-2', 166], ['seventh-person-1', 664], ['seventh-person-2', 166],
            ['seventh-person-3', 166], ['seventh-person-2', 166], ['seventh-person-3', 166],
            ['seventh-person-2', 166],
            ]);


        this.boat = {
            position: { x: 0, y: 0 },
            animationFrame: 0,
            animationTimer: 0,
            animationDelay: 0,
            animation: [0, -1, -2, -3, -4, -3, -2, -1],
        };
    }

    updateBoat(time) {
        if (time.previous > this.boat.animationTimer + this.boat.animationDelay * FRAME_TIME) {
            this.boat.animationTimer = time.previous;
            this.boat.animationFrame += 1;
            this.boat.animationDelay = 22 + (Math.random() * 16 - 8);
        }

        if (this.boat.animationFrame >= this.boat.animation.length) {
            this.boat.animationFrame = 0;
        }
    }

    updateSecondPerson(time) {
        if (time.previous > this.secondPerson.animationTimer + this.secondPerson.animationDelay) {
            this.secondPerson.animationTimer = time.previous;
            this.secondPerson.animationDelay = 100 + (Math.random() * 900);
            this.secondPerson.animationFrame = !this.secondPerson.animationFrame;
        }
    }

    update(time) {
        this.flag.update(time);
        this.updateBoat(time);
        this.firstPerson.update(time);
        this.updateSecondPerson(time);
        this.thirdPerson.update(time);
        this.fourthPerson.update(time);
        this.fifthPerson.update(time);
        this.sixthPerson.update(time);
        this.seventhPerson.update(time);
    }

    drawFrame(ctx, frameKey, x, y) {
        drawFrame(ctx, this.image, this.frames.get(frameKey), x, y);
    }

    drawSkyOcean(ctx, camera) {
        const backgroundX = Math.floor(16 - (camera.position.x / 2.157303));
        this.drawFrame(ctx, 'stage-background', backgroundX, -camera.position.y);
        this.flag.draw(ctx, backgroundX + 560, 16 - camera.position.y);
    }

    drawBoat(ctx, camera) {
        this.boat.position = {
            x: Math.floor(150 - (camera.position.x / 1.613445)),
            y: Math.floor(-camera.position.y + this.boat.animation[this.boat.animationFrame]),
        };

        this.drawFrame(ctx, 'stage-boat', this.boat.position.x, this.boat.position.y);
        this.firstPerson.draw(ctx, this.boat.position.x + 128, this.boat.position.y + 96);
        this.drawFrame(
            ctx, `second-person-${this.secondPerson.animationFrame + 1}`,
            this.boat.position.x + 167,
            this.boat.position.y + 112
        );
        this.thirdPerson.draw(ctx, this.boat.position.x + 192, this.boat.position.y + 104);
        this.fourthPerson.draw(ctx, this.boat.position.x + 224, this.boat.position.y + 104);
        this.fifthPerson.draw(ctx, this.boat.position.x + 288, this.boat.position.y + 96);
        this.sixthPerson.draw(ctx, this.boat.position.x + 88, this.boat.position.y + 24);
        this.seventhPerson.draw(ctx, this.boat.position.x + 128, this.boat.position.y + 24);
    }

    draw(ctx, camera) {
        this.drawSkyOcean(ctx, camera);
        this.drawBoat(ctx, camera);
        this.floor.draw(ctx, camera, 176);
        // this.drawFrame(ctx, 'stage-floor', Math.floor(192 - camera.position.x), 176 - camera.position.y);
    }
}
