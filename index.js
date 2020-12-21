const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const {
  getDescription,
  getImage,
  getTitle,
  getDomain
} = require("./utils");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get("/metainfo", async (req, res) => {
  const { url: resUrl } = req.query;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(resUrl);

  const description = await getDescription(page);
  const title = await getTitle(page);
  const image = await getImage(page);
  const url = await getDomain(page, resUrl);

  await browser.close();

  const metadata = {
    title,
    description,
    url,
    image
  };
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
