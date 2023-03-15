import React from 'react';

export const Game = (props) => {
  if (props.gameState)
    return <p>Game status: Started</p>;
  else
    return <p>Game status: Not Started</p>;
};
