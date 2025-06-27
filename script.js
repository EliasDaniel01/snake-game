// Snake Game Turbinado
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const box = 20;
const width = canvas.width / box;
const height = canvas.height / box;

let tunnelMode = false;
let obstaclesEnabled = true;
let snake, direction, food, score, highscore, interval, speed, paused;
let nextDirection = null;
let obstacles = [];
let powerup = null;
let powerupTimer = 0;
let level = 1;
let newLevelMsg = false;
let gameOverTriggered = false;
let skin = "classic";
let speedMode = 120;
let powerupType = null;

const powerupTypes = ["slow", "shrink", "invincible", "magnet"];
const eatSound = document.getElementById("eatSound");
const powerupSound = document.getElementById("powerupSound");
const loseSound = document.getElementById("loseSound");

// --------- MODAL DE MODO ---------
function showModeMenu() {
  const menu = document.createElement('div');
  menu.id = 'modeMenu';
  menu.style.position = 'fixed';
  menu.style.top = '0';
  menu.style.left = '0';
  menu.style.width = '100vw';
  menu.style.height = '100vh';
  menu.style.background = '#181818dd';
  menu.style.display = 'flex';
  menu.style.flexDirection = 'column';
  menu.style.alignItems = 'center';
  menu.style.justifyContent = 'center';
  menu.style.zIndex = 20;
  menu.innerHTML = `
    <h2 style="color:#0f0;">Selecione o Modo</h2>
    <button id="normalMode" style="font-size:1.2em;margin:10px 0;padding:10px 30px;">Normal</button>
    <button id="tunnelMode" style="font-size:1.2em;margin:10px 0;padding:10px 30px;">Modo Túnel (atravessa parede)</button>
  `;
  document.body.appendChild(menu);
  document.getElementById('normalMode').onclick = () => { tunnelMode = false; startGame(); menu.remove(); };
  document.getElementById('tunnelMode').onclick = () => { tunnelMode = true; startGame(); menu.remove(); };
}
showModeMenu();

// --------- INÍCIO DO JOGO ---------
function startGame() {
  highscore = Number(localStorage.getItem('snakeHighScore')) || 0;
  resetGame();
  draw();
  setSpeed(speedMode);
  updateGameStatus();
  updateRanking();
}

function drawSnakeBlock(x, y, isHead = false) {
  if (skin === "emoji") {
    ctx.font = "20px Segoe UI Emoji";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(isHead ? "🐍" : "🟩", x * box + box/2, y * box + box/2+2);
    return;
  }
  const grad = ctx.createLinearGradient(
    x * box, y * box, (x + 1) * box, (y + 1) * box
  );
  if (skin === "blue") {
    grad.addColorStop(0, isHead ? "#0ff" : "#6cf");
    grad.addColorStop(1, isHead ? "#017" : "#07a");
  } else if (isHead) {
    grad.addColorStop(0, "#fff700");
    grad.addColorStop(1, "#bba800");
  } else {
    grad.addColorStop(0, "#0f0");
    grad.addColorStop(1, "#007000");
  }
  ctx.fillStyle = grad;
  ctx.fillRect(x * box, y * box, box, box);
  ctx.strokeStyle = "#060";
  ctx.strokeRect(x * box, y * box, box, box);
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.ellipse(
    x * box + box * 0.55, y * box + box * 0.85,
    box * 0.35, box * 0.18,
    0, 0, Math.PI * 2
  );
  ctx.fill();
  ctx.restore();
}

function drawObstacleBlock(x, y) {
  ctx.fillStyle = "#888";
  ctx.fillRect(x * box, y * box, box, box);
}

function drawFoodBlock(x, y) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x * box + box / 2, y * box + box / 2, box * 0.48, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "#ff0033";
  ctx.fill();
  ctx.restore();
}

function drawPowerupBlock(x, y, type) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x * box + box / 2, y * box + box / 2, box * 0.44, 0, Math.PI * 2);
  ctx.closePath();
  if (type === "slow") ctx.fillStyle = "#00f";
  else if (type === "shrink") ctx.fillStyle = "#f0f";
  else if (type === "invincible") ctx.fillStyle = "#ff0";
  else if (type === "magnet") ctx.fillStyle = "#0ff";
  else ctx.fillStyle = "#0ff";
  ctx.fill();
  ctx.font = "bold 18px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#222";
  ctx.fillText(type[0].toUpperCase(), x * box + box / 2, y * box + box / 2 + 2);
  ctx.restore();
}

function spawnObstacles(n) {
  obstacles = [];
  for (let i = 0; i < n; i++) {
    let pos;
    do {
      pos = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
    } while (
      snake.some(seg => seg.x === pos.x && seg.y === pos.y) ||
      (food && food.x === pos.x && food.y === pos.y)
    );
    obstacles.push(pos);
  }
}

function spawnFood() {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
  } while (
    snake.some(seg => seg.x === pos.x && seg.y === pos.y) ||
    obstacles.some(obs => obs.x === pos.x && obs.y === pos.y)
  );
  return pos;
}

function spawnPowerup() {
  let pos;
  do {
    pos = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
  } while (
    snake.some(seg => seg.x === pos.x && seg.y === pos.y) ||
    obstacles.some(obs => obs.x === pos.x && obs.y === pos.y) ||
    (food && food.x === pos.x && food.y === pos.y)
  );
  powerup = pos;
  powerupTimer = 60;
  powerupType = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = 'ArrowRight';
  nextDirection = null;
  score = 0; level = 1; paused = false;
  food = spawnFood();
  spawnObstacles(obstaclesEnabled ? 5 : 0);
  powerup = null; powerupType = null;
  updateScore();
  updateGameStatus();
  document.getElementById("restartGameBtn").style.display = "none";
  gameOverTriggered = false;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  obstacles.forEach(obs => drawObstacleBlock(obs.x, obs.y));
  if (powerup) drawPowerupBlock(powerup.x, powerup.y, powerupType);
  for (let i = 0; i < snake.length; i++) drawSnakeBlock(snake[i].x, snake[i].y, i === 0);
  drawFoodBlock(food.x, food.y);

  if (paused) {
    ctx.fillStyle = '#000d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 32px Segoe UI';
    ctx.fillStyle = '#00ff00';
    ctx.textAlign = 'center';
    ctx.fillText('⏸ Pausado', canvas.width / 2, canvas.height / 2);
  }
  if (newLevelMsg) {
    ctx.font = 'bold 30px Segoe UI';
    ctx.fillStyle = '#00ffff';
    ctx.textAlign = 'center';
    ctx.fillText(`Nível ${level}!`, canvas.width / 2, canvas.height / 2 - 40);
  }
  if (paused && gameOverTriggered) {
    ctx.fillStyle = "#000c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 32px Segoe UI";
    ctx.fillStyle = "#ff0033";
    ctx.textAlign = "center";
    ctx.fillText("Você perdeu!", canvas.width / 2, canvas.height / 2 - 10);
    ctx.font = "bold 18px Segoe UI";
    ctx.fillStyle = "#fff";
    ctx.fillText(`Score: ${score} | Nível: ${level}`, canvas.width / 2, canvas.height / 2 + 30);
  }
}

function launchParticles(x, y, color) {
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = (canvas.offsetLeft + x * box + box/2) + "px";
    particle.style.top = (canvas.offsetTop + y * box + box/2) + "px";
    particle.style.background = color;
    document.body.appendChild(particle);
    let angle = Math.random() * 2 * Math.PI;
    let dist = 18 + Math.random() * 12;
    let dx = Math.cos(angle) * dist;
    let dy = Math.sin(angle) * dist;
    particle.animate([
      { transform: "translate(0,0)", opacity: 1 },
      { transform: `translate(${dx}px,${dy}px)`, opacity: 0 }
    ], { duration: 600, easing: "ease-out" });
    setTimeout(() => particle.remove(), 600);
  }
}

function update() {
  if (paused) return;

  direction = nextDirection ? nextDirection : direction;
  nextDirection = null;

  let head = { ...snake[0] };
  if (direction === 'ArrowRight') head.x++;
  if (direction === 'ArrowLeft') head.x--;
  if (direction === 'ArrowUp') head.y--;
  if (direction === 'ArrowDown') head.y++;

  if (tunnelMode || (activePowerup === "invincible")) {
    if (head.x < 0) head.x = width - 1;
    if (head.x >= width) head.x = 0;
    if (head.y < 0) head.y = height - 1;
    if (head.y >= height) head.y = 0;
  } else {
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
      gameOver();
      return;
    }
  }
  if (snake.some(seg => seg.x === head.x && seg.y === head.y)) {
    gameOver();
    return;
  }
  if (obstacles.some(obs => obs.x === head.x && obs.y === head.y) && activePowerup !== "invincible") {
    gameOver();
    return;
  }
  snake.unshift(head);

  if (powerup && head.x === powerup.x && head.y === powerup.y) {
    activatePowerup(powerupType);
    powerup = null; powerupType = null;
    powerupSound.currentTime = 0; powerupSound.play();
    launchParticles(head.x, head.y, "#0ff");
  }

  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore(true);
    food = spawnFood();
    eatSound.currentTime = 0; eatSound.play();
    launchParticles(head.x, head.y, "#ff0033");
    if (!powerup && Math.random() < 0.2) spawnPowerup();
  } else {
    snake.pop();
  }

  if (powerup) {
    powerupTimer--;
    if (powerupTimer <= 0) powerup = null;
  }

  let newLevel = Math.floor(score / 10) + 1;
  if (newLevel > level) {
    level = newLevel;
    setSpeed(Math.max(30, speedMode - (level - 1) * 10));
    spawnObstacles(obstaclesEnabled ? 5 + level * 2 : 0);
    newLevelMsg = true;
    setTimeout(() => { newLevelMsg = false; }, 1000);
    launchParticles(head.x, head.y, "#ff0");
  }
  updateGameStatus();
  draw();
}

let activePowerup = null;
let powerupEffectTimer = 0;
function activatePowerup(type) {
  activePowerup = type;
  if (type === "slow") {
    setSpeed(240);
    powerupEffectTimer = 60;
  }
  if (type === "shrink") {
    snake = snake.slice(0, Math.max(1, Math.floor(snake.length / 2)));
    powerupEffectTimer = 1;
  }
  if (type === "invincible") {
    powerupEffectTimer = 70;
  }
  if (type === "magnet") {
    powerupEffectTimer = 50;
  }
}
function handlePowerupEffects() {
  if (activePowerup === "slow" && powerupEffectTimer === 1) setSpeed(speedMode);
  if (activePowerup) {
    powerupEffectTimer--;
    if (powerupEffectTimer <= 0) {
      activePowerup = null;
    }
    if (activePowerup === "magnet" && food) {
      const head = snake[0];
      let dx = food.x - head.x;
      let dy = food.y - head.y;
      if (Math.abs(dx) > Math.abs(dy)) food.x += dx > 0 ? -1 : 1;
      else food.y += dy > 0 ? -1 : 1;
    }
  }
}
setInterval(handlePowerupEffects, 80);

function updateScore(animate = false) {
  document.getElementById('score').textContent = `Score: ${score}`;
  if (animate) {
    const el = document.getElementById('score');
    el.classList.add('animated');
    setTimeout(() => el.classList.remove('animated'), 300);
  }
  if (score > highscore) {
    highscore = score;
    localStorage.setItem('snakeHighScore', highscore);
  }
  document.getElementById('highscore').textContent = `Recorde: ${highscore}`;
}

function updateGameStatus() {
  document.getElementById('level').textContent = `Nível: ${level}`;
  document.getElementById('powerup-status').textContent = activePowerup
    ? `Power-up: ${activePowerup}` : (powerup ? 'Power-up!' : '');
}

function setSpeed(ms) {
  clearInterval(interval);
  speed = ms;
  interval = setInterval(update, speed);
  speedMode = ms;
}

function gameOver() {
  paused = true;
  gameOverTriggered = true;
  draw();
  loseSound.currentTime = 0; loseSound.play();
  document.getElementById("restartGameBtn").style.display = "block";
  saveRanking(score);
  updateRanking();
}

function togglePause() {
  if (gameOverTriggered) return;
  paused = !paused;
  draw();
}

function handleKey(e) {
  if (gameOverTriggered) return;
  if (paused && e.code !== 'Space' && e.key !== 'r' && e.key !== 'R') return;
  if (['ArrowUp', 'w', 'W'].includes(e.key) && direction !== 'ArrowDown')
    nextDirection = 'ArrowUp';
  else if (['ArrowDown', 's', 'S'].includes(e.key) && direction !== 'ArrowUp')
    nextDirection = 'ArrowDown';
  else if (['ArrowLeft', 'a', 'A'].includes(e.key) && direction !== 'ArrowRight')
    nextDirection = 'ArrowLeft';
  else if (['ArrowRight', 'd', 'D'].includes(e.key) && direction !== 'ArrowLeft')
    nextDirection = 'ArrowRight';
  else if (e.code === 'Space') togglePause();
  else if (e.key === 'r' || e.key === 'R') {
    resetGame();
    gameOverTriggered = false;
    draw();
  }
}
document.addEventListener('keydown', handleKey);
document.querySelectorAll('.ctrl').forEach(btn => {
  btn.addEventListener('click', () => {
    if (gameOverTriggered) return;
    const dir = btn.getAttribute('data-dir');
    if (paused && dir) return;
    if (
      (dir === 'ArrowUp' && direction !== 'ArrowDown') ||
      (dir === 'ArrowDown' && direction !== 'ArrowUp') ||
      (dir === 'ArrowLeft' && direction !== 'ArrowRight') ||
      (dir === 'ArrowRight' && direction !== 'ArrowLeft')
    ) {
      nextDirection = dir;
    }
  });
});
document.getElementById('pauseBtn').onclick = togglePause;
document.getElementById('restartBtn').onclick = () => { resetGame(); gameOverTriggered = false; draw(); };
document.getElementById("restartGameBtn").onclick = function() { resetGame(); gameOverTriggered = false; draw(); };
document.getElementById('speed').onchange = e => { setSpeed(Number(e.target.value)); };
document.getElementById('skin').onchange = e => { skin = e.target.value; draw(); };
document.getElementById('ano').textContent = new Date().getFullYear();

function saveRanking(score) {
  let ranking = JSON.parse(localStorage.getItem('snakeRanking') || "[]");
  ranking.push({ score, date: new Date().toLocaleDateString() });
  ranking = ranking.sort((a, b) => b.score - a.score).slice(0, 5);
  localStorage.setItem('snakeRanking', JSON.stringify(ranking));
}
function updateRanking() {
  let ranking = JSON.parse(localStorage.getItem('snakeRanking') || "[]");
  let html = "";
  ranking.forEach((r, i) => {
    html += `<li>#${i+1} - ${r.score} pts <span style="color:#999;font-size:0.92em;">(${r.date})</span></li>`;
  });
  document.getElementById("ranking-list").innerHTML = html;
}
