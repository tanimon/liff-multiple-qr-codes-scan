import React from 'react';
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
