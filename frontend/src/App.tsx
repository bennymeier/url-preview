import React, { FormEvent, useState } from 'react';
import './App.css';
import LinkPreview from './components/LinkPreview';

type InputEvent = React.ChangeEvent<HTMLInputElement>;

const App = () => {
  const [input, setInput] = useState('');
  const [showPreview, setPreview] = useState(false);
  const handleChange = (event: InputEvent) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (showPreview) {
      setPreview(false);
      setTimeout(() => setPreview(true), 1500);
    } else {
      setPreview(true);
    }
  };

  return (
    <main>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="url-group">
            <input
              placeholder="https://..."
              type="url"
              onChange={handleChange}
              autoFocus
              required
            />
            <button type="submit">Preview</button>
          </div>
        </form>
      </div>
      {showPreview && <LinkPreview url={input} />}
    </main>
  );
};

export default App;
