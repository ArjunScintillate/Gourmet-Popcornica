const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '../src');

function updateHtmlFiles() {
  const htmlFiles = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.html')).map(f => path.join(SRC_DIR, f));
  const partialFiles = fs.readdirSync(path.join(SRC_DIR, 'partials')).filter(f => f.endsWith('.html')).map(f => path.join(SRC_DIR, 'partials', f));
  const allFiles = [...htmlFiles, ...partialFiles];
  
  for (const filePath of allFiles) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update CSS paths
    content = content.replace(/href="([a-zA-Z0-9_-]+\.css)"/g, 'href="/css/$1"');
    
    // Update JS paths (scripts at the bottom of the body typically)
    content = content.replace(/src="([a-zA-Z0-9_-]+\.js)"/g, 'src="/js/$1"');
    
    // Convert `<script src="/js/..."></script>` to module if it's our own script
    content = content.replace(/<script src="\/js\/(?!gsap|scrolltrigger|lenis)([a-zA-Z0-9_-]+\.js)"><\/script>/g, '<script type="module" src="/js/$1"></script>');
    
    // Update asset paths for images
    content = content.replace(/src="assets\/([^"]+)\.(png|jpg|jpeg|JPG|webp)"/g, 'src="/assets/images/$1.webp"');
    content = content.replace(/href="assets\/([^"]+)\.(png|jpg|jpeg|JPG|webp)"/g, 'href="/assets/images/$1.webp"');
    
    // Update asset paths for videos
    content = content.replace(/src="assets\/([^"]+)\.(mp4|webm)"/g, 'src="/assets/videos/$1.$2"');
    content = content.replace(/href="assets\/([^"]+)\.(mp4|webm)"/g, 'href="/assets/videos/$1.$2"');

    // Update asset paths for pdfs
    content = content.replace(/href="assets\/([^"]+)\.pdf"/g, 'href="/assets/documents/$1.pdf"');

    // Replace partials
    content = content.replace(/<div data-site-header><\/div>/g, '{{> navbar }}');
    content = content.replace(/<div data-site-footer><\/div>/g, '{{> footer }}');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

updateHtmlFiles();
