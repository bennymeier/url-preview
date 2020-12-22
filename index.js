const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const NodeCache = require('node-cache');
// Cache 5 days, after that time delete entries
const cache = new NodeCache({ stdTTL: 432000 });
const { getDescription, getImage, getTitle, getDomain } = require('./utils');
const app = express();
const port = process.env.PORT || 4000;

app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/metainfo', async (req, res) => {
  try {
    const { url: resUrl } = req.query;
    // Check for already existing cache entry
    const hasCached = cache.has(resUrl);
    if (hasCached) {
      const getEntry = cache.get(resUrl);
      return res.send(getEntry);
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(resUrl);

    // Make screenshot of website
    const screenshot = await page.screenshot({ encoding: 'base64' });

    const description = await getDescription(page);
    const title = await getTitle(page);
    const image = await getImage(page);
    const url = await getDomain(page, resUrl);

    // Close headless chrome
    await browser.close();

    const metadata = {
      title,
      description,
      url,
      image,
      screenshot,
    };

    // Insert entry in cache if not already cached
    if (!hasCached) {
      cache.set(resUrl, metadata);
    }

    // Send response
    return res.send(metadata);
  } catch (err) {
    return res.status(404).send(err);
  }
});
