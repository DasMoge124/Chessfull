import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React from "react";

import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup"; // ensure the file exists

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
              <a className="nav_a" href="learn.html">
                Learn
              </a>
            </li>
            <li className="nav_list">
              <a className="nav_a" href="/chessfull/connect/">
                Connect
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <Routes>
        {/* Add a real Home component later if needed */}
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
