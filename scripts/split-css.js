const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, '../src/css');
const globalCssPath = path.join(cssDir, 'global.css');
const pagesThemePath = path.join(cssDir, 'pages-theme.css');

let globalCss = fs.readFileSync(globalCssPath, 'utf8');
let imports = [];

// 1. Extract variables
const rootRegex = /:root\s*\{[\s\S]*?\n\}/;
const rootMatch = globalCss.match(rootRegex);
if (rootMatch) {
  fs.writeFileSync(path.join(cssDir, 'base/variables.css'), rootMatch[0]);
  globalCss = globalCss.replace(rootMatch[0], '');
  imports.push('@import "./base/variables.css";');
}

// 2. Extract reset
// Simple heuristic: extract from * { up to body { ... }
const resetStart = globalCss.indexOf('* {');
if (resetStart !== -1) {
  // Let's just find the end of the img block
  const imgEnd = globalCss.indexOf('height: auto;\n}', resetStart);
  if (imgEnd !== -1) {
    const resetBlock = globalCss.substring(resetStart, imgEnd + 15);
    fs.writeFileSync(path.join(cssDir, 'base/reset.css'), resetBlock);
    globalCss = globalCss.replace(resetBlock, '');
    imports.push('@import "./base/reset.css";');
  }
}

if (imports.length > 0) {
  globalCss = imports.join('\n') + '\n\n' + globalCss.trim();
  fs.writeFileSync(globalCssPath, globalCss);
  console.log('Extracted and modularized global.css');
}

// Extract pages-theme animations
let pagesTheme = fs.readFileSync(pagesThemePath, 'utf8');
const keyframeRegex = /@keyframes\s+brandShimmer\s*\{[\s\S]*?\n\}/;
const keyframeMatch = pagesTheme.match(keyframeRegex);
if (keyframeMatch) {
  fs.writeFileSync(path.join(cssDir, 'base/animations.css'), keyframeMatch[0]);
  pagesTheme = pagesTheme.replace(keyframeMatch[0], '');
  pagesTheme = '@import "./base/animations.css";\n\n' + pagesTheme.trim();
  fs.writeFileSync(pagesThemePath, pagesTheme);
  console.log('Extracted and modularized pages-theme.css');
}
