const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const {
  getDescription,
  getTitle,
  getAuthor,
  getLogo,
  getUrl
} = require("./utils");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));
app.use(express.static("public"));

app.post("/metainfo", async (req, res) => {
  const { url: resUrl } = req.body;
  const browser = await puppeteer.launch({
    headless: true,
    timeout: 0
  });
  const page = await browser.newPage();
  await page.goto(resUrl);
  const title = await page.evaluate(getTitle);
  const description = await page.evaluate(getDescription);
  const author = await page.evaluate(getAuthor);
  const logo = await page.evaluate(getLogo);
  const url = await page.evaluate(getUrl);
  const metadata = {
    title,
    description,
    author,
    logo,
    url
  };
  console.log(metadata);
  res.send(metadata);
});
/* 
    author: results.author || null,
        date: results.ogPublishedTime || null,
        description: results.ogDescription || results.description || null,
        image: results.ogImage || results.image || results.images[0] || null,
        publisher: results.ogSiteName || results.publisher || null,
        title: results.ogTitle || results.title || null,
        url: results.ogUrl || results.url || null
*/
