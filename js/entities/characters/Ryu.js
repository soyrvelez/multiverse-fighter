import { Character } from "./Fighters.js";

export class Ryu extends Character {
    constructor(x, y, velocity) {
        super('Ryu', x, y, velocity);

        this.image = document.querySelector('img[alt="ryu"]');

        this.frames = new Map([
             // Forward Movement Sprites
            ['forwards-1', [[9, 136, 53, 83], [27, 81]]],
            ['forwards-2', [[78, 130, 60, 89], [35, 86]]],
            ['forwards-3', [[152, 127, 64, 93], [35, 89]]],
            ['forwards-4', [[229, 129, 63, 92], [29, 89]]],
            ['forwards-5', [[306, 127, 55, 92], [25, 89]]],
            ['forwards-6', [[371, 127, 51, 90], [25, 86]]],

            // Backwards Movement Sprites
            ['backwards-1', [[777, 128, 61, 87], [35, 85]]],
            ['backwards-2', [[430, 124, 59, 90], [36, 87]]],
            ['backwards-3', [[495, 124, 57, 90], [36, 88]]],
            ['backwards-4', [[559, 124, 58, 90], [38, 89]]],
            ['backwards-5', [[631, 125, 58, 91], [36, 88]]],
            ['backwards-6', [[707, 126, 57, 89], [36, 87]]],
        ]);

        this.animations = {
            'walkForwards': ['forwards-1', 'forwards-2', 'forwards-3', 'forwards-4', 'forwards-5', 'forwards-6'],
            'walkBackwards': ['backwards-1', 'backwards-2', 'backwards-3', 'backwards-4', 'backwards-5', 'backwards-6'],
        }

    }
}
