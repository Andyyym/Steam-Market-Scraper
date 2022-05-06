const puppeteer = require('puppeteer')
const fs = require("fs/promises");
const xlsx = require("xlsx")
const file = require("./API's/CSGOMarketSearch")


async function Start() {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://steamcommunity.com/market/");


    const names = await page.evaluate(() => {

        return Array.from(document.querySelectorAll("[class='market_listing_item_name']")).map(x => x.textContent)
    })
    const amount = await page.evaluate(() => {
       return Array.from(document.querySelectorAll("[class='market_listing_num_listings_qty']")).map(x => x.textContent)
    })
    const price = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("[class='sale_price']")).map(x => x.textContent);
    })



    await fs.writeFile("Links.txt", names.join("\r\n") + amount.join())



    await browser.close()
}
Start();
