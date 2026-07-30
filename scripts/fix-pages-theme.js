const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../src/css/pages-theme.css');
let css = fs.readFileSync(cssPath, 'utf8').replace(/\r\n/g, '\n');

const targetStr = '  background: #0c1433;\n}';
const index = css.indexOf(targetStr);

if (index === -1) {
  console.error("Could not find target string");
  process.exit(1);
}

const pos = index + targetStr.length;
const before = css.substring(0, pos);
const after = css.substring(pos);

const insertBlock = `

/* Preloader */
body:not([data-page="home"]) .site-preloader {
  background: #0c1433;
}

body:not([data-page="home"]) .preloader-brand {
  color: var(--brand-maize);
}

body:not([data-page="home"]) .preloader-brand .type-brand {
  color: var(--brand-tertiary);
}

/* Header — seamless dark glass (matches homepage) */
body:not([data-page="home"]) .site-header {
  --nav-glass: rgba(12, 20, 51, 0.72);
  --nav-glass-strong: rgba(12, 20, 51, 0.94);
  --nav-link: rgba(198, 197, 207, 0.92);
  --nav-link-active: #f7eed8;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border: none;
}

body:not([data-page="home"]) .site-header.is-scrolled {
  background: linear-gradient(180deg, rgba(12, 20, 51, 0.94) 0%, rgba(12, 20, 51, 0.52) 72%, transparent 100%);
  border: none;
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(18px) saturate(1.25);
  -webkit-backdrop-filter: blur(18px) saturate(1.25);
}

body:not([data-page="home"]) .site-header.is-nav-open {
  background: rgba(8, 12, 32, 0.98);
  border: none;
}

body:not([data-page="home"]) .primary-nav__links {
  background: none;
  border: none;
  box-shadow: none;
}
`;

fs.writeFileSync(cssPath, before + insertBlock + after);
console.log("Successfully restored and updated pages-theme.css");
