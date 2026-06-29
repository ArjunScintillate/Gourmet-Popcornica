const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  let browser;
  try {
    console.log('Launching browser...');
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const filePath = `file://${path.join(__dirname, 'media-kit.html')}`;
    console.log(`Loading ${filePath}...`);
    try {
      await page.goto(filePath, { waitUntil: 'domcontentloaded', timeout: 10000 });
      console.log('Page DOM content loaded.');
    } catch (gotoError) {
      console.log('Navigation timed out or failed, proceeding anyway:', gotoError.message);
    }

    console.log('Waiting for images to finish downloading...');
    try {
      await page.evaluate(async () => {
        const images = Array.from(document.querySelectorAll('img'));
        await Promise.all(images.map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.addEventListener('load', resolve);
            img.addEventListener('error', resolve);
          });
        }));
      });
      console.log('Images loaded.');
    } catch (imgError) {
      console.log('Failed to wait for images:', imgError.message);
    }

    console.log('Waiting for fonts to load...');
    try {
      await page.evaluateHandle('document.fonts.ready');
      console.log('Fonts loaded.');
    } catch (fontError) {
      console.log('Failed to wait for fonts:', fontError.message);
    }

    console.log('Generating PDF...');
    await page.pdf({
      path: 'assets/media-kit.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0',
        right: '0',
        bottom: '0',
        left: '0'
      }
    });
    console.log('PDF generated successfully as assets/media-kit.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
    }
  }
})();
