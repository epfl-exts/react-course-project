import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Gameplay from "./Gameplay";
import HighScore from "./HighScore";

export default function App() {
  return (
    <Router>
      <div className="content">
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Gameplay} />
        <Route path="/highscore" component={HighScore} />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <Link to="/game" className="nes-btn">
      Play game
    </Link>
  );
}
