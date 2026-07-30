const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  
  content = content.replace(/â€”/g, '—');
  content = content.replace(/â€™/g, "'");
  content = content.replace(/â€œ/g, '"');
  content = content.replace(/â€ /g, '"');
  content = content.replace(/â€/g, '"');
  content = content.replace(/â‚¹/g, '₹');
  content = content.replace(/â€“/g, '–');
  content = content.replace(/Ã¢â‚¬â€/g, '—');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed:', filePath);
  }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.html')) {
      fixFile(fullPath);
    }
  }
}

processDir(path.join(__dirname, 'src'));
console.log('Done');
