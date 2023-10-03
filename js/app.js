// import entity functions from entity modules
import { FightingGame } from './FightingGame.js';

window.addEventListener('load', function () {
    const fightingGame = new FightingGame();
    fightingGame.start();
});
