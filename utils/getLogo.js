const getLogo = () => {
  const logo =
    document.querySelector('meta[property="og:logo"]') ||
    document.querySelector('meta[itemprop="logo"]') ||
    document.querySelector('img[itemprop="logo"]');
  if (logo && logo.content) {
    return logo.content;
  } else if (logo && logo.src) {
    return logo.src;
  }
  return undefined;
};

module.exports = getLogo;
