import React, { useContext, useEffect, useState, useReducer } from "react";
import { Link } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import { getPrediction } from "./helpers.js";
import Canvas from "./Canvas.js";

// const checkPrediction = prediction =>
//   prediction === currentRound ? true : false;

export default function Gameplay() {
  const model = tf.loadModel("./model/model.json");

  const labels = require("./labels.json");
  const [currentRound, setRound] = useReducer(roundsReducer, 4);

  let ref = React.createRef();

  useEffect(() => {
    console.log(`Current round: ${labels[currentRound]}`);
  });

  return (
    <div className="nes-container is-dark with-title">
      <h2 className="title">Draw a {labels[currentRound]}</h2>
      <div
        className="nes-container is-rounded"
        style={{ display: "inline-block" }}
      >
        <Canvas
          forwardRef={ref}
          onDraw={e =>
            getPrediction(e.target, model).then(prediction => {
              parseInt(prediction) === currentRound
                ? console.log(true) // do something positive
                : console.log(false); // do something negative
            })
          }
          height={300}
          width={300}
        />
      </div>
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
      return { round: nextRound };
    case "reset":
      return { round: 0 };
    default:
      return { round: state };
  }
}

function useConfirmation(incrementRound) {
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
