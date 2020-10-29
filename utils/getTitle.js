const getTitle = async (page) => {
  const title = await page.evaluate(() => {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && ogTitle.content.length > 0) {
      return ogTitle.content;
    }
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle && twitterTitle.content.length > 0) {
      return twitterTitle.content;
    }
    const docTitle = document.title;
    if (docTitle && docTitle.length > 0) {
      return docTitle;
    }
    const postTitle = document.querySelector(".post-title");
    if (postTitle && postTitle.innerText.length > 0) {
      return postTitle;
    }
    const h1Title = document.querySelector('h1[class*="title" i] a');
    if (h1Title && h1Title.innerText.length > 0) {
      return h1Title;
    }
    const h1 = document.querySelector("h1").innerHTML;
    if (h1 && h1.length > 0) {
      return h1;
    }
    const h2 = document.querySelector("h1").innerHTML;
    if (h2 && h2.length > 0) {
      return h2;
    }
    return null;
  });
  return title;
};

module.exports = getTitle;
