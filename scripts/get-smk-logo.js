import puppeteer from 'puppeteer';

async function fetchLogo() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  console.log('Navigating to smkn2pamekasan.sch.id...');
  await page.goto('https://www.smkn2pamekasan.sch.id', { waitUntil: 'domcontentloaded' });
  
  console.log('Waiting for challenge verification redirect (8s)...');
  await new Promise(r => setTimeout(r, 8000));
  
  // Tunggu elemen muncul
  await page.waitForSelector('.top-header img', { timeout: 15000 }).catch(() => null);
  
  const imgElement = await page.$('.top-header img');
  if (imgElement) {
    await imgElement.screenshot({ path: 'assets/img/logo-smk.png', omitBackground: true });
    console.log('✓ Successfully saved assets/img/logo-smk.png');
  } else {
    console.log('Still not found, page title:', await page.title());
  }
  await browser.close();
}

fetchLogo().catch(console.error);
