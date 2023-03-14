import React from 'react';

export const Game = (props) => {
  if (props.gameState)
    return <p>Game started!</p>;
  else
    return <p>Kak tyt xodit?</p>;
};
