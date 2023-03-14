import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';


const App = () => {
  const [gameState, setGameState] = useState(false);
  const handleStartButtonClick = () => {
    setGameState(!gameState)
}
  
  return (
    <div className="App">
      <header className="App-header">
        {(gameState)?<p>Kak tyt xodit?</p>:<p>Here you go</p>}
        <Button onClick={handleStartButtonClick} variant='primary'>{(gameState)?"Stop the Game":"I'm gonna try to escape this F Planet"}</Button>
        
      </header>
    </div>
  );
}


export default App;
