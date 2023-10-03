import { FighterState } from "../../constants/fighter.js";
import { Character } from "./Fighters.js";

export class Ryu extends Character {
    constructor(x, y, direction, playerId) {
        super('Ryu', x, y, direction, playerId);

        this.image = document.querySelector('img[alt="ryu"]');

        this.frames = new Map([
            // Idle Sprites
            ['idle-1', [[75, 14, 60, 89], [34, 86]]],
            ['idle-2', [[7, 14, 59, 90], [33, 87]]],
            ['idle-3', [[277, 11, 58, 92], [32, 89]]],
            ['idle-4', [[211, 10, 55, 93], [31, 90]]],
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
            // Jump Up Sprites
            ['jump-up-1', [[67, 244, 56, 104], [32, 107]]],
            ['jump-up-2', [[138, 233, 50, 89], [25, 103]]],
            ['jump-up-3', [[197, 233, 54, 77], [25, 103]]],
            ['jump-up-4', [[259, 240, 48, 70], [28, 101]]],
            ['jump-up-5', [[319, 234, 48, 89], [25, 106]]],
            ['jump-up-6', [[375, 244, 55, 109], [31, 113]]],
            // Jump with direction
            ['jump-roll-1', [[878, 121, 55, 103], [25, 106]]],
            ['jump-roll-2', [[442, 261, 61, 78], [22, 90]]],
            ['jump-roll-3', [[507, 259, 104, 42], [61, 76]]],
            ['jump-roll-4', [[617, 240, 53, 82], [42, 111]]],
            ['jump-roll-5', [[676, 257, 122, 44], [71, 81]]],
            ['jump-roll-6', [[804, 258, 71, 87], [53, 98]]],
            ['jump-roll-7', [[883, 261, 54, 109], [31, 113]]],

            // Jump first-last frame
            ['jump-land', [[7, 268, 55, 85], [29, 83]]],
            // Crouch
            ['crouch-1', [[551, 21, 53, 83], [27, 81]]],
            ['crouch-2', [[611, 36, 57, 69], [25, 66]]],
            ['crouch-3', [[679, 44, 61, 61], [25, 58]]],
        ]);

        this.animations = {
            [FighterState.IDLE]: [
                ['idle-1', 68], ['idle-2', 68], ['idle-3', 68],
                ['idle-4', 68], ['idle-3', 68], ['idle-2', 68],
            ],
            [FighterState.WALK_FORWARD]: [
                ['forwards-1', 65], ['forwards-2', 65], ['forwards-3', 65],
                ['forwards-4', 65], ['forwards-5', 65], ['forwards-6', 65],
            ],
            [FighterState.WALK_BACKWARD]: [
                ['backwards-1', 65], ['backwards-2', 65], ['backwards-3', 65],
                ['backwards-4', 65], ['backwards-5', 65], ['backwards-6', 65],
            ],
            [FighterState.JUMP_START]: [
                ['jump-land', 50], ['jump-land', -2],
            ],
            [FighterState.JUMP_UP]: [
                ['jump-up-1', 180], ['jump-up-2', 100], ['jump-up-3', 100],
                ['jump-up-4', 100], ['jump-up-5', 100], ['jump-up-6', -1],
            ],
            [FighterState.JUMP_FORWARD]: [
                ['jump-roll-1', 200], ['jump-roll-2', 50], ['jump-roll-3', 50],
                ['jump-roll-4', 100], ['jump-roll-5', 50], ['jump-roll-6', 50],
                ['jump-roll-7', 0],
            ],
            [FighterState.JUMP_BACKWARD]: [
                ['jump-roll-7', 200], ['jump-roll-6', 50], ['jump-roll-5', 50],
                ['jump-roll-4', 50], ['jump-roll-3', 50], ['jump-roll-2', 50],
            ],
            [FighterState.JUMP_LAND]: [
                ['jump-land', 33], ['jump-land', 117],
                ['jump-land', -2],
            ],
            [FighterState.CROUCH]: [['crouch-3', 0]],
            [FighterState.CROUCH_DOWN]: [
                ['crouch-1', 30], ['crouch-2', 30], ['crouch-3', 30], ['crouch-3', -2],
            ],
            [FighterState.CROUCH_UP]: [
                ['crouch-3', 30], ['crouch-2', 30], ['crouch-1', 30], ['crouch-1', -2],
            ],
        };

        this.initialVelocity = {
            x: {
                [FighterState.WALK_FORWARD]: 200,
                [FighterState.WALK_BACKWARD]: -150,
                [FighterState.JUMP_FORWARD]: 170,
                [FighterState.JUMP_BACKWARD]: -200,
            },
            jump: -420,
        };

        this.gravity = 1000;

    }
}
