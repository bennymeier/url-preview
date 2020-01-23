const getAuthor = () => {
  const author =
    document.querySelector('meta[name="author"]') ||
    document.querySelector('meta[property="author"]') ||
    document.querySelector('meta[property="article:author"]') ||
    document.querySelector('[itemprop*="author" i] [itemprop="name"]') ||
    document.querySelector('[itemprop*="author" i]') ||
    document.querySelector('[rel="author"]') ||
    document.querySelector('a[class*="author" i]') ||
    document.querySelector('[class*="author" i] a') ||
    document.querySelector('a[href*="/author/" i]') ||
    document.querySelector('a[class*="screenname" i]') ||
    document.querySelector('[class*="author" i]') ||
    document.querySelector('[class*="byline" i]');
  if (author && author.content) {
    return author.content;
  } else if (author && author.innerText) {
    return author.innerText;
  }
  return undefined;
};

module.exports = getAuthor;
