import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HighScore() {
  return (
    <div className="nes-container is-dark with-title">
      <Link to="/game" className="nes-btn">
        Gameplay
      </Link>
    </div>
  );
}
