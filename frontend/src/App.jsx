import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";

import "./App.css";
import Home from "./pages/Home"; // assuming 'Home.js' is in the 'pages' directory
import Login from "./pages/login";
import Signup from "./pages/signup"; // ensure the file exists
import Learn from "./pages/Learn"; // ensure the file exists
import Chessboard from "./pages/Chessboard";

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
          <Route path="/chessboard" element={<Chessboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
