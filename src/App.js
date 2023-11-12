import React, { useState, useEffect } from 'react';
import './App.css'; // Import a CSS file for styling (create a file named App.css)

const App = () => {
  const [list, setList] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [attempts, setAttempts] = useState(3);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  // Sample data in the database
  const listData = {
    title: 'Fruits',
    description: 'Arrange these fruits in alphabetical order',
    items: ['apple', 'banana', 'grape', 'kiwi', 'mango', 'orange', 'pear', 'watermelon'],
  };

  useEffect(() => {
    // Shuffle the array for a random order
    const shuffledList = shuffleArray([...listData.items]);
    setList(shuffledList);

    // Assign initial numbers 1 to 8 to userOrder
    setUserOrder([...Array(listData.items.length)].map((_, i) => i + 1));
  }, [listData.items.length]);

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handleInputChange = (index, value) => {
    // Update the selected number in the userOrder array
    const newUserOrder = [...userOrder];
    newUserOrder[index] = value;

    // Move the selected item to the correct position in the list
    const reorderedList = [...list];
    const selectedItem = reorderedList.splice(index, 1)[0];
    reorderedList.splice(value - 1, 0, selectedItem);

    // Update the userOrder array to match the new order
    setUserOrder([...Array(reorderedList.length)].map((_, i) => i + 1));

    setList(reorderedList);
  };

  const handleSubmit = () => {
    const isCorrectOrder = list.join(',') === listData.items.join(',');

    if (isCorrectOrder) {
      setMessage('Congratulations! You got the order right.');
      setGameOver(true);
    } else {
      setAttempts(attempts - 1);
      if (attempts === 0) {
        setMessage('Game over. Better luck next time!');
        setGameOver(true);
      } else {
        setMessage(`Incorrect order. ${attempts} attempts remaining.`);
      }
    }
  };

  return (
    <div className="tile-container">
      <div className="tile">
        <h1>{listData.title}</h1>
        <p>{listData.description}</p>
      </div>
      {!gameOver && (
        <>
          {list.map((item, index) => (
            <div key={index} className="tile">
              <div className="item-container">
                <div className="item-name">{item}</div>
                <select
                  value={userOrder[index] || ''}
                  onChange={(e) => handleInputChange(index, parseInt(e.target.value))}
                >
                  <option value="" disabled>
                    Select Number
                  </option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
        </>
      )}
      <p>{message}</p>
    </div>
  );
};

export default App;
