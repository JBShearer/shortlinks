// Initialize the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tileSize = 40;
const map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let player = { x: 50, y: 50, size: 20, color: 'blue' };
let keys = {};

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    let newX = player.x;
    let newY = player.y;

    if (keys['ArrowUp'] || keys['w']) newY -= 2;
    if (keys['ArrowDown'] || keys['s']) newY += 2;
    if (keys['ArrowLeft'] || keys['a']) newX -= 2;
    if (keys['ArrowRight'] || keys['d']) newX += 2;

    if (!isColliding(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }
}

function isColliding(x, y) {
    const col = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize);
    return map[row][col] === 0;
}

// Draw game elements
function draw() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Event listeners for keyboard input
window.addEventListener('keydown', (e) => keys[e.key] = true);
window.addEventListener('keyup', (e) => keys[e.key] = false);

function handleTouchStart(direction) {
    keys[direction] = true;
}

function handleTouchEnd(direction) {
    keys[direction] = false;
}

['up', 'left', 'down', 'right'].forEach(direction => {
    document.getElementById(direction).addEventListener('touchstart', () => handleTouchStart(`Arrow${direction.charAt(0).toUpperCase() + direction.slice(1)}`));
    document.getElementById(direction).addEventListener('touchend', () => handleTouchEnd(`Arrow${direction.charAt(0).toUpperCase() + direction.slice(1)}`));
    document.getElementById(direction).addEventListener('mousedown', () => handleTouchStart(`Arrow${direction.charAt(0).toUpperCase() + direction.slice(1)}`));
    document.getElementById(direction).addEventListener('mouseup', () => handleTouchEnd(`Arrow${direction.charAt(0).toUpperCase() + direction.slice(1)}`));
});

gameLoop();
