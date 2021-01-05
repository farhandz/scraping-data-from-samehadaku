const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch();
    // open a new page
    var page = await browser.newPage();
    // enter url in page
    await page.goto(`https://samehadaku.vip/`);
    await page.waitForSelector(".post-show");
    var news = await page.evaluate(() => {
        const manis = document.querySelectorAll(".post-show ul li")
        var hai = document.querySelectorAll(".post-show ul li .thumb a");
        var data = []
        for(let i = 0; i < manis.length; i++) {
            data[i] = {
                link: hai[i].href,
                judul: hai[i].title
            }
        }
        return data
    });
    console.log(news);

    await browser.close();
    // Writing the news inside a json file
    fs.writeFile("Newotaku.json", JSON.stringify(news), function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
    console.log("Browser Closed");
  } catch (err) {
    // Catch and display errors
    console.log(err);
    await browser.close();
  }
})();
