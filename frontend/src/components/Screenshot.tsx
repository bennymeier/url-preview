interface ScreenshotProps {
  imageSrc: string;
  url: string;
}
const Screenshot: React.FC<ScreenshotProps> = ({ imageSrc, url }) => {
  return (
    <div className="screenshot-container">
      <h1>Screenshot of website {url}</h1>
      <div className="bordered">
        <img
          className="responsive"
          src={`data:image/png;base64, ${imageSrc}`}
          alt={`Screenshot of ${url}`}
        />
      </div>
    </div>
  );
};

export default Screenshot;
