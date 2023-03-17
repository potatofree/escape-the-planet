import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { logs, gameLog } from "./gameLog";

export const Game = (props) => {
  const [materials, setMaterials] = useState(0);
  const handleMaterials = () => {
    const materialsInc = [0, 1, 1, 2, 2, 3];
    const materialsRand = Math.floor(materialsInc.length * Math.random());
    setMaterials((materials) => materials + materialsInc[materialsRand]);
    gameLog("materials", materialsInc[materialsRand]);
  };
  if (props.gameState)
    return (
      <>
        <div>
          <p>Game status: Started</p>
          <Button onClick={handleMaterials}>Harvest Materials</Button>
          <p>Materials: {materials}</p>
        </div>
        <>
          {logs.map((e) => (
            <p>{e}</p>
          ))}
        </>
      </>
    );
  else return <p>Game status: Not Started</p>;
};
