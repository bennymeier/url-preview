const getLogo = async (page) => {
  const image = await page.evaluate(() => {
    const logo =
      document.querySelector('meta[property="og:logo"]') ||
      document.querySelector('meta[name="twitter:image"]') ||
      document.querySelector('meta[itemprop="logo"]') ||
      document.querySelector('img[itemprop="logo"]');
    if (logo && logo.content) {
      return logo.content;
    } else if (logo && logo.src) {
      return logo.src;
    }
    const images = Array.from(document.getElementsByTagName("img"));
    if (images[0] && images[0].src) {
      return images[0].src;
    }
    return undefined;
  });
  return image;
};

module.exports = getLogo;