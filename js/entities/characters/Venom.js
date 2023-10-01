import { Character } from "./Character.js";

export class Venom extends Character {
    constructor(x, y, velocity) {
        super('Venom', x, y, velocity);

        this.image = document.querySelector('img[alt="venom"]');
    }
}
