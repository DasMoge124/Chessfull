import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Optional: for redirection
import "./login.css";

function Login() {
  // 1. Use State instead of direct DOM manipulation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const localUrl = "http://localhost:8085/api/auth/login";
  const url = localUrl;

  const loginUser = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError("");

    try {
      const response = await fetch("http://localhost:8085/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // 2. Store the token in LocalStorage
        localStorage.setItem("token", data.token);
        console.log("Login successful! Token stored.");
        
        // 3. Redirect to home/dashboard
        navigate("/"); 
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Server is not responding. Please try again later.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="CONTAINER">
          <form className="CARD" onSubmit={loginUser}>
            <h3>Login</h3>
            
            {error && <p style={{ color: "red", fontSize: "0.8rem" }}>{error}</p>}

            <input
              className="input"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="signInButton" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;