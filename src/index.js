import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Canvas, Controls } from "./App";
import * as serviceWorker from "./serviceWorker";
import * as tf from "@tensorflow/tfjs";

const model = tf.loadModel("./model/model.json");
const labels = require("./labels.json");
let ref = React.createRef();

ReactDOM.render(
  <div>
    <Canvas ref={ref} />
    <Controls theCanvas={ref} model={model} labels={labels} />
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
