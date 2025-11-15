import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";

import "./App.css";
import Navbar from "./Navbar";
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
//How To Set Up Chess Board Input
import HowToSetUpChessBoard from "./pages/lessons/beginner_lessons/chessboard_setup";
import OpeningPrinciples from "./pages/lessons/beginner_lessons/opening_principles";
//Hanging Pieces Imports
import Hanging_Pieces from "./pages/lessons/beginner_lessons/hanging_pieces";
import Hanging_Pieces_Practice from "./pages/lessons/white/hanging_pieces";
import Hanging_Pieces_Practice_2 from "./pages/lessons/white/hanging_pieces_2";
import Hanging_Pieces_Practice_3 from "./pages/lessons/white/hanging_pieces_3";
//Fork Imports
import Forks from "./pages/lessons/beginner_lessons/forks";
import ForksPractice from "./pages/lessons/white/forks_practice";
import ForksPractice2 from "./pages/lessons/white/forks_practice_2";
import ForksPractice3 from "./pages/lessons/white/forks_practice_3";
import ForksPractice4 from "./pages/lessons/white/forks_practice_4";
//Pins and Skewers
import Pins_Skewers from "./pages/lessons/beginner_lessons/pins_and_skewers";
import Pins_Skewers_Practice from "./pages/lessons/white/pins_and_skewers";
import Pins_Skewers_Practice_2 from "./pages/lessons/white/pins_and_skewers_2";
import Pins_Skewers_Practice_3 from "./pages/lessons/white/pins_and_skewers_3";
import Pins_Skewers_Practice_4 from "./pages/lessons/white/pins_and_skewers_4";
//Discoverd Attacks Imports
import Discovered_Attack from "./pages/lessons/beginner_lessons/discovered_attack";
import Discovered_Attack_Practice from "./pages/lessons/black/discovered_attacks";

//Practice Games for Beginners
// Removed import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      {/* Reinstated static header/navbar */}
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

      {/* Removed 'page-content-area' class as the nav is no longer fixed */}
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
          {/* Beginner Stuff */}
          <Route
            path="lessons/beginner/how_to_setup_chessboard"
            element={<HowToSetUpChessBoard />}
          />
          <Route
            path="lessons/beginner/opening_principles"
            element={<OpeningPrinciples />}
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
          <Route
            path="lessons/beginner/forks_practice_3"
            element={<ForksPractice3 />}
          />
          <Route
            path="lessons/beginner/forks_practice_4"
            element={<ForksPractice4 />}
          />
          <Route
            path="lessons/beginner/hanging_pieces"
            element={<Hanging_Pieces />}
          />
          <Route
            path="lessons/beginner/hanging_pieces_practice"
            element={<Hanging_Pieces_Practice />}
          />
          <Route
            path="lessons/beginner/hanging_pieces_practice_2"
            element={<Hanging_Pieces_Practice_2 />}
          />
          <Route
            path="lessons/beginner/hanging_pieces_practice_3"
            element={<Hanging_Pieces_Practice_3 />}
          />
          <Route
            path="lessons/beginner/pins_and_skewers"
            element={<Pins_Skewers />}
          />
          <Route
            path="lessons/beginner/pins_and_skewers_practice"
            element={<Pins_Skewers_Practice />}
          />
          <Route
            path="lessons/beginner/pins_and_skewers_practice_2"
            element={<Pins_Skewers_Practice_2 />}
          />
          <Route
            path="lessons/beginner/pins_and_skewers_practice_3"
            element={<Pins_Skewers_Practice_3 />}
          />
          <Route
            path="lessons/beginner/pins_and_skewers_practice_4"
            element={<Pins_Skewers_Practice_4 />}
          />
          <Route
            path="lessons/beginner/beginner_lesson_one"
            element={<BeginnerLessonOne />}
          />
          <Route
            path="lessons/beginner/discovered_attacks"
            element={<Discovered_Attack />}
          />
          <Route
            path="lessons/beginner/discovered_attacks_practice"
            element={<Discovered_Attack_Practice />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
