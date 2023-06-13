import React, { useEffect, useState } from "react";
// import { users } from "../mockData";
const SignupPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const allUserData = JSON.parse(localStorage.getItem("users"));

  const [allUser, setAllUer] = useState(allUserData || []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(allUser));
  }, [allUser.length]);

  const handleSignup = () => {
    // Check if username is already taken
    const existingUser = allUser.find((user) => user.username === username);
    if (existingUser) {
      alert("Username is already taken");
      return;
    }

    // Create a new user object
    const newUser = {
      id: allUser.length + 1,
      username: username,
      password: password,
      name: name
    };

    // Add the new user to the list of users
    // users.push(newUser);
    setAllUer([...allUser, newUser]);

    // Display a success message or redirect to login page
    alert("Signup successful! Please login to continue.");
    // Clear the form fields
    setUsername("");
    setPassword("");
    setName("");
  };

  return (
    <div className="login-contianer">
      <h1>Signup Page</h1>
      <input
        type="text"
        placeholder="Enter Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button className="login" onClick={handleSignup}>
        Signup
      </button>
      <p>
        Have an account?{" "}
        <a type="button" className="loginbtn" href="/">
          Login
        </a>
      </p>
    </div>
  );
};

export default SignupPage;
