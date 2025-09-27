import React from "react";
import "./login.css";

function Login() {
  const loginUser = () => {
    // Placeholder login logic — replace with real auth
    const email = document.getElementById("signInEmailInput").value;
    const password = document.getElementById("signInPasswordInput").value;
    console.log("Logging in with:", email, password);
    // You can add real authentication logic here
  };

  return (
    <div className="CONTAINER">
      <div className="CARD">
        <h3>Login</h3>
        <input
          id="signInEmailInput"
          className="input"
          placeholder="Email"
          type="email"
        />
        <input
          id="signInPasswordInput"
          className="input"
          placeholder="Password"
          type="password"
        />
        <button className="signInButton" onClick={loginUser}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
