import React, { useState, useEffect } from 'react';
import './App.css';
import InputComponent from './InputComponent';
import phrases from './phrases.json';

function App() {
  const [selectedMenu, setSelectedMenu] = useState('presentSimple');

  function handleMenuClick(event) {
    setSelectedMenu(event.target.value);
    // Remove the "selected" class from all buttons
    const buttons = document.querySelectorAll('.menu button');
    buttons.forEach(button => button.classList.remove('selected'));
    // Add the "selected" class to the clicked button
    event.target.classList.add('selected');
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
      <button value="presentSimple" onClick={handleMenuClick} className={selectedMenu === 'presentSimple' ? 'selected' : ''}>Present Simple</button>
        <button value="pastSimple" onClick={handleMenuClick} className={selectedMenu === 'pastSimple' ? 'selected' : ''}>Past Simple</button>
        <button value="futureSimple" onClick={handleMenuClick} className={selectedMenu === 'futureSimple' ? 'selected' : ''}>Future Simple</button>
      </div>
      <div className="input-container">
        {renderSelectedMenu()}
      </div>
    </div>
  );
}

export default App;
