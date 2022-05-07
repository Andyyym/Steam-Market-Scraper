const puppeteer = require('puppeteer')
//const fs = require("fs/promises");

let ctrlKey = process.platform === "darwin" ? "Meta" : "Control"

async function Start() {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("http://books.toscrape.com/");
    await page.keyboard.down(ctrlKey)
    await page.click(".product_pod a")
    await page.keyboard.up(ctrlKey)

    let tabs = await browser.pages();
    let latestTab = tabs[tabs.length-1];
    await latestTab.bringToFront();

}

Start();