import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <header class="nav_header">
          <nav>
            <ul class="nav_links">
              <li class="nav_list">
                <a class="nav_a" href="index.html">
                  Home
                </a>
              </li>
              <li class="nav_list">
                <a class="nav_a" href="/Login">
                  Login
                </a>
              </li>
              <li class="nav_list">
                <a class="nav_a" href="learn.html">
                  Learn
                </a>
              </li>
              <li class="nav_list">
                <a class="nav_a" href="/chessfull/connect/">
                  Connect
                </a>
              </li>
            </ul>
          </nav>
        </header>
      </body>
    </>
  );
}

export default App;
