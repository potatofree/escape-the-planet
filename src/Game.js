import React, { useState, useReducer } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  materialsGatheringIncrement,
  resourcesGainingIncrement,
  exploringResourcesLimit,
  exploringCost,
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
  const resourcesUpdate = (cost) => {
    setResources((resources) => {
      let newResources = {};
      for (let resource in cost) {
        newResources[resource] = resources[resource] + cost[resource];
      }
      return { ...resources, ...newResources };
    });
  };
  const handleMaterialsButton = () => {
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
  const handleResourcesButton = () => {
    counterInc();
    const resInc = resourcesGainingIncrement;
    const resRand = () => resInc[Math.floor(resInc.length * Math.random())];
    const resAdd = { Air: resRand(), Food: resRand(), Energy: resRand() };
    resourcesUpdate(resAdd);
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
    resourcesUpdate(exploringCost.Walk);
    setExploringLogs((exploringLogs) => {
      const stepNumber = exploringLogs[0].stepNumber + 1;
      return [
        { stepNumber: stepNumber, step: "You went further" },
        ...exploringLogs,
      ];
    });
  };
  const handleExploringSearch = () => {
    resourcesUpdate(exploringCost.Search);
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
      <Container>
        <Row>
          <Col>
            <p>Game status: Started</p>
          </Col>
          <Col sm="6"></Col>
          <Col>
            <p>Days: {counter}</p>
          </Col>
        </Row>
        <Row>
          <Col sm="2">Materials: {materials}</Col>
          <Col sm="2">Air: {resources.Air}</Col>
          <Col sm="2">Food: {resources.Food}</Col>
          <Col sm="2">Energy: {resources.Energy}</Col>
        </Row>
        <Row>
          <Col sm="auto">
            <Button onClick={handleMaterialsButton} disabled={exploring}>
              Harvest Materials
            </Button>
          </Col>
          <Col sm="auto">
            <Button onClick={handleResourcesButton} disabled={exploring}>
              Gather Resources
            </Button>
          </Col>
          <Col sm="auto">
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
          </Col>
        </Row>

        <hr />
        <Row>
          <Col>
            {logs.map((e) => (
              <Row>
                <Col>
                  <b>{e.stepNumber}:</b>
                </Col>
                <Col>{e.step}</Col>
              </Row>
            ))}
          </Col>
          <Col className="exploring-section">
            {exploring ? (
              <>
                <div className="exploring-section-top">
                  <b>Exploration</b>
                  <Row>
                    <Col>
                      <Button
                        className="exploring-buttons"
                        onClick={handleExploringWalk}
                      >
                        Go ahead
                      </Button>
                      <Button
                        className="exploring-buttons"
                        onClick={handleExploringSearch}
                      >
                        Look around
                      </Button>
                      <Button
                        className="exploring-buttons"
                        onClick={handleStopExplore}
                        variant="dark"
                      >
                        Return to Base
                      </Button>
                    </Col>
                  </Row>
                </div>
                <div className="exploring-logs">
                  {exploringLogs.map((e) => (
                    <Row>
                      <Col sm="4">{e.stepNumber}:</Col>
                      <Col sm="4">{e.step}</Col>
                    </Row>
                  ))}
                </div>
              </>
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  else return <p>Game status: Not Started</p>;
};
