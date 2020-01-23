const getUrl = () => {
  const url =
    document.querySelector('meta[property="og:url"]') ||
    document.querySelector('meta[name="twitter:url"]') ||
    document.querySelector('link[rel="canonical"]') ||
    'link[rel="alternate"][hreflang="x-default"]';
  if (url && url.content) {
    return url.content;
  } else if (url && url.href) {
    return url.href;
  }
  return undefined;
};

module.exports = getUrl;
