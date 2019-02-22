import React, { useContext, useEffect, useState, useReducer } from "react";
import { getPrediction } from "./helpers.js";
import Canvas from "./Canvas.js";
import Typed from "typed.js";
import * as tf from "@tensorflow/tfjs";
import { GameContext } from "./Game.js";

function Instructions({ onTimeUp, text, timeLimit }) {
  const [instructions, setInstructions] = useState({
    timeLeft: timeLimit,
    typed: false
  });

  const { timeLeft, typed } = instructions;

  const textWithTimeLeft = text(timeLeft);

  const typeOptions = {
    strings: [textWithTimeLeft],
    showCursor: false,
    typeSpeed: 50,
    backSpeed: 25,
    onComplete: () => {
      setInstructions({ timeLeft, typed: true });
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setInstructions({ timeLeft: timeLimit, typed: false });
      onTimeUp();
    }

    let interval;

    !typed
      ? new Typed(typedRef.current, typeOptions)
      : (interval = setInterval(
          () =>
            setInstructions({
              timeLeft: timeLeft - 1,
              typed: typed
            }),
          1000
        ));

    return () => clearInterval(interval);
  });

  const typedRef = React.createRef();

  return (
    <p className="typed" ref={typedRef}>
      {typed && textWithTimeLeft}
    </p>
  );
}

function Round() {
  const model = tf.loadModel("./model/model.json");
  const gameContext = useContext(GameContext);
  const { round, label, timeLimit, addPoint, incrementRound } = gameContext;

  const [showInstructions, toggleInstructions] = useState(true);

  const instructionsText = timeLeft =>
    `${
      round.text
    } You have ${timeLeft} seconds to draw a ${label} in the box on the left.`;

  const onCanvasDraw = e =>
    getPrediction(e.target, model).then(prediction => {
      if (parseInt(prediction) === round.order) {
        addPoint();
        toggleInstructions(false);
        setTimeout(function() {
          toggleInstructions(true);
        }, 3000);
      }
    });

  const onBtnClick = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect(0, 0, canvas.height, canvas.width);
  };

  const canvasRef = React.createRef();

  return (
    <div className="nes-container">
      <div className="flex-wrapper">
        <Canvas
          forwardRef={canvasRef}
          onDraw={onCanvasDraw}
          height={300}
          width={300}
        />
        <div className="instructions-wrapper">
          {showInstructions && (
            <Instructions
              onTimeUp={incrementRound}
              text={instructionsText}
              timeLimit={timeLimit}
            />
          )}
          <button
            className="nes-btn is-warning clear-button"
            onClick={onBtnClick}
          >
            Clear canvas
          </button>
        </div>
      </div>
    </div>
  );
}

export default Round;
