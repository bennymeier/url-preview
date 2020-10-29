const getDomain = async (page, url) => {
  const domain = await page.evaluate(() => {
    const elements =
      document.querySelector('meta[property="og:url"]') ||
      document.querySelector('meta[name="twitter:url"]') ||
      document.querySelector('link[rel="canonical"]') ||
      'link[rel="alternate"][hreflang="x-default"]';
    if (elements && elements.content) {
      return elements.content;
    } else if (elements && elements.href) {
      return elements.href;
    }
  });

  if (domain) {
    return domain;
  } else {
    const uri = new URL(url);
    return uri.hostname;
  }
};

module.exports = getDomain;
