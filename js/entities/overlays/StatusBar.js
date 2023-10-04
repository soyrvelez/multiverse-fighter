export class StatusBar {
    constructor(fighters,) {
        this.image = document.querySelector('img[alt="game-ui"]');

        this.time = 99;
        this.timeTimer = 0;
        this.fighters = fighters;

        this.frames = new Map([
            ['health-bar', [16, 18, 145, 11]],

            ['ko-white', [161, 16, 32, 14]],

            // Each of these represents a number used for the timer 0 - 9
            ['time-0', [16, 32, 14, 16]],
            ['time-1', [32, 32, 14, 16]],
            ['time-2', [48, 32, 14, 16]],
            ['time-3', [64, 32, 14, 16]],
            ['time-4', [80, 32, 14, 16]],
            ['time-5', [96, 32, 14, 16]],
            ['time-6', [112, 32, 14, 16]],
            ['time-7', [128, 32, 14, 16]],
            ['time-8', [144, 32, 14, 16]],
            ['time-9', [160, 32, 14, 16]],

            // Fighter game tags from the original game
            ['tag-ken', [128, 56, 30, 9]],
            ['tag-ryu', [16, 56, 28, 9]],
        ]);
    }

    drawFrame(ctx, frameKey, x, y, direction = 1) {
        const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);

        ctx.scale(direction, 1);
        ctx.drawImage(
            this.image,
            sourceX, sourceY, sourceWidth, sourceHeight,
            x * direction, y, sourceWidth, sourceHeight,
        );
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    update(time, ctx) {

    }

    draw(ctx) {
        this.drawFrame(ctx, 'health-bar', 31, 20);
        this.drawFrame(ctx, 'ko-white', 176, 18);
        this.drawFrame(ctx, 'health-bar', 353, 20, -1);
    }
}
