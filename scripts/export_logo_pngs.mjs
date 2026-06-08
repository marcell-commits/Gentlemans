import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "assets", "logo-rebuild");
const variants = ["gold", "black", "white"];
const widths = [4000, 2000];

for (const variant of variants) {
  const svgPath = path.join(outDir, `gentlemans-club-logo-${variant}.svg`);
  for (const width of widths) {
    const pngPath = path.join(
      outDir,
      `gentlemans-club-logo-${variant}-${width}.png`,
    );
    await sharp(svgPath)
      .resize({ width })
      .png({ compressionLevel: 9 })
      .toFile(pngPath);
    console.log(`Generated ${pngPath}`);
  }
}
