import { readFileSync, writeFileSync } from 'node:fs';
import { PNG } from 'pngjs';

const TOLERANCE = 38;
const CROP_ALPHA = 96;

function strip(file) {
  const data = readFileSync(file);
  const png = PNG.sync.read(data);
  const { width, height, data: px } = png;

  let r = 0, g = 0, b = 0, n = 0;
  const sample = (x, y) => {
    const i = (y * width + x) * 4;
    r += px[i]; g += px[i + 1]; b += px[i + 2]; n++;
  };
  sample(2, 2);
  sample(width - 3, 2);
  sample(2, height - 3);
  sample(width - 3, height - 3);
  const cr = Math.round(r / n), cg = Math.round(g / n), cb = Math.round(b / n);

  let stripped = 0;
  for (let i = 0; i < px.length; i += 4) {
    const dr = px[i] - cr, dg = px[i + 1] - cg, db = px[i + 2] - cb;
    if (Math.abs(dr) <= TOLERANCE && Math.abs(dg) <= TOLERANCE && Math.abs(db) <= TOLERANCE) {
      const dist = Math.max(Math.abs(dr), Math.abs(dg), Math.abs(db));
      px[i + 3] = Math.round((dist / TOLERANCE) * 255);
      stripped++;
    }
  }

  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      if (px[i + 3] >= CROP_ALPHA) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const cw = maxX - minX + 1;
  const ch = maxY - minY + 1;
  const cropped = new PNG({ width: cw, height: ch });
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const si = ((minY + y) * width + (minX + x)) * 4;
      const di = (y * cw + x) * 4;
      cropped.data[di] = px[si];
      cropped.data[di + 1] = px[si + 1];
      cropped.data[di + 2] = px[si + 2];
      cropped.data[di + 3] = px[si + 3];
    }
  }

  writeFileSync(file, PNG.sync.write(cropped));
  console.log(`${file}: bg #${cr.toString(16).padStart(2,'0')}${cg.toString(16).padStart(2,'0')}${cb.toString(16).padStart(2,'0')} → alpha; ${width}x${height} → ${cw}x${ch} (${stripped} px)`);
}

for (const f of process.argv.slice(2)) strip(f);
