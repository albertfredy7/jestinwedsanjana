import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const sourceDir = path.join(process.cwd(), 'public/gallery');
const outputDir = path.join(process.cwd(), 'public/gallery-webp');
const maxSize = 800; // Max dimension for webp

async function convertToWebP() {
  const files = await fs.readdir(sourceDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const inputPath = path.join(sourceDir, file);
    const outputFile = path.join(outputDir, `${path.parse(file).name}.webp`);

    await fs.mkdir(outputDir, { recursive: true });

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    const shouldResize = metadata.width! > maxSize || metadata.height! > maxSize;

    await image
      .resize({
        width: shouldResize ? maxSize : undefined,
        height: shouldResize ? maxSize : undefined,
        fit: 'inside',
      })
      .webp({
        quality: 60,
        smartSubsample: true,
        nearLossless: true,
        effort: 6,
      })
      .toFile(outputFile);

    const { size } = await fs.stat(outputFile);
    console.log(`✔ ${file} → ${(size / 1024).toFixed(1)} KB`);
  }
}

convertToWebP();