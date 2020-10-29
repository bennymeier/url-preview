const getDescription = async (page) => {
  const description = await page.evaluate(() => {
    const el =
      document.querySelector('meta[property="og:description"]') ||
      document.querySelector('meta[name="twitter:description"]') ||
      document.querySelector('meta[name="description"]') ||
      document.querySelector('meta[itemprop="description"]');
    if (el && el.content) {
      return el.content;
    }
    return null;
  });
  return description;
};

module.exports = getDescription;
