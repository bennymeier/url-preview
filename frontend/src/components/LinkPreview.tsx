import { useEffect, useState } from 'react';
import { getUrlObject } from '../utils';
import API from '../utils/API';
import Loader from './Loader';

interface LinkPreviewData {
  title: string;
  description: string;
  url: string;
  image: string;
  hostnameUrl: string;
  originUrl: string;
}
interface LinkPreviewProps {
  url: string;
}
const LinkPreview: React.FC<LinkPreviewProps> = (props) => {
  const { url } = props;
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<LinkPreviewData>({
    title: '',
    description: '',
    url: '',
    image: '',
    hostnameUrl: '',
    originUrl: '',
  });
  const {
    title,
    description,
    hostnameUrl,
    image,
    originUrl,
    url: originalUrl,
  } = data;
  const getPreviewData = async () => {
    try {
      const res = await API.get(`/metainfo?url=${url}`);
      const data = res.data as LinkPreviewData;
      if (data) {
        console.log('data ', data);
        const urlObj = getUrlObject(url);
        setData({
          ...data,
          hostnameUrl: urlObj.hostname,
          originUrl: urlObj.origin,
        });
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
    return <Loader />;
  }
  if (error) {
    return (
      <div className="container">
        <div className="error">
          <span className="status">Error: </span>
          {error}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="preview">
        <a
          className="no-link-style"
          href={originalUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div
            className="image"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </a>
        <div className="text">
          <div>
            <a
              className="title url"
              href={originalUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {title}
            </a>
          </div>
          <span className="description">{description}</span>
          <div>
            <a
              className="domain url"
              href={originUrl}
              title={hostnameUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {hostnameUrl}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkPreview;
