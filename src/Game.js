import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { logs, gameLog } from "./gameLog";

export const Game = (props) => {
  const [materials, setMaterials] = useState(0);
  const [resources, setResources] = useState([0, 0, 0]);
  const handleMaterials = () => {
    const materialsInc = [0, 1, 1, 2, 2, 3];
    const materialsRand = Math.floor(materialsInc.length * Math.random());
    setMaterials((materials) => materials + materialsInc[materialsRand]);
    gameLog("materials", materialsInc[materialsRand]);
  };
  const handleResources = () => {
    const resInc = [0, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    const resRand = () => Math.floor(resInc.length * Math.random());
    const resAdd = [0, 0, 0].map((e) => resInc[resRand()]);
    setResources((resources) =>
      resources.map((resource, i) => (resource += resAdd[i]))
    );
    gameLog("resources", resAdd);
  };
  if (props.gameState)
    return (
      <>
        <div>
          <p>Game status: Started</p>
          <Button onClick={handleMaterials}>Harvest Materials</Button>
          <Button onClick={handleResources}>Gather Resources</Button>
          <p>Materials: {materials}</p>
          <p>
            Resources:{" "}
            {resources.map((e) => (
              <> {e} </>
            ))}
          </p>
        </div>
        <hr />
        <>
          {logs.map((e) => (
            <p>{e}</p>
          ))}
        </>
      </>
    );
  else return <p>Game status: Not Started</p>;
};
