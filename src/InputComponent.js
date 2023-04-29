import React, { useState, useEffect } from 'react';
import './InputComponent.css';

function InputComponent(props) {
  const [counter, setCounter] = useState(props.phrases.length);
  const [uncoveredPhrases, setUncoveredPhrases] = useState([]);
  const [showCongratulation, setShowCongratulation] = useState(false);

  useEffect(() => {
    setCounter(props.phrases.length);
    setUncoveredPhrases([]);
    setShowCongratulation(false);
  }, [props.phrases]);

  function handleInputChange(event) {
    const inputText = event.target.value;
    const uncoveredIndex = props.phrases.findIndex(phrase =>
      inputText.toLowerCase().includes(phrase.toLowerCase()) && !uncoveredPhrases.includes(phrase)
    );
    if (uncoveredIndex !== -1) {
      setCounter(prevCounter => prevCounter - 1);
      setUncoveredPhrases(prevUncoveredPhrases => [...prevUncoveredPhrases, props.phrases[uncoveredIndex]]);
      event.target.value = '';
    }
    if (counter === 1) {
      setShowCongratulation(true);
    }
  }
  

  return (
    <div className="input-component">
      <h1>{props.title}</h1>
      <p>Enter the missing grammar chunk:</p>
      <input type="text" onChange={handleInputChange} />
      <p>Uncovered phrases:</p>
      <ul>
        {uncoveredPhrases.map((phrase, index) => (
          <li key={index}>{phrase}</li>
        ))}
      </ul>
      {showCongratulation && <p className="congratulation">Congratulations, you uncovered all the phrases!</p>}
      <p>{counter} phrases left to uncover.</p>
    </div>
  );
}

export default InputComponent;
