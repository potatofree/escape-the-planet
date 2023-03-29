import React, { useState, useReducer } from "react";
import { Button } from "react-bootstrap";
import { logsReducer } from "./logsReducer";

export const Game = (props) => {
  const [materials, setMaterials] = useState(0);
  const [resources, setResources] = useState([0, 0, 0]);
  const [counter, setCounter] = useState(0);
  const [logs, dispatchLogs] = useReducer(logsReducer, []);
  const [exploring, setExploring] = useState(false);

  const counterInc = () => setCounter((counter) => counter + 1);
  const handleMaterials = () => {
    counterInc();
    const materialsInc = [0, 1, 1, 2, 2, 3];
    const materialsRand = Math.floor(materialsInc.length * Math.random());
    setMaterials((materials) => materials + materialsInc[materialsRand]);
    dispatchLogs({
      type: "materials",
      counter: counter,
      materials: materialsInc[materialsRand],
    });
  };
  const handleResources = () => {
    counterInc();
    const resInc = [0, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    const resRand = () => Math.floor(resInc.length * Math.random());
    const resAdd = [0, 0, 0].map((e) => resInc[resRand()]);
    setResources((resources) =>
      resources.map((resource, i) => (resource += resAdd[i]))
    );
    dispatchLogs({ type: "resources", counter: counter, resources: resAdd });
  };

  const handleStartExplore = () => {
    setExploring(true);
    counterInc();
    dispatchLogs({ type: "exploring start", counter: counter });
  };

  const handleStopExplore = () => {
    setExploring(false);
    counterInc();
    dispatchLogs({ type: "exploring stop", counter: counter });
  };
  if (props.gameState)
    return (
      <>
        <div>
          <p>Game status: Started</p>
          <p>Days: {counter}</p>
          <Button onClick={handleMaterials}>Harvest Materials</Button>
          <Button onClick={handleResources}>Gather Resources</Button>
          <Button onClick={handleStartExplore} disabled={exploring}>
            Explore the planet
          </Button>
          {exploring ? (
            <Button onClick={handleStopExplore}>Return to base</Button>
          ) : null}
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
