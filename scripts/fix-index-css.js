const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../src/css/index.css');
let css = fs.readFileSync(cssPath, 'utf8');

const targetStr = 'body[data-page="home"] .cluster-achievements .bk-ach-b {';
const index = css.indexOf(targetStr);

if (index === -1) {
  console.error("Could not find target string");
  process.exit(1);
}

// Find the closing brace of this rule block
let braceCount = 0;
let endPos = -1;
for (let i = index; i < css.length; i++) {
  if (css[i] === '{') {
    braceCount++;
  } else if (css[i] === '}') {
    braceCount--;
    if (braceCount === 0) {
      endPos = i + 1;
      break;
    }
  }
}

if (endPos === -1) {
  console.error("Could not find closing brace");
  process.exit(1);
}

const before = css.substring(0, endPos);
const after = `

@media (max-width: 768px) {
  body[data-page="home"] .home-press-achievements {
    grid-template-columns: 1fr;
    max-width: 560px;
  }
}

/* Leadership Interactive Grid */
.leadership-interactive-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: clamp(32px, 4vw, 64px);
  margin-top: clamp(40px, 6vw, 80px);
  margin-bottom: 80px;
}

.leadership-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.leader-tab {
  background: var(--bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s var(--ease-out);
  box-shadow: var(--shadow-card);
}

.leader-tab:hover {
  transform: translateX(4px);
  border-color: var(--gold-warm);
  box-shadow: 0 10px 20px rgba(12, 20, 51, 0.08);
}

.leader-tab.active {
  background: var(--surface);
  border-color: var(--gold);
  box-shadow: 0 15px 30px rgba(12, 20, 51, 0.12);
  transform: translateX(8px);
}

.leader-tab-img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid transparent;
  flex-shrink: 0;
  transition: border-color 0.3s ease;
}

.leader-tab.active .leader-tab-img {
  border-color: var(--gold);
}

.leader-tab-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.leader-tab-info {
  display: flex;
  flex-direction: column;
}

.leader-tab-name {
  font-family: var(--font-serif-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-base);
  margin-bottom: 4px;
}

.leader-tab-role {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--gold);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.leadership-content-stage {
  position: relative;
  min-height: 400px;
}

.leader-pane {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.5s var(--ease-out);
}

.leader-pane.active {
  position: relative;
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
  transition-delay: 0.1s;
}

@media (max-width: 991px) {
  .leadership-interactive-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .leader-tab:hover {
    transform: translateY(-4px);
  }
  
  .leader-tab.active {
    transform: translateY(-4px);
  }
}

body[data-page="home"] .hero {
  background-image: url('/assets/images/hero-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
`;

fs.writeFileSync(cssPath, before + after);
console.log("Successfully fixed index.css end block");
