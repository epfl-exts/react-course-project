import React, { useContext, useEffect, useState, useReducer } from "react";
import Round from "./Round.js";

const GameContext = React.createContext({});

function roundsReducer(state, action) {
  const nextRound = state.order + 1;

  switch (action.type) {
    // Adds a point and moves to next round
    case "addPoint":
      const newTotal = state.points + 1;
      return {
        order: nextRound,
        points: newTotal,
        text: "Well done!"
      };
    // Moves to next round
    case "nextRound":
      return {
        order: nextRound,
        points: state.points,
        text: "Too slow..."
      };
    case "reset":
      return {
        order: 0,
        points: 0,
        text: "Let's get started."
      };
    default:
      return state;
  }
}

function Game() {
  const labels = require("./labels.json");
  const [round, roundDispatch] = useReducer(roundsReducer, {
    order: 7,
    points: 0,
    text: "Let's get started."
  });

  useEffect(() => {
    console.log(round);
  });

  return round.order < labels.length ? (
    <GameContext.Provider
      value={{
        round,
        label: labels[round.order],
        timeLimit: 5,
        addPoint: () => roundDispatch({ type: "addPoint" }),
        incrementRound: () => roundDispatch({ type: "nextRound" })
      }}
    >
      <div className="nes-container is-dark with-title">
        <h2 className="title">Doodle</h2>
        <Round />
      </div>
    </GameContext.Provider>
  ) : (
    <div className="nes-container is-dark with-title">
      <h2 className="title">Doodle</h2>
      <button
        className="nes-btn is-warning"
        onClick={() => roundDispatch({ type: "reset" })}
      >
        Play again.
      </button>
    </div>
  );
}

export default Game;
export { GameContext };
