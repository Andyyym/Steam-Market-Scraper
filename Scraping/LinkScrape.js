const puppeteer = require('puppeteer')
const fs = require("fs/promises");

async function Start() {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("http://books.toscrape.com/");

    const Links = await page.$$eval(".image_container a", al => al.map(a => a.href));

    await fs.writeFile("Links.txt", Links.join("\r\n"))

    await browser.close();
}

Start();