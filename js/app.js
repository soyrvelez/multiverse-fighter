//Defining Game Screen Dimensions
const GameViewport = {
    width: 384,
    height: 224,
}

// Ensure page loads before code runs
window.onload = function () {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = GameViewport.width;
    canvas.height = GameViewport.height;

    const [ryu, background] = document.querySelectorAll('img');
    const position = {
        x: GameViewport.width / 2 - ryu.width / 2,
        y: 110
    };

    let velocity = 1;

    // animation function
    function frame() {
        position.x += velocity;

        // check for x axis boundaries
        if (position.x > GameViewport.width - ryu.width || position.x < 0) {
            velocity = -velocity;
        }

        ctx.drawImage(background, 0, 0);
        ctx.drawImage(ryu, position.x, position.y);

        window.requestAnimationFrame(frame);
    }

    //requests animation
    window.requestAnimationFrame(frame);

}
