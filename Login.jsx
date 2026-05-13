import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import { AuthContext } from "../context/AuthContext";

const Login = () => {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      login(
        response.data.user,
        response.data.token
      );

      navigate("/dashboard");

    } catch (err) {

      setError("Invalid email or password");

    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          width: "350px",
        }}
      >

        <h2>Email Campaign Login</h2>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#2563eb",
            color: "white",
            border: "none",
          }}
        >
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;