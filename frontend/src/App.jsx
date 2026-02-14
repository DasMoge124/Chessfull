/**
 * Main App component for the Chessfull chess learning platform.
 * Sets up React Router with all routes for the application including:
 * - Authentication pages (Login, Signup)
 * - Learning pages (Home, Learn, Beginner, Intermediate, Advanced, Lessons)
 * - Interactive pages (Chessboard for free play)
 * - Hundreds of lesson pages covering various chess topics and grandmaster games
 * Lessons are organized by skill level and topic (tactics, openings, endgames, etc.)
 * Uses BrowserRouter to enable client-side navigation throughout the app.
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Lessons from "./pages/Lessons";

// Lesson imports
import MagnusVSina from "./pages/lessons/black/magnus_v_sina";
import EricVEmilia from "./pages/lessons/white/eric_v_emilia";
import MagnusVRainn from "./pages/lessons/white/Magnus_v_RainnWilson";
import MagnusVBardiya from "./pages/lessons/white/Magnus_V_Bardiya";
import Terry_V_Rozman from "./pages/lessons/white/Terry_V_Rozman";
import CantyVNarayan from "./pages/lessons/black/canty_v_narayan";
import AndreyVHikaru from "./pages/lessons/black/AndreyVHikaru";
import BeginnerLessonOne from "./pages/lessons/white/BeginnerLessonOne";
import BeginnerLessonTwo from "./pages/lessons/white/BeginnerLessonTwo";
import BeginnerLessonThree from "./pages/lessons/black/BeginnerLessonThree";

// Beginner lessons
import HowToSetUpChessBoard from "./pages/lessons/beginner_lessons/chessboard_setup";
import HowPiecesMove from "./pages/lessons/beginner_lessons/how_pieces_move";
import ChessNotation from "./pages/lessons/beginner_lessons/chessnotation";
import OpeningPrinciples from "./pages/lessons/beginner_lessons/opening_principles";
import HowToCalculate from "./pages/lessons/beginner_lessons/How_To_Calculate";
import CheckmatesAndStalemates from "./pages/lessons/beginner_lessons/checkmates";
import TwoRookCheckmate from "./pages/lessons/white/tworookmate";
import QueenCheckmateLesson from "./pages/lessons/white/QueenMateLesson";
import Hanging_Pieces from "./pages/lessons/beginner_lessons/hanging_pieces";
import Hanging_Pieces_Practice from "./pages/lessons/white/hanging_pieces";
import Hanging_Pieces_Practice_2 from "./pages/lessons/white/hanging_pieces_2";
import Hanging_Pieces_Practice_3 from "./pages/lessons/white/hanging_pieces_3";
import Forks from "./pages/lessons/beginner_lessons/forks";
import ForksPractice from "./pages/lessons/white/forks_practice";
import ForksPractice2 from "./pages/lessons/white/forks_practice_2";
import ForksPractice3 from "./pages/lessons/white/forks_practice_3";
import ForksPractice4 from "./pages/lessons/white/forks_practice_4";
import Pins_Skewers from "./pages/lessons/beginner_lessons/pins_and_skewers";
import Pins_Skewers_Practice from "./pages/lessons/white/pins_and_skewers";
import Pins_Skewers_Practice_2 from "./pages/lessons/white/pins_and_skewers_2";
import Pins_Skewers_Practice_3 from "./pages/lessons/white/pins_and_skewers_3";
import Pins_Skewers_Practice_4 from "./pages/lessons/white/pins_and_skewers_4";
import Discovered_Attack from "./pages/lessons/beginner_lessons/discovered_attack";
import Discovered_Attack_Practice from "./pages/lessons/black/discovered_attacks";
import AttractionVDeflection from "./pages/lessons/beginner_lessons/attraction_v_deflection";
// Pawn Chains
import DoubledPawns from "./pages/lessons/beginner_lessons/doubled_pawns";
import PawnChains from "./pages/lessons/beginner_lessons/Pawn_Chains";
import OpponentsIdeas from "./pages/lessons/intermediate_lessons/opponent_idea";
import OpponentsIdeasPractice from "./pages/lessons/black/your_opponents_ideas_practice";
import DistantOpposition from "./pages/lessons/intermediate_lessons/Distant_Opposition";
import Space from "./pages/lessons/intermediate_lessons/Space";
import WeakSquares from "./pages/lessons/intermediate_lessons/Weak_Squares";
//Intermediate Lessons
import PairingPieces from "./pages/lessons/intermediate_lessons/pairing_pieces";
import ItalianGame from "./pages/lessons/intermediate_lessons/ItalianGame";
import Zugzwang from "./pages/lessons/intermediate_lessons/Zugzwang";
import Sacrifices from "./pages/lessons/intermediate_lessons/sacrifices";

function App() {
  return (
    <BrowserRouter>
      {/* <ParticleBackground /> */}
      {/* Use Navbar component only */}
      <Navbar />

      {/* Main content area */}
      <main className="page-container app-main">
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

          {/* Grandmaster lessons */}
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
            path="/lessons/grandmaster/CantyVNarayan"
            element={<CantyVNarayan />}
          />
          <Route
            path="/lessons/grandmaster/MagnusVSina"
            element={<MagnusVSina />}
          />
          <Route
            path="/lessons/grandmaster/AndreyVHikaru"
            element={<AndreyVHikaru />}
          />
          <Route
            path="/lessons/grandmaster/TerryVRozman"
            element={<Terry_V_Rozman />}
          />

          {/* Beginner lessons */}
          <Route
            path="/lessons/beginner/how_to_setup_chessboard"
            element={<HowToSetUpChessBoard />}
          />
          <Route
            path="/lessons/beginner/how_pieces_move"
            element={<HowPiecesMove />}
          />
          <Route
            path="/lessons/beginner/opening_principles"
            element={<OpeningPrinciples />}
          />
          <Route
            path="/lessons/beginner/chess_notation"
            element={<ChessNotation />}
          />
          <Route
            path="/lessons/beginner/checkmates_and_stalemates"
            element={<CheckmatesAndStalemates />}
          />
          <Route
            path="/lessons/beginner/two_rook_checkmate"
            element={<TwoRookCheckmate />}
          />
          <Route
            path="/lessons/beginner/queen_checkmate_lesson"
            element={<QueenCheckmateLesson />}
          />
          <Route path="/lessons/beginner/forks" element={<Forks />} />
          <Route
            path="/lessons/beginner/how_to_calculate"
            element={<HowToCalculate />}
          />
          <Route
            path="/lessons/beginner/forks_practice"
            element={<ForksPractice />}
          />
          <Route
            path="/lessons/beginner/forks_practice_2"
            element={<ForksPractice2 />}
          />
          <Route
            path="/lessons/beginner/forks_practice_3"
            element={<ForksPractice3 />}
          />
          <Route
            path="/lessons/beginner/forks_practice_4"
            element={<ForksPractice4 />}
          />
          <Route
            path="/lessons/beginner/hanging_pieces"
            element={<Hanging_Pieces />}
          />
          <Route
            path="/lessons/beginner/hanging_pieces_practice"
            element={<Hanging_Pieces_Practice />}
          />
          <Route
            path="/lessons/beginner/hanging_pieces_practice_2"
            element={<Hanging_Pieces_Practice_2 />}
          />
          <Route
            path="/lessons/beginner/hanging_pieces_practice_3"
            element={<Hanging_Pieces_Practice_3 />}
          />
          <Route
            path="/lessons/beginner/pins_and_skewers"
            element={<Pins_Skewers />}
          />
          <Route
            path="/lessons/beginner/pins_and_skewers_practice"
            element={<Pins_Skewers_Practice />}
          />
          <Route
            path="/lessons/beginner/pins_and_skewers_practice_2"
            element={<Pins_Skewers_Practice_2 />}
          />
          <Route
            path="/lessons/beginner/pins_and_skewers_practice_3"
            element={<Pins_Skewers_Practice_3 />}
          />
          <Route
            path="/lessons/beginner/pins_and_skewers_practice_4"
            element={<Pins_Skewers_Practice_4 />}
          />
          <Route
            path="/lessons/beginner/discovered_attacks"
            element={<Discovered_Attack />}
          />
          <Route
            path="/lessons/beginner/discovered_attacks_practice"
            element={<Discovered_Attack_Practice />}
          />
          <Route
            path="/lessons/beginner/attraction_vs_deflection"
            element={<AttractionVDeflection />}
          />
          {/* Pawn structure lessons */}
          <Route
            path="/lessons/beginner/pawn_structure_doubled_pawns"
            element={<DoubledPawns />}
          />
          <Route
            path="/lessons/beginner/pawn_chains"
            element={<PawnChains />}
          />
          {/* Interactive Beginner Lessons */}
          <Route
            path="/lessons/beginner/beginner_lesson_one"
            element={<BeginnerLessonOne />}
          />
          <Route
            path="/lessons/beginner/beginner_lesson_two"
            element={<BeginnerLessonTwo />}
          />
          <Route
            path="/lessons/beginner/beginner_lesson_three"
            element={<BeginnerLessonThree />}
          />
          {/* Intermediate lessons */}
          <Route
            path="/lessons/intermediate/your_opponents_ideas"
            element={<OpponentsIdeas />}
          />
          <Route
            path="/lessons/intermediate/your_opponents_ideas_practice"
            element={<OpponentsIdeasPractice />}
          />
          <Route
            path="/learn/intermediate/distant_opposition"
            element={<DistantOpposition />}
          />
          <Route path="/lessons/intermediate/space" element={<Space />} />
          <Route
            path="/lessons/intermediate/weak_squares"
            element={<WeakSquares />}
          />
          <Route
            path="/lessons/intermediate/pairing_pieces"
            element={<PairingPieces />}
          />
          <Route
            path="/learn/intermediate/italian_opening"
            element={<ItalianGame />}
          />
          <Route path="/learn/intermediate/zugzwang" element={<Zugzwang />} />
          <Route
            path="/learn/intermediate/sacrifices"
            element={<Sacrifices />}
          />
          {/* Add more intermediate lessons here */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
