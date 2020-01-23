// TODO: check if url is valid amazon url
const getAmazon = () => {
  const author =
    document.querySelector(".contributorNameID") ||
    document.querySelector("#bylineInfo") ||
    "#brand";
  const authorText = author ? author.innerText : undefined;

  const title =
    document.querySelector("#productTitle") ||
    document.querySelector("#btAsinTitle") ||
    document.querySelector("h1.a-size-large") ||
    document.querySelector("#item_name");
  const titleText = title ? title.innerText : undefined;

  const image = document.querySelector(".a-dynamic-image");
  const imageSrc = image ? image.getAttribute("data-old-hires") : image.src;
  return {
    author: authorText,
    title: titleText,
    image: imageSrc
  };
};

module.exports = getAmazon;
