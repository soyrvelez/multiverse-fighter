//Defining Game Screen Dimensions
const GameViewport = {
    width: 384,
    height: 224,
    scale: 4
}

// Ensure page loads before code runs
window.onload = function() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.width = `${GameViewport.width * GameViewport.scale}px`;
    canvas.style.height = `${GameViewport.height * GameViewport.scale}px`;

    console.log(ctx);
}
