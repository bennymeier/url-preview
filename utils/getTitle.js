const getTitle = () => {
  const el =
    document.querySelector('meta[property="og:title"]') ||
    document.querySelector('meta[name="twitter:title"]') ||
    document.title ||
    document.querySelector(".post-title") ||
    document.querySelector('h1[class*="title" i] a') ||
    document.querySelector('h1[class*="title" i]');
  if (el) {
    return el.content ? el.content : el.innerText;
  }
  return undefined;
};

module.exports = getTitle;
