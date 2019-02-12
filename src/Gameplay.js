import React, { useContext, useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import Canvas from "./Canvas.js";

export default function Gameplay() {
  const labels = require("./labels.json");
  const [currentRound, setRound] = useReducer(roundsReducer, 0);

  const checkPrediction = prediction => {
    const predictionValue = prediction[0];
    return predictionValue === currentRound
      ? useConfirmation(predictionValue, () => setRound("increment"))
      : useWrongPrediction(predictionValue);
  };

  let ref = React.createRef();

  useEffect(() => {
    console.log(labels[currentRound]);
  });

  return (
    <div className="nes-container is-dark with-title">
      <h2 className="title">Draw a {labels[currentRound]}</h2>
      <Canvas ref={ref} checkPrediction={checkPrediction} />
      <button
        className="nes-btn is-warning"
        onClick={() => {
          const canvas = ref.current;
          const ctx = canvas.getContext("2d");
          ctx.fillRect(0, 0, canvas.height, canvas.width);
        }}
        style={{ display: "block" }}
      >
        Clear canvas
      </button>
      <Link to="/highscore" className="nes-btn">
        Hall of Fame
      </Link>
    </div>
  );
}

function roundsReducer(state, action) {
  switch (action.type) {
    case "increment":
      const nextRound = state + 1;
      console.log(nextRound);
      return { round: nextRound };
    case "reset":
      return { round: 0 };
    default:
      return { round: state };
  }
}

function useConfirmation(prediction, incrementRound) {
  console.log(`Correct: ${prediction}`);
  console.log(incrementRound);
  return setTimeout(function() {
    incrementRound();
  }, 3000);
}

function useWrongPrediction(prediction) {
  console.log(`Wrong! ${prediction}`);
  // <div
  //   className="nes-balloon from-left"
  //   style={{
  //     color: "black",
  //     position: "absolute",
  //     top: "50px",
  //     right: "50px"
  //   }}
  // >
  //   <p>{labels[currentRound]}</p>
  // </div>;
}
