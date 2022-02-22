import React from 'react';
import './App.css';
import QRCodeScanner from './components/QRCodeScanner';

const App: React.VFC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <QRCodeScanner />
      </header>
    </div>
  );
};

export default App;
