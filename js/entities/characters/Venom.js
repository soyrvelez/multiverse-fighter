import { Character } from "./Character.js";

export class Venom extends Character {
    constructor(x, y, velocity) {
        super('Venom', x, y, velocity);

        this.image = document.querySelector('img[alt="venom"]');

        this.frames = new Map([
            ['forwards-1', [7, 2918, 152, 112]],
            ['forwards-2', [186, 2916, 134, 113]],
            ['forwards-3', [348, 2915, 120, 110]],
            ['forwards-4', [495, 2914, 97, 111]],
            ['forwards-5', [614, 2913, 126, 112]],
            ['forwards-6', [769, 2915, 149, 113]],
            ['forwards-7', [942, 2913, 130, 115]],
            ['forwards-8', [1096, 2912, 98, 116]],
        ]);
    }
}
