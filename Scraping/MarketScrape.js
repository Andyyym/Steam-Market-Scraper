const puppeteer = require('puppeteer')
const fs = require("fs/promises");
const xlsx = require("xlsx")


async function Start(url, page) {

    await page.goto(url);

    let heading = await page.$$eval('.market_listing_item_name', quantity => quantity.map(b => b.textContent));
    let quantity = await page.$$eval(".market_listing_num_listings_qty", price => price.map(c => c.textContent));
    let price = await page.$$eval('.sale_price', quantity => quantity.map(b => b.textContent));


    return {
        Name: heading,
        Price: price,
        Quantity: quantity
    }
}

async function GetLinks() {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://steamcommunity.com/market/");

    const Links = await page.$$eval(".market_listing_row_link", al => al.map(a => a.href));

    await browser.close();
    return Links;
}


async function Main() {

    const allLinks = await GetLinks();
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const scrapedData = [];

    for (let link of allLinks) {

        const data = await Start(link, page);
        const timeout = (Math.floor(Math.random() * 4 + 1) * 1000)
        await page.waitForTimeout(timeout);
        scrapedData.push(data);
    }

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(scrapedData);
    xlsx.utils.book_append_sheet(wb, ws);
    xlsx.writeFile(wb, "Market.xlsx")


    await browser.close();

}

Main();