import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import liff from '@line/liff';

function App() {
  const [qrCodeData, setQrCodeData] = useState('');
  const handleScan = () => {
    liff.scanCodeV2().then((result) => {
      setQrCodeData(result.value ?? '');
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleScan}>Scan QR Code</button>
        <p>{qrCodeData}</p>
      </header>
    </div>
  );
}

export default App;
