const puppeteer = require('puppeteer')
const prompt = require('prompt-sync')();

async function Start() {
    const name = prompt('What is your item name? ');
    console.log(`Searching for: ${name}`);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://steamcommunity.com/market/");

    await page.type("#findItemsSearchBox", name);
    await page.click("#findItemsSearchSubmit");

    await page.waitForTimeout(5000)

    const data = await page.evaluate(() => {

        let heading = document.querySelector('[class="market_listing_item_name"]').innerText
        let price = document.querySelector('[class="sale_price"]').innerText
        let quantity = document.querySelector('[class="market_listing_num_listings_qty"]').innerText

        return {
            Name: heading,
            Price: price,
            Quantity: quantity
        }
    })
    console.log(data)

    await browser.close();
}
Start();
