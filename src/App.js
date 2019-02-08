import React, { useEffect, useState } from "react";
import { getPrediction } from "./helpers.js";

function Controls({ theCanvas, model, labels }) {
  let [prediction, setPrediction] = useState(""); // Sets default label to empty string.

  useEffect(() => {
    console.log(prediction);
  });

  return (
    <div>
      <button
        onClick={() => {
          const canvas = theCanvas.current;
          const ctx = canvas.getContext("2d");
          ctx.fillRect(0, 0, canvas.height, canvas.width);
        }}
      >
        Clear the canvas.
      </button>
      <button
        onClick={() =>
          getPrediction(theCanvas, model).then(prediction =>
            setPrediction(labels[prediction[0]])
          )
        }
      >
        Predict the drawing.
      </button>
    </div>
  );
}

const Canvas = React.forwardRef((props, ref) => {
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

  const handleMouseup = () => {
    mouseDown = false;
    [lastX, lastY] = [undefined, undefined];
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
      onMouseUp={handleMouseup}
      onMouseMove={e => handleMousemove(e)}
    />
  );
});

export { Canvas, Controls };
