const puppeteer = require('puppeteer')
const fs = require("fs/promises");
const xlsx = require("xlsx")


async function Start(url, page) {

    await page.goto(url);

    const heading = await page.$eval(".product_main h1", h1 => h1.textContent);
    const quantity = await page.$eval('.instock.availability', quantity => quantity.innerText);
    const price = await page.$eval(".price_color", price => price.textContent);


    return {
        Name: heading,
        Quantity: quantity,
        Price: price
    }
}

async function GetLinks() {

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("http://books.toscrape.com/");

    const Links = await page.$$eval(".image_container a", al => al.map(a => a.href));

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
    xlsx.writeFile(wb, "Books.xlsx")


    await browser.close();

}

Main();