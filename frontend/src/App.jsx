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
import MagnusVSina from "./pages/lessons/black/magnus_v_sina";
import EricVEmilia from "./pages/lessons/white/eric_v_emilia";
import Lessons from "./pages/Lessons";
import MagnusVRainn from "./pages/lessons/white/Magnus_v_RainnWilson";
import MagnusVBardiya from "./pages/lessons/white/Magnus_V_Bardiya";
import BeginnerLessonOne from "./pages/lessons/white/BeginnerLessonOne";
import Hanging_Pieces from "./pages/lessons/beginner_lessons/hanging_pieces";
import Forks from "./pages/lessons/beginner_lessons/forks";
import ForksPractice from "./pages/lessons/white/forks_practice";
import ForksPractice2 from "./pages/lessons/white/forks_practice_2";

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
          <Route
            path="/lessons/grandmaster/MagnusVRainn"
            element={<MagnusVRainn />}
          />
          <Route
            path="/lessons/grandmaster/MagnusVBardiya"
            element={<MagnusVBardiya />}
          />
          <Route
            path="lessons/grandmaster/MagnusVSina"
            element={<MagnusVSina />}
          />
          <Route
            path="lessons/beginner/BeginnerLessonGameOne"
            element={<BeginnerLessonOne />}
          />
          <Route path="lessons/beginner/forks" element={<Forks />} />
          <Route
            path="lessons/beginner/forks_practice"
            element={<ForksPractice />}
          />
          <Route
            path="lessons/beginner/forks_practice_2"
            element={<ForksPractice2 />}
          />
        </Routes>

      </main>
    </BrowserRouter>
  );
}

export default App;
