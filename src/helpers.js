import * as tf from "@tensorflow/tfjs";

function preprocessCanvas(canvas) {
  // Preprocess image for the network
  let tensor = tf
    .fromPixels(canvas) // Shape: (300, 300, 3) - RGB image
    .resizeNearestNeighbor([28, 28]) // Shape: (28, 28, 3) - RGB image
    .mean(2) // Shape: (28, 28) - grayscale
    .expandDims(2) // Shape: (28, 28, 1) - network expects 3d values with channels in the last dimension
    .expandDims() // Shape: (1, 28, 28, 1) - network makes predictions for "batches" of images
    .toFloat(); // Network works with floating points inputs
  return tensor.div(255.0); // Normalize [0..255] values into [0..1] range
}

export function getPrediction(theCanvas, model) {
  const tensor = preprocessCanvas(theCanvas.current);
  return model
    .then(loadedModel => loadedModel.predict(tensor).data())
    .then(async prediction => await tf.argMax(prediction).data()); // returns an int32 containing the predicted class
}
