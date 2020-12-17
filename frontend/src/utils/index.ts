export const shortenizeUrl = (urlString: string) => {
  const url = new URL(urlString);
  return url.hostname;
};
