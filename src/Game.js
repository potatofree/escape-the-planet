import React, { useState, useReducer } from "react";
import { Button } from "react-bootstrap";
import {
  materialsGatheringIncrement,
  resourcesGainingIncrement,
  exploringResourcesLimit,
} from "./game_config";
import { logsReducer } from "./logsReducer";

export const Game = (props) => {
  const [materials, setMaterials] = useState(0);
  const [resources, setResources] = useState({ Air: 0, Food: 0, Energy: 0 });
  const [counter, setCounter] = useState(0);
  const [logs, dispatchLogs] = useReducer(logsReducer, []);
  const [exploring, setExploring] = useState(false);
  const [exploringLogs, setExploringLogs] = useState([]);

  const counterInc = () => setCounter((counter) => counter + 1);
  const handleMaterials = () => {
    counterInc();
    const materialsInc = materialsGatheringIncrement;
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
    const resInc = resourcesGainingIncrement;
    const resRand = () => resInc[Math.floor(resInc.length * Math.random())];
    const resAdd = { Air: resRand(), Food: resRand(), Energy: resRand() };
    setResources((resources) => {
      return {
        Air: resources.Air + resAdd.Air,
        Food: resources.Food + resAdd.Food,
        Energy: resources.Energy + resAdd.Energy,
      };
    });
    dispatchLogs({
      type: "resources",
      counter: counter,
      resources: resAdd,
    });
  };

  const handleStartExplore = () => {
    setExploring(true);
    setExploringLogs([{ stepNumber: 0, step: "Exploring began" }]);
    counterInc();
    dispatchLogs({ type: "exploring start", counter: counter });
  };

  const handleStopExplore = () => {
    setExploring(false);
    counterInc();
    dispatchLogs({ type: "exploring stop", counter: counter });
  };

  const exploringConditions = () => {
    const resLim = exploringResourcesLimit;
    let cond = true;
    for (let res in resLim) {
      cond = cond && resLim[res] <= resources[res];
    }
    console.log(cond);
    return cond;
  };

  const handleExploringWalk = () => {
    setExploringLogs((exploringLogs) => {
      const stepNumber = exploringLogs[0].stepNumber + 1;
      return [
        { stepNumber: stepNumber, step: "You went further" },
        ...exploringLogs,
      ];
    });
  };
  const handleExploringSearch = () => {
    setExploringLogs((exploringLogs) => {
      const stepNumber = exploringLogs[0].stepNumber + 1;
      return [
        { stepNumber: stepNumber, step: "You've looked around" },
        ...exploringLogs,
      ];
    });
  };

  if (props.gameState)
    return (
      <>
        <div>
          <p>Game status: Started</p>
          <p>Days: {counter}</p>
          <Button onClick={handleMaterials} disabled={exploring}>
            Harvest Materials
          </Button>
          <Button onClick={handleResources} disabled={exploring}>
            Gather Resources
          </Button>

          {exploring ? (
            <Button onClick={handleStopExplore}>Return to base</Button>
          ) : (
            <Button
              onClick={handleStartExplore}
              disabled={!exploringConditions()}
            >
              Explore the planet
            </Button>
          )}
          <p>Materials: {materials}</p>
          <p>
            Resources: Air:{resources.Air}, Food:{resources.Food}, Energy:
            {resources.Energy}
          </p>
        </div>
        <hr />
        {exploring ? (
          <>
            <div className="Exploring">Now the exploring began:</div>
            <Button onClick={handleExploringWalk}>Go ahead</Button>
            <Button onClick={handleExploringSearch}>Look around</Button>
            {exploringLogs.map((e) => (
              <p>
                {e.stepNumber}: {e.step}
              </p>
            ))}
          </>
        ) : (
          <>
            {logs.map((e) => (
              <p>{e}</p>
            ))}
          </>
        )}
      </>
    );
  else return <p>Game status: Not Started</p>;
};
