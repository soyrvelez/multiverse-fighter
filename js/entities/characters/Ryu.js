import { Character } from "./Character.js";

export class Ryu extends Character {
    constructor(x, y, velocity) {
        super('Ryu', x, y, velocity);

        this.image = document.querySelector('img[alt="ryu"]');

        this.frames = new Map([
            ['forwards-1', [9, 136, 53, 83]],
            ['forwards-2', [78, 130, 60, 89]],
            ['forwards-3', [152, 127, 64, 93]],
            ['forwards-4', [229, 129, 63, 92]],
            ['forwards-5', [306, 127, 55, 92]],
            ['forwards-6', [371, 127, 51, 90]],
        ]);
    }
}
