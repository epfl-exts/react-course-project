import React, { useContext, useEffect, useState, useReducer } from "react";
import * as tf from "@tensorflow/tfjs";
import { getPrediction } from "./helpers.js";

function roundsReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { round: state.round + 1 };
    case "reset":
      return { round: 0 };
    default:
      return { round: state };
  }
}

function useConfirmation(prediction, incrementRound) {
  console.log(`Correct: ${prediction}`);

  return setTimeout(function() {
    incrementRound();
  }, 3000);
}

function useWrongPrediction(prediction) {
  console.log(`Wrong! ${prediction}`);
}

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
    console.log(currentRound);
  });

  return (
    <div>
      <h1>Gameplay</h1>
      <Canvas ref={ref} checkPrediction={checkPrediction} />
    </div>
  );
}

const Canvas = React.forwardRef((props, ref) => {
  const model = tf.loadModel("./model/model.json");

  let mouseDown = false;
  let lastX;
  let lastY;

  function drawLine(canvas, x, y, lastX, lastY) {
    let context = canvas.getContext("2d");

    context.strokeStyle = "#000000";
    context.lineWidth = 12;
    context.lineJoin = "round";

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();

    return [x, y];
  }

  const handleMouseup = e => {
    mouseDown = false;
    [lastX, lastY] = [undefined, undefined];
    getPrediction(e.target, model).then(prediction =>
      props.checkPrediction(prediction)
    );
  };

  const handleMousemove = e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (mouseDown) {
      [lastX, lastY] = drawLine(e.target, x, y, lastX, lastY);
    }
  };

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.height, canvas.width);
  });

  return (
    <canvas
      height={300}
      width={300}
      ref={ref}
      onMouseDown={() => (mouseDown = true)}
      onMouseUp={e => handleMouseup(e)}
      onMouseMove={e => handleMousemove(e)}
    />
  );
});

// function Controls({ theCanvas, model, labels }) {
//   let [prediction, setPrediction] = useState(""); // Sets default label to empty string.

//   useEffect(() => {
//     console.log(prediction);
//   });

//   return (
//     <div>
//       <button
//         onClick={() => {
//           const canvas = theCanvas.current;
//           const ctx = canvas.getContext("2d");
//           ctx.fillRect(0, 0, canvas.height, canvas.width);
//         }}
//       >
//         Clear the canvas.
//       </button>
//       <button
//         onClick={() =>
//           getPrediction(theCanvas, model).then(prediction =>
//             setPrediction(labels[prediction[0]])
//           )
//         }
//       >
//         Predict the drawing.
//       </button>
//     </div>
//   );
// }
