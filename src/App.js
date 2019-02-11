import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Gameplay from "./Gameplay";
import HighScore from "./HighScore";

export default function App() {
  return (
    <Router>
      <>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
          <li>
            <Link to="/highscore">Hall of Fame</Link>
          </li>
        </ul>
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Gameplay} />
        <Route path="/highscore" component={HighScore} />
      </>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
