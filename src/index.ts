import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import puppeteer from 'puppeteer'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})


async function screenshot() {
  const browser = await puppeteer.launch({
      channel: "chrome",
      headless: true,
      args: ["--lang=ja"],
  });
  console.log("Browser launched");
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  const uri = "https://example.com/";
  await page.goto(uri, { waitUntil: "networkidle0" });

  console.log("Page loaded");
  await page.evaluate(() => {
      window.scrollTo(0, 0);
  });

  await page.screenshot({ path: `./${new Date().getTime().toString()}.png`});
  console.log("Screenshot saved");
  await browser.close();
  console.log("Browser closed");
}
