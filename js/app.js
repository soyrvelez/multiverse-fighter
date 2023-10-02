// import entity functions from entity modules
import { Ryu } from './entities/characters/Ryu.js';
import { Stage } from './entities/Background.js';
import { Venom } from './entities/characters/Venom.js';
import { FpsCounter } from './entities/FpsCounter.js';
import { STAGE_FLOOR } from './constants/stage.js';
import { Ken } from './entities/characters/Ken.js';
import { FighterDirection, FighterState } from './constants/fighter.js';

function populateMoveDropdown() {
    const dropdown = document.getElementById('state-dropdown');

    Object.entries(FighterState).forEach(([, value]) => {
        const option = document.createElement('option');
        option.setAttribute('value', value);
        option.innerText = value;
        dropdown.appendChild(option);
    });
}

function handleFormSubmit(e, fighters) {
    e.preventDefault();

    const selectedCheckboxes = Array.from(e.target.querySelectorAll('input:checked'))
    .map(checkbox => checkbox.value);

    const options = e.target.querySelector('select');

    fighters.forEach(fighter => {
       if (selectedCheckboxes.includes(fighter.name)) {
        fighter.changeState(options.value);
       }
    });
}


// Ensure page loads before code runs
window.addEventListener('load', function () {
    populateMoveDropdown();
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    ctx.imageSmoothingEnabled = false;

    const fighters = [
        new Ryu(104, STAGE_FLOOR, FighterDirection.RIGHT),
        new Ken(280, STAGE_FLOOR, FighterDirection.LEFT),
    ];

    const entities = [
        new Stage(),
        ...fighters,
        new FpsCounter(),
    ];

    let frameTime = {
        previous: 0,
        secondsPassed: 0,
    };

    // animation function
    function frame(time) {
        window.requestAnimationFrame(frame);

        frameTime = {
            secondsPassed: (time - frameTime.previous) / 1000,
            previous: time,
        }
        for (const entity of entities) {
            entity.update(frameTime, ctx);
        }

        for (const entity of entities) {
            entity.draw(ctx);
        }
    }

    this.document.addEventListener('submit', (e) => handleFormSubmit(e, fighters));

    //requests animation at monitor's refresh rate
    window.requestAnimationFrame(frame);
}
);
