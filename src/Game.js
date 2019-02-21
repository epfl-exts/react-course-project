import React, {
  memo,
  useContext,
  useEffect,
  useState,
  useReducer
} from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import * as tf from "@tensorflow/tfjs";
import { getPrediction } from "./helpers.js";
import Canvas from "./Canvas.js";

function roundsReducer(state, action) {
  const nextRound = state + 1;

  switch (action.type) {
    case "addPoint":
      const newTotal = state.points + 1;
      return {
        order: nextRound,
        points: newTotal,
        text: "Well done!"
      };
    case "nextRound":
      return {
        order: nextRound,
        points: state.points,
        text: "Too slow..."
      };
    case "reset":
      return 0;
    default:
      return state;
  }
}

function useTimer(initialSeconds) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [startTimer, setStartTimer] = useState(false);

  const theInterval = startTimer
    ? setInterval(() => setTimeLeft(timeLeft - 1), 1000)
    : null;

  return [
    startTimer,
    () => setStartTimer(!startTimer),
    timeLeft,
    setTimeLeft,
    () => clearInterval(theInterval)
  ];
}

const TypedInstructions = memo(({ text, onComplete }) => {
  const animationOptions = {
    strings: ["", text],
    showCursor: false,
    typeSpeed: 50,
    backSpeed: 25,
    onComplete
  };

  const typedRef = React.createRef();

  useEffect(() => {
    new Typed(typedRef.current, animationOptions);
  });

  return <p className="typed" ref={typedRef} />;
});

function Instructions({ limit, onTimeOut, text }) {
  const [startTimer, toggleTimer, timeLeft, setTimeLeft, clearTimer] = useTimer(
    limit
  );

  useEffect(() => {
    if (timeLeft === 0) {
      toggleTimer();
      setTimeLeft(limit);
      onTimeOut();
    }
    return () => clearTimer();
  });

  const onComplete = () => {
    return startTimer || toggleTimer();
  };

  return (
    <div className="instructions-wrapper">
      <TypedInstructions text={text} onComplete={onComplete} />
      <p>Time left: {timeLeft}</p>
    </div>
  );
}

function Round({ forwardRef, model }) {
  const gameContext = useContext(GameContext);
  const { round, label, addPoint, incrementRound } = gameContext;
  const limit = 20;
  const text = `${
    round.text
  } You have ${limit} seconds to draw a ${label} in the box on the left.`;

  const onTimeOut = () => {
    incrementRound();
  };

  return (
    <div className="flex-wrapper">
      <div
        className="nes-container is-rounded"
        style={{ display: "inline-block" }}
      >
        <Canvas
          forwardRef={forwardRef}
          onDraw={e =>
            getPrediction(e.target, model).then(
              prediction =>
                parseInt(prediction) === round.order ? addPoint() : null // do nothing
            )
          }
          height={300}
          width={300}
        />
      </div>
      <Instructions limit={limit} onTimeOut={onTimeOut} text={text} />
    </div>
  );
}

function Gameplay() {
  const model = tf.loadModel("./model/model.json");

  let ref = React.createRef();

  return (
    <div className="nes-container is-dark with-title">
      <h2 className="title">Doodle</h2>
      <Round model={model} forwardRef={ref} />
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

function GameOver({ reset }) {
  return (
    <div>
      <h1>Submit highscore.</h1>
      <button className="nes-btn is-warning" onClick={() => reset()}>
        Play again.
      </button>
    </div>
  );
}

export default function Game() {
  const labels = require("./labels.json");
  const [round, roundDispatch] = useReducer(roundsReducer, {
    order: 7,
    points: 0,
    text: "Let's get started."
  });

  return round.order < labels.length ? (
    <GameContext.Provider
      value={{
        round,
        label: labels[round.order],
        addPoint: () => roundDispatch({ type: "addPoint" }),
        incrementRound: () => roundDispatch({ type: "nextRound" })
      }}
    >
      <Gameplay />
    </GameContext.Provider>
  ) : (
    <GameOver reset={() => roundDispatch({ type: "reset" })} />
  );
}

const GameContext = React.createContext({});
