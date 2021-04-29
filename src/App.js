import './App.css';
import React, { useState } from "react";
import Game from "./Components/Game";

function App() {

  const [level, setLevel] = useState(null)
  const levelMatchCountMap = {
    'easy': 8,
    'hard': 12
  }

  return (
    <div className="App">
      <div className='title'><h1>Memory Game</h1></div>
      <div className='levels'>
        <p>Choose a level:</p>
        <div className='levels-buttons'>
          <button className={level === 'easy' ? 'active' : ''} onClick={() => setLevel('easy') }>Easy</button>
          <button className={level === 'hard' ? 'active' : ''} onClick={() => setLevel('hard') }>Hard</button>
        </div>
      </div>
      {/*{ !level ? null : <Game /> }*/}
      { level && <Game matchCount={levelMatchCountMap[level]}/> }
    </div>
  );
}

export default App;

