import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const App = () => {
  const [imageURL, setImageURL] = useState(
    'https://o.remove.bg/downloads/81840d75-a408-41dd-9ad7-e4f51602c9c4/squidward-removebg-preview.png'
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={imageURL} className="App-logo" alt="logo" />
      </header>
    </div>
  );
};

export default App;
