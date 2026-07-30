const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.join(__dirname, '../assets');
const DEST_IMAGES = path.join(__dirname, '../src/assets/images');
const DEST_VIDEOS = path.join(__dirname, '../src/assets/videos');
const DEST_DOCS = path.join(__dirname, '../src/assets/documents');

async function processAssets() {
  const files = fs.readdirSync(SOURCE_DIR);

  for (const file of files) {
    const srcPath = path.join(SOURCE_DIR, file);
    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) continue;

    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file, ext);
    
    // Ignore old unused files as identified in plan
    if (basename.includes('_old') || basename.includes('-old')) {
      console.log(`Skipping old asset: ${file}`);
      continue;
    }

    if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      const destName = `${basename}.webp`;
      const destPath = path.join(DEST_IMAGES, destName);
      
      console.log(`Processing image: ${file} -> ${destName}`);
      try {
        await sharp(srcPath)
          .resize({ width: 1920, withoutEnlargement: true }) // Prevent massive images
          .webp({ quality: 80 })
          .toFile(destPath);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    } else if (['.mp4', '.webm'].includes(ext)) {
      const destPath = path.join(DEST_VIDEOS, file);
      console.log(`Moving video: ${file}`);
      fs.copyFileSync(srcPath, destPath);
    } else if (['.pdf'].includes(ext)) {
      const destPath = path.join(DEST_DOCS, file);
      console.log(`Moving document: ${file}`);
      fs.copyFileSync(srcPath, destPath);
    } else {
      console.log(`Unknown file type, skipping: ${file}`);
    }
  }

  console.log('Asset processing complete.');
}

processAssets();
