import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { Game } from './Game';


const App = () => {
  const [gameState, setGameState] = useState(false);
  const handleStartButtonClick = () => {
    setGameState(!gameState)
}
  
  return (
    <div className="App">
      <header className="App-header">
        <Game gameState={gameState}/>
        <Button onClick={handleStartButtonClick} variant='primary'>{(gameState)?"Stop the Game":"I'm gonna try to escape this F Planet"}</Button>
        
      </header>
    </div>
  );
}

export default App;
