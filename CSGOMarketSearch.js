const puppeteer = require('puppeteer')
const fs = require("fs/promises");
const xlsx = require("xlsx")
const {SearchLink, MarketItem, ItemNameSteam, QuantitySteam, PriceSteam} = require("./Data.json")


async function Search() {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(SearchLink);

    await page.type("#findItemsSearchBox", MarketItem);
    await page.click("#findItemsSearchSubmit");

    const url = await page.evaluate(() => document.location.href);

    await browser.close()
    return url

}


async function GetItem(page) {
    const url = await Search();

    await page.goto(url);

    let heading = await page.$eval(ItemNameSteam, b => b.textContent);
    let quantity = await page.$eval(QuantitySteam, b => b.textContent);
    let price = await page.$eval(PriceSteam, b => b.textContent);

    return {
        Name: heading,
        Price: price,
        Quantity: quantity
    }

}

async function SendItem() {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const scrapedData = [];
    const data = await GetItem(page);
    scrapedData.push(data);


    console.log(scrapedData) 

    await browser.close();

}

SendItem()
