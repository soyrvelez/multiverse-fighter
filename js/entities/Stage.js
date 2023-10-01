export class Stage {
    constructor() {
        this.image = document.querySelector('img[alt="background"]');
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(background, 0, 0);
    }
}
