const getAudio = () => {
  const audio =
    document.querySelector('meta[property="og:audio:secure_url"]') ||
    document.querySelector('meta[property="og:audio"]') ||
    document.querySelector(
      'meta[property="twitter:player:stream:content_type"]'
    );
  const audioSrc = audio ? audio.src : undefined;
  return audioSrc;
};

module.exports = getAudio;
