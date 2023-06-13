// LoginPage.tsx
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { users } from "../mockData";
import { sign } from "jsonwebtoken";
import AuthContext from "../AuthContext";

const LoginPage: React.FC = () => {
  const { setUser } = useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const allUserData = JSON.parse(localStorage.getItem("users"));

  const handleLogin = () => {
    const user = allUserData.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Generate JWT token and store it securely (e.g., in local storage)
      const payload = {
        id: user.id,
        username: user.username,
        name: user.name,
        password: user.password
      };
      const secretKey = "123456789";

      const token = sign({ data: payload }, secretKey); // Wrap payload in 'data' property

      localStorage.setItem("token", token);
      setUser(user);
      // Redirect user to dashboard
      history.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };
  if (localStorage.getItem("token")) {
    history.push("/dashboard");
    return null;
  }

  return (
    <div>
      <div className="login-contianer">
        <h1>Login Page</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login" onClick={handleLogin}>
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <a type="button" className="signup" href="/signup">
            SignUp
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
