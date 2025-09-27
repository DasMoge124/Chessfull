import React, { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8085/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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
