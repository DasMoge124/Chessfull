export default Login;

function Login() {
  return (
    <>
      <div class="CONTAINER">
        <div class="CARD">
          <h3>Login</h3>
          <input id="signInEmailInput" class="input" placeholder="Email" />
          <input
            id="signInPasswordInput"
            class="input"
            placeholder="Password"
          />
          <button class="signInButton" onclick="login_user()">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
