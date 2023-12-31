import { GamepadThumbstick, Control } from '../config/controls.js';

// Mapping Keyboard and Xbox Controller Input to controls
export const controls = [
    {
        gamePad: {
            [GamepadThumbstick.DEAD_ZONE]: 0.5,
            [GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
            [GamepadThumbstick.VERTICAL_AXE_ID]: 1,

            [Control.LEFT]: 14,
            [Control.RIGHT]: 15,
            [Control.UP]: 12,
            [Control.DOWN]: 13,
            [Control.LIGHT_PUNCH]: 2,
            [Control.MEDIUM_PUNCH]: 3,
            [Control.HEAVY_PUNCH]: 5,
            [Control.LIGHT_KICK]: 0,
            [Control.MEDIUM_KICK]: 1,
            [Control.HEAVY_KICK]: 4,
        },
        keyboard: {
            [Control.LEFT]: 'ArrowLeft',
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]: 'ArrowDown',
            [Control.LIGHT_PUNCH]: 'ControlLeft',
            [Control.MEDIUM_PUNCH]: 'AltLeft',
            [Control.HEAVY_PUNCH]: 'Space',
            [Control.LIGHT_KICK]: 'ShiftLeft',
            [Control.MEDIUM_KICK]: 'KeyZ',
            [Control.HEAVY_KICK]: 'KeyX',
        }
    },
    {
        gamePad: {
            [GamepadThumbstick.DEAD_ZONE]: 0.5,
            [GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
            [GamepadThumbstick.VERTICAL_AXE_ID]: 1,

            [Control.LEFT]: 14,
            [Control.RIGHT]: 15,
            [Control.UP]: 12,
            [Control.DOWN]: 13,
            [Control.LIGHT_PUNCH]: 2,
            [Control.MEDIUM_PUNCH]: 3,
            [Control.HEAVY_PUNCH]: 5,
            [Control.LIGHT_KICK]: 0,
            [Control.MEDIUM_KICK]: 1,
            [Control.HEAVY_KICK]: 4,
        },
        keyboard: {
            [Control.LEFT]: 'KeyF',
            [Control.RIGHT]: 'KeyH',
            [Control.UP]: 'KeyT',
            [Control.DOWN]: 'KeyG',
            [Control.LIGHT_PUNCH]: 'KeyQ',
            [Control.MEDIUM_PUNCH]: 'KeyW',
            [Control.HEAVY_PUNCH]: 'KeyE',
            [Control.LIGHT_KICK]: 'KeyA',
            [Control.MEDIUM_KICK]: 'KeyS',
            [Control.HEAVY_KICK]: 'KeyD',
        }
    }
];
