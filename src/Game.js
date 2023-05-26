import React, { useState, useReducer, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import {
  materialsGatheringIncrement,
  resourcesGainingIncrement,
  exploringResourcesLimit,
  exploringCost,
  logPage,
  initialState,
} from "./game_config";
import { logsReducer } from "./logsReducer";

export const Game = (props) => {
  const [materials, setMaterials] = useState(initialState.materials);
  const [resources, setResources] = useState(initialState.resources);
  const [counter, setCounter] = useState(initialState.counter);
  const [logs, dispatchLogs] = useReducer(logsReducer, []);
  const [exploring, setExploring] = useState(false);
  const [exploringLogs, setExploringLogs] = useState([]);
  const [logPages, setLogPages] = useState(initialState.logPages);
  const [showAlert, setShowAlert] = useState(false);

  const counterInc = () => setCounter((counter) => counter + 1);

  const checkCosts = (available, cost) => {
    for (let res in cost) {
      if (Math.abs(cost[res]) > available[res]) return false;
    }
    return true;
  };

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
    return cond;
  };

  const handleExploringWalk = () => {
    if (checkCosts(resources, exploringCost.Walk)) {
      setShowAlert(false);
      resourcesUpdate(exploringCost.Walk);
      setExploringLogs((exploringLogs) => {
        const stepNumber = exploringLogs[0].stepNumber + 1;
        return [
          { stepNumber: stepNumber, step: "You went further" },
          ...exploringLogs,
        ];
      });
    } else {
      setShowAlert(true);
      return null;
    }
  };
  const handleExploringSearch = () => {
    if (checkCosts(resources, exploringCost.Search)) {
      resourcesUpdate(exploringCost.Search);
      setExploringLogs((exploringLogs) => {
        const stepNumber = exploringLogs[0].stepNumber + 1;
        return [
          { stepNumber: stepNumber, step: "You've looked around" },
          ...exploringLogs,
        ];
      });
    } else {
      setShowAlert(true);
      return null;
    }
  };
  const showMoreLogs = () => {
    setLogPages((pages) => pages + 1);
  };
  // reset Long logs
  useEffect(() => {
    setLogPages(1);
  }, [counter]);

  const showLogs = (pages) => {
    const pageSize = logPage * pages;
    const showMore =
      pageSize >= logs.length ? null : (
        <Card.Link onClick={showMoreLogs}>Show More</Card.Link>
      );
    let shownLogs = logs.slice(0, pageSize).map((e) => {
      return (
        <Row>
          <Col>
            <b>{e.stepNumber}:</b>
          </Col>
          <Col>{e.step}</Col>
        </Row>
      );
    });
    return [...shownLogs, showMore];
  };

  if (props.gameState === "started")
    return (
      <>
        <Navbar sticky="top" bg="light">
          <Container>
            <Navbar.Text>Materials: {materials}</Navbar.Text>
            <Navbar.Text>Air: {resources.Air}</Navbar.Text>
            <Navbar.Text>Food: {resources.Food}</Navbar.Text>
            <Navbar.Text>Energy: {resources.Energy}</Navbar.Text>
            <Navbar.Toggle />
            <Nav.Item>
              Days: <b>{counter}</b>
            </Nav.Item>
          </Container>
        </Navbar>
        <Container>
          <Navbar bg="dark">
            <Container>
              <Col sm="2">
                <Button onClick={handleMaterialsButton} disabled={exploring}>
                  Harvest Materials
                </Button>
              </Col>
              <Col sm="2">
                <Button onClick={handleResourcesButton} disabled={exploring}>
                  Gather Resources
                </Button>
              </Col>
              <Col sm="2">
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
            </Container>
          </Navbar>
          <Container>
            <Row>
              <Col>
                <Card>
                  <Col>{showLogs(logPages)}</Col>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Col className="exploring-section">
                    {exploring ? (
                      <>
                        <Card.Header as="h5">Exploration</Card.Header>
                        {showAlert ? (
                          <Alert variant="danger">
                            You have not enough resources
                          </Alert>
                        ) : null}
                        <Card.Body>
                          <div className="exploring-logs">
                            {exploringLogs.map((e) => (
                              <Row>
                                <Col sm="4">{e.stepNumber}:</Col>
                                <Col sm="4">{e.step}</Col>
                              </Row>
                            ))}
                          </div>

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
                        </Card.Body>
                      </>
                    ) : null}
                  </Col>
                </Card>
              </Col>
            </Row>
          </Container>
        </Container>
      </>
    );
  else if (props.gameState === "finished") {
    return (
      <>
        <h4>Here should be last game stats</h4>
      </>
    );
  } else {
    return null;
  }
};
