import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Learn from "./pages/Learn";
import Beginner from "./pages/Beginner";
import Intermediate from "./pages/Intermediate";
import Advanced from "./pages/Advanced";
import Chessboard from "./pages/Chessboard";
import MagnusVSina from "./pages/lessons/grandmaster/magnus_v_sina";
import EricVEmilia from "./pages/lessons/international_master/eric_v_emilia";
import Lessons from "./pages/Lessons";

function App() {
  return (
    <BrowserRouter>
      <header className="nav_header">
        <nav>
          <ul className="nav_links">
            <li className="nav_list">
              <Link className="nav_a" to="/">
                Home
              </Link>
            </li>
            <li className="nav_list">
              <Link className="nav_a" to="/login">
                Login
              </Link>
            </li>
            <li className="nav_list">
              <Link className="nav_a" to="/signup">
                Sign Up
              </Link>
            </li>
            <li className="nav_list">
              <Link className="nav_a" to="/learn">
                Learn
              </Link>
            </li>
            <li className="nav_list">
              <Link className="nav_a" to="/chessboard">
                Chessboard
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/beginner" element={<Beginner />} />
          <Route path="/learn/intermediate" element={<Intermediate />} />
          <Route path="/learn/advanced" element={<Advanced />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/chessboard" element={<Chessboard />} />
          <Route
            path="/lessons/international_master/EricVEmilia"
            element={<EricVEmilia />}
          />
          <Route path="/grandmaster/MagnusVSina" element={<MagnusVSina />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
