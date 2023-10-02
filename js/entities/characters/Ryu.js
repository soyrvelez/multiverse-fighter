import { Character } from "./Character.js";

export class Ryu extends Character {
    constructor(x, y, velocity) {
        super('Ryu', x, y, velocity);

        this.image = document.querySelector('img[alt="ryu"]');

        this.frames = new Map([
            ['forwards-1', [[9, 136, 53, 83], [27, 81]]],
            ['forwards-2', [[78, 130, 60, 89], [35, 86]]],
            ['forwards-3', [[152, 127, 64, 93], [35, 89]]],
            ['forwards-4', [[229, 129, 63, 92], [29, 89]]],
            ['forwards-5', [[306, 127, 55, 92], [25, 89]]],
            ['forwards-6', [[371, 127, 51, 90], [25, 86]]],
        ]);
    }
}
