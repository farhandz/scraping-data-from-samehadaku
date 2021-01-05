const puppeteer = require("puppeteer");
const fs = require('fs');


(async () => {
  try {
    // open the headless browser
    var browser = await puppeteer.launch();
    // open a new page
    var page = await browser.newPage();
    // enter url in page
    await page.goto(`https://samehadaku.vip/`);
    await page.waitForSelector(".animepost");
    var news = await page.evaluate(() => {
        var ply = document.querySelectorAll(".animepost");
        var links = document.querySelectorAll('.animepost a')
        var img = document.querySelectorAll(".animepost img[class='anmsa']");
        var scores = document.querySelectorAll(".animepost  .score");
        var types = document.querySelectorAll(".animepost .type");
        var data = []
        for(let i = 0; i < ply.length; i++ ) {
            data[i] = {
                nama: img[i]?.src,
                link: links[i].href,
                title: img[i].title,
                score: scores[i].innerText,
                type: types[i].innerText
            }
        }
        return data
        
    });
    console.log(news)

    await browser.close();
    // Writing the news inside a json file
    fs.writeFile("otaku.json", JSON.stringify(news), function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
    console.log("Browser Closed");
  } catch (err) {
    // Catch and display errors
    console.log(err)
    await browser.close();
  }
})();
