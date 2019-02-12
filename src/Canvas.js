import React, { useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { getPrediction } from "./helpers.js";

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
    <div
      className="nes-container is-rounded"
      style={{ display: "inline-block" }}
    >
      <canvas
        height={300}
        width={300}
        ref={ref}
        onMouseDown={() => (mouseDown = true)}
        onMouseUp={e => handleMouseup(e)}
        onMouseMove={e => handleMousemove(e)}
      />
    </div>
  );
});

export default Canvas;
