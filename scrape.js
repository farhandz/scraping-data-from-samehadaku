const fs  = require('fs')
const puppeteer = require("puppeteer");


(async () => {
  try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://news.ycombinator.com/news?p=2");
      let data = await page.evaluate(() => {
        var titleNodeList = document.querySelectorAll(
          "a.storylink"
          );
          var ageList = document.querySelectorAll(`span.age`);
          let tool = document.querySelectorAll(".sitestr");
          let titleLinkArray = [];
          for(let i = 0; i < titleNodeList.length; i++) {
              titleLinkArray[i] = {
                title: titleNodeList[i].href,
                age: ageList[i].innerText,
                tools: tool[i]?.innerText
              }
        }
        return titleLinkArray
    });
        console.log(JSON.stringify(data ))
        fs.writeFile('./recipes.json', JSON.stringify(data), err => err ? console.log(err): null);
      await browser.close();
    } catch (error) {
        console.log(error)
        await browser.close();
  }
})();
