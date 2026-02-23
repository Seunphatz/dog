const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

let player = {
    x: 180,
    y: 180,
    speed: 15
};

let food = {
    x: Math.random() * 360,
    y: Math.random() * 360
};

let score = 0;

function drawPlayer() {
    ctx.font = "30px Arial";
    ctx.fillText("🐶", player.x, player.y);
}

function drawFood() {
    ctx.font = "20px Arial";
    ctx.fillText("🍖", food.x, food.y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function move(direction) {
    if (direction === "up") player.y -= player.speed;
    if (direction === "down") player.y += player.speed;
    if (direction === "left") player.x -= player.speed;
    if (direction === "right") player.x += player.speed;

    keepInsideCanvas();
    checkCollision();
}

function keepInsideCanvas() {
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x > canvas.width - 30) player.x = canvas.width - 30;
    if (player.y > canvas.height - 30) player.y = canvas.height - 30;
}

function checkCollision() {
    if (
        player.x < food.x + 20 &&
        player.x + 20 > food.x &&
        player.y < food.y + 20 &&
        player.y + 20 > food.y
    ) {
        score++;
        scoreDisplay.textContent = score;
        food.x = Math.random() * 360;
        food.y = Math.random() * 360;
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") move("up");
    if (event.key === "ArrowDown") move("down");
    if (event.key === "ArrowLeft") move("left");
    if (event.key === "ArrowRight") move("right");
});

canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (mouseX < player.x) move("left");
    if (mouseX > player.x) move("right");
    if (mouseY < player.y) move("up");
    if (mouseY > player.y) move("down");
});

canvas.addEventListener("touchstart", function(event) {
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;

    if (touchX < player.x) move("left");
    if (touchX > player.x) move("right");
    if (touchY < player.y) move("up");
    if (touchY > player.y) move("down");
});

function gameLoop() {
    clearCanvas();
    drawPlayer();
    drawFood();
    requestAnimationFrame(gameLoop);
}

gameLoop();