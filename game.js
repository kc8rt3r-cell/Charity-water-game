const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d", { alpha: false });

const state = {
  width: 0,
  height: 0,
  dpr: 1,
  highScore: 0,
  lastTime: 0,
};

const colors = {
  deep: "#1e4d6b",
  light: "#e7f7ff",
  accent: "#ffc933",
  ink: "#0a2233",
};

function loadHighScore() {
  const stored = Number.parseInt(localStorage.getItem("streamyFlowHighScore"), 10);
  state.highScore = Number.isNaN(stored) ? 0 : stored;
}

function resizeCanvas() {
  state.dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.width = window.innerWidth;
  state.height = window.innerHeight;

  canvas.width = Math.floor(state.width * state.dpr);
  canvas.height = Math.floor(state.height * state.dpr);
  ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
}

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, state.height);
  gradient.addColorStop(0, "#d6f3ff");
  gradient.addColorStop(0.45, "#8ed6f7");
  gradient.addColorStop(1, "#2f6b8f");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, state.width, state.height);
}

function drawLogo(x, y, size) {
  const canWidth = size * 0.7;
  const canHeight = size;
  const radius = size * 0.08;

  ctx.fillStyle = colors.accent;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + canWidth, y);
  ctx.lineTo(x + canWidth, y + canHeight);
  ctx.lineTo(x, y + canHeight);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(10, 34, 51, 0.35)";
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, canWidth, canHeight);

  ctx.fillStyle = colors.light;
  ctx.fillRect(x + canWidth * 0.72, y + canHeight * 0.15, radius * 2, radius * 4);

  ctx.fillStyle = colors.ink;
  ctx.font = `bold ${Math.floor(size * 0.2)}px 'Trebuchet MS', sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("cw", x + canWidth * 0.5, y + canHeight * 0.62);
}

function drawStartScreen() {
  drawBackground();

  const centerX = state.width / 2;
  const titleY = state.height * 0.22;

  ctx.fillStyle = colors.ink;
  ctx.textAlign = "center";
  ctx.font = "bold 34px 'Trebuchet MS', sans-serif";
  ctx.fillText("Streamy Flow", centerX, titleY);

  ctx.font = "16px 'Trebuchet MS', sans-serif";
  ctx.fillStyle = "rgba(10, 34, 51, 0.75)";
  ctx.fillText("charity:water Edition", centerX, titleY + 24);

  const logoSize = Math.min(state.width, state.height) * 0.18;
  drawLogo(centerX - logoSize * 0.35, titleY + 50, logoSize);

  ctx.fillStyle = colors.ink;
  ctx.font = "bold 18px 'Trebuchet MS', sans-serif";
  ctx.fillText("Tap to Start", centerX, state.height * 0.62);

  ctx.font = "16px 'Trebuchet MS', sans-serif";
  ctx.fillText(`High Score: ${state.highScore}`, centerX, state.height * 0.68);
}

function render(timestamp) {
  state.lastTime = timestamp;
  drawStartScreen();
  requestAnimationFrame(render);
}

loadHighScore();
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
requestAnimationFrame(render);
