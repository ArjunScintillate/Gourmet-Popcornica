const fs = require('fs');

let raw = fs.readFileSync('src/js/index.js');
let decoded = '';

// Check if UTF-16 LE BOM (FF FE)
if (raw[0] === 0xFF && raw[1] === 0xFE) {
    decoded = raw.toString('utf16le');
} else {
    decoded = raw.toString('utf8');
}

// Remove the import statement
decoded = decoded.replace(/import homeVideoUrl from ['"]\.\.\/assets\/videos\/home-video\.mp4['"];\r?\n?/, '');

// Replace the video tag
decoded = decoded.replace(/<video src="\$\{homeVideoUrl\}"/g, '<video src="/assets/videos/home-video.mp4"');

// Ensure no BOM is written
if (decoded.charCodeAt(0) === 0xFEFF) {
    decoded = decoded.substring(1);
}

fs.writeFileSync('src/js/index.js', decoded, 'utf8');
console.log('Successfully decoded and saved index.js');
