import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

  const { user, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/");
  };

  return (
    <div
      style={{
        background: "#2563eb",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >

      <div>
        Email Campaign Platform
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >

        <span>
          {user?.role}
        </span>

        <button
          onClick={handleLogout}
          style={{
            background: "white",
            color: "#2563eb",
            border: "none",
            padding: "5px 10px",
          }}
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;