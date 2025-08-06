import fs from 'fs';
import path from 'path';

export interface GalleryImage {
  id: number;
  src: string;
  thumbnailSrc: string;
  alt: string;
  filename: string;
  title: string;
}

export function getGalleryImages(): GalleryImage[] {
  const originalsDir = path.join(process.cwd(), 'public', 'gallery');

  if (!fs.existsSync(originalsDir)) return [];

  const files = fs.readdirSync(originalsDir);
  const validExt = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];

  const images = files.filter(f => validExt.includes(path.extname(f).toLowerCase()));

  return images.map((filename, i) => {
    const parsed = path.parse(filename);
    return {
      id: i + 1,
      src: `/gallery/${filename}`,
      thumbnailSrc: `/gallery-webp/${parsed.name}.webp`,
      alt: `Gallery image: ${parsed.name}`,
      filename,
      title: parsed.name.replace(/[-_]/g, ' '),
    };
  });
}