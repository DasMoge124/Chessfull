/**
 * Sign up page component for user registration.
 * Allows new users to create accounts by providing email, username, and password.
 * Sends registration data to the backend API (/addUser endpoint).
 * Displays success or error messages based on the registration result.
 */
import React, { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const localhost = "http://localhost:8085";
  const url = localhost + "/addUser";

  const handleSignup = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const result = await response.text(); // backend returns a plain string
      setMessage(result);
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="CONTAINER">
          <div className="CARD">
            <h3>Sign Up</h3>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Email"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Password"
            />
            <button className="signInButton" onClick={handleSignup}>
              Sign Up
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;