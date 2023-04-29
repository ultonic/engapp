import React, { useState, useEffect } from 'react';
import './App.css';
import InputComponent from './InputComponent';
import phrases from './phrases.json';

function App() {
  const [selectedMenu, setSelectedMenu] = useState('presentSimple');

  function handleMenuClick(event) {
    setSelectedMenu(event.target.value);
  }

  function renderSelectedMenu() {
    switch (selectedMenu) {
      case 'pastSimple':
        return <InputComponent phrases={phrases.pastSimple} title="Past Simple" />;
      case 'futureSimple':
        return <InputComponent phrases={phrases.futureSimple} title="Future Simple" />;
      default:
        return <InputComponent phrases={phrases.presentSimple} title="Present Simple" />;
    }
  }

  return (
    <div className="container">
      <div className="menu">
        <button value="presentSimple" onClick={handleMenuClick}>Present Simple</button>
        <button value="pastSimple" onClick={handleMenuClick}>Past Simple</button>
        <button value="futureSimple" onClick={handleMenuClick}>Future Simple</button>
      </div>
      <div className="input-container">
        {renderSelectedMenu()}
      </div>
    </div>
  );
}

export default App;
