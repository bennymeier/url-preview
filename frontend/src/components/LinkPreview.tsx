import { useEffect, useState } from 'react';
import { shortenizeUrl } from '../utils';
import API from '../utils/API';

interface LinkPreviewData {
  title: string;
  description: string;
  url: string;
  image: string;
  shortenizedUrl: string;
}
interface LinkPreviewProps {
  url: string;
}
const LinkPreview: React.FC<LinkPreviewProps> = (props) => {
  const { url } = props;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<LinkPreviewData>({
    title: '',
    description: '',
    url: '',
    image: '',
    shortenizedUrl: '',
  });
  const [error, setError] = useState('');
  const { title, description, shortenizedUrl, image } = data;
  const getPreviewData = async () => {
    try {
      const res = await API.get(`/metainfo?url=${url}`);
      const data = res.data as LinkPreviewData;
      if (data) {
        console.log('data ', data);
        const shortUrl = shortenizeUrl(url);
        setData({ ...data, shortenizedUrl: shortUrl });
        setLoading(false);
      } else {
        setError(`Cannot get information from ${url}`);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getPreviewData();
  }, []);

  if (isLoading) {
    return <div className="loading">LOADING...</div>;
  }
  if (error) {
    return <div className="error">{error}</div>;
  }
  return (
    <>
      <div className="preview">
        <div className="left">
          <div className="image">
            <img src={image} alt="" />
          </div>
        </div>
        <div className="rigth">
          <div className="title">
            <h1>{title}</h1>
          </div>
          <div className="description">
            <p>{description}</p>
          </div>
          <div className="url">
            <a href={url} title={shortenizedUrl} rel="noopener noreferrer">
              {shortenizedUrl}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkPreview;
