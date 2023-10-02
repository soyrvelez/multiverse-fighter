import { Character } from "./Fighters.js";

export class Venom extends Character {
    constructor(x, y, velocity) {
        super('Venom', x, y, velocity);

        this.image = document.querySelector('img[alt="venom"]');

        this.frames = new Map([
            ['forwards-1', [[7, 2918, 152, 112], [68, 3030]]],
            ['forwards-2', [[186, 2916, 134, 113], [245, 3030]]],
            ['forwards-3', [[348, 2915, 120, 110], [383, 3024]]],
            ['forwards-4', [[495, 2914, 97, 111], [533, 3025]]],
            ['forwards-5', [[614, 2913, 126, 112], [670, 3026]]],
            ['forwards-6', [[769, 2915, 149, 113], [823, 3029]]],
        ]);
    }
}
