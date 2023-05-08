import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";
import { Game } from "./Game";
import { Container } from "react-bootstrap";

const App = () => {
  const [gameState, setGameState] = useState(false);
  const handleStartButtonClick = () => {
    setGameState(!gameState);
  };

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav>
            <Navbar.Brand>The F Planet</Navbar.Brand>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#menu">Menu</Nav.Link>
          </Nav>
          <Button
            className="Start-Game-button"
            onClick={handleStartButtonClick}
            variant={gameState ? "danger" : "primary"}
          >
            {gameState ? "Stop the Game" : "Start the Game"}
          </Button>
        </Container>
      </Navbar>

      <body>
        <Game gameState={gameState} />
        {gameState ? null : <p>What about game?</p>}
      </body>
    </div>
  );
};

export default App;
