const puppeteer = require('puppeteer')
const fs = require("fs/promises")
const { path } = require('express/lib/application');
const { url } = require('inspector');


async function Start(url, page) {
    //let url = "https://steamcommunity.com/market/search?appid=730"

    await page.goto(url);

        //let amount = document.querySelector('span[class="normal_price"]').innerText
        const price = page.$eval('div.market_listing_price_listings_block > div.market_listing_right_cell.market_listing_their_price > span.market_table_value.normal_price > span.normal_price', price => price.innerText);


        return{
            price: price
        }

    //await browser.close();
}

async function Main(){

    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const data = await Start("https://steamcommunity.com/market/search?appid=730",page);
    console.log(data);
}

Main();



/*
async function start() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto("https://steamcommunity.com/market/search/render/?query=&start=0&count=100&search_descriptions=0&sort_column=popular&sort_dir=desc&appid=730")
    //await page.screenshot({path: "image.png"})

    const names = await page.evaluate(() => {

        return Array.from(document.querySelectorAll("")).map(x => x.textContent)
        
    })
    await fs.writeFile("names.txt",names.join("\r\n"))

    //await page.click("#clickme")
    //const clickedData = await page.$eval("#data", el => el.textContent)
    //console.log(clickedData)

    await browser.close()
}


start()


/*app.fetch(url).then(function (response) {
    return response.json();

}).then(function (obj) {
    console.log(obj)
})*/



//app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))