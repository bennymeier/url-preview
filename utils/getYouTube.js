const THUMBAILS_RESOLUTIONS = [
  "maxresdefault.jpg",
  "sddefault.jpg",
  "hqdefault.jpg",
  "mqdefault.jpg",
  "default.jpg"
];

const getThumbnailUrl = id => {
  const urls = THUMBAILS_RESOLUTIONS.map(
    res => `https://img.youtube.com/vi/${id}/${res}`
  );
  return urls[0];
};

const getYouTube = () => {
  let youtube = {};
  const author =
    document.querySelector$("#owner-name") ||
    document.querySelector$("#channel-title") ||
    document.querySelector('[class*="user-info" i]');
  if (author && author.innerText) {
    youtube = { ...youtube, ...{ author: author.innerText } };
  }
  const description = document.querySelector("#description");
  if (description && description.innerText) {
    youtube = { ...youtube, ...{ description: description.innerText } };
  }
  return youtube;
};

module.exports = getYouTube;
