import React, { useState, useEffect } from 'react';

const PresentToBe = () => {
  const phrases = {
    "pastSimple": {
      "Positive": ["I was", "You were", "He was", "She was", "It was", "We were", "They were"],
      "Negative": ["I was not", "You were not", "He was not", "She was not", "It was not", "We were not", "They were not"],
      "Questions": ["Was I?", "Were you?", "Was he?", "Was she?", "Was it?", "Were we?", "Were they?"]
    }
  };

  const [uncoveredPhrases, setUncoveredPhrases] = useState([]);
  const [timer, setTimer] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (inputText.length > 0 && timer === null) {
      // Start the timer when the user enters the first character
      const intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000); // Update the timer every 1000ms (1 second)
      setTimer(intervalId);
    }
  }, [inputText, timer]);

  useEffect(() => {
    // Check if all phrases are revealed
    if (uncoveredPhrases.length === getTotalPhrasesCount(phrases)) {
      // Stop the timer if all phrases are revealed
      clearInterval(timer);
      setTimer(null);
    }
  }, [uncoveredPhrases, timer, phrases]);

  function handleInputChange(event) {
    const newText = event.target.value;
    setInputText(newText);

    const uncoveredPhrasesFound = Object.keys(phrases.pastSimple).reduce(
      (foundPhrases, type) => {
        const foundIndexes = phrases.pastSimple[type].reduce(
          (indexes, phrase, index) => {
            if (
              newText.toLowerCase().includes(phrase.toLowerCase()) &&
              !indexes.includes(index) &&
              !uncoveredPhrases.includes(`${type}_${index}`)
            ) {
              indexes.push(index);
            }
            return indexes;
          },
          []
        );

        if (foundIndexes.length > 0) {
          foundPhrases.push({ type, indexes: foundIndexes });
          setInputText("")
        }
        return foundPhrases;
      },
      []
    );

    const newUncoveredPhrases = uncoveredPhrasesFound.reduce((acc, item) => {
      const type = item.type;
      const indexes = item.indexes;
      const newPhrases = indexes.map((index) => `${type}_${index}`);
      return [...acc, ...newPhrases];
    }, []);

    setUncoveredPhrases([...uncoveredPhrases, ...newUncoveredPhrases]);
    event.target.value = '';
  }

  function isBlurred(phrase) {
    return uncoveredPhrases.includes(phrase) ? "" : "blurred";
  }

  function getTotalPhrasesCount(phrases) {
    return Object.keys(phrases.pastSimple).reduce((count, type) => {
      return count + phrases.pastSimple[type].length;
    }, 0);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  return (
    <div className="main">
      <h1>Past To Be</h1>
      <input ref={(input) => input && input.focus()} type="text" placeholder="Enter a phrase" className="main-input" onChange={handleInputChange} value={inputText} />
      <div className="layout">
        {Object.keys(phrases.pastSimple).map((type) => (
          <div key={type} className="column">
            <h2>{type}</h2>
            {phrases.pastSimple[type].map((phrase, index) => (
              <div key={index} className="rectangle">
                <span className={`phrase ${isBlurred(`${type}_${index}`)}`}>{phrase}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p>Timer: {formatTime(elapsedTime)}</p>
      {!timer && uncoveredPhrases.length === getTotalPhrasesCount(phrases) && (
        <p>All phrases are revealed!</p>
      )}
    </div>
  );
}

export default PresentToBe;
