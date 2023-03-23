const { ceil, sin, cos, pow, PI } = Math;
const polar = (ang, r = 1) => [r * cos(ang), r * sin(ang)];
const { innerWidth: w, innerHeight: h } = window;
const canvas = document.getElementById("canvas");
canvas.width = w;
canvas.height = h;
const ctx = canvas.getContext("2d");
const tileWidth = 3;
noise.seed(Math.random());

const horizontalTilesCount = ceil(w / tileWidth);
const verticalTilesCount = ceil(h / tileWidth);

const line = (x1, y1, x2, y2, p) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.closePath();
};

for (let ix = 0; ix <= horizontalTilesCount; ix++) {
  const x = ix * tileWidth;
  for (let iy = 0; iy <= verticalTilesCount; iy++) {
    const y = iy * tileWidth;
    let p = noise.perlin2(x * 0.006, y * 0.006) / 0.75;
    p = pow(p, 2);
    const ang = p * 2 * PI;
    const [x2, y2] = polar(ang, tileWidth * 4);
    line(x, y, x + x2, y + y2, p);
  }
}
