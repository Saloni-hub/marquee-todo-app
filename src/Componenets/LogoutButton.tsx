// LogoutButton.tsx
import React, { useContext } from "react";
import AuthContext from "../AuthContext";
import { useHistory } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const { setUser } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    // Clear JWT token and user information
    localStorage.removeItem("token");
    setUser(null);
    // Redirect user to login page
    history.push("/");
  };

  return (
    <button className="logout" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
