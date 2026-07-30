const fs = require('fs');
const path = require('path');

const CSS_DIR = path.join(__dirname, '../src/css');
const HTML_DIR = path.join(__dirname, '../src');

function updateCssFiles() {
  const files = fs.readdirSync(CSS_DIR).filter(f => f.endsWith('.css'));
  for (const file of files) {
    const filePath = path.join(CSS_DIR, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace URL paths
    content = content.replace(/url\(['"]?assets\/([^'"\)]+)\.(png|jpg|jpeg|JPG|webp)['"]?\)/g, 'url("/assets/images/$1.webp")');
    // For CSS masking paths
    content = content.replace(/mask-image:\s*url\(['"]?assets\/([^'"\)]+)\.(png|jpg|jpeg|JPG|webp)['"]?\)/g, 'mask-image: url("/assets/images/$1.webp")');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated CSS ${file}`);
  }
}

updateCssFiles();
