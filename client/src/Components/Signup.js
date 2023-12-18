import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import backendUrl from "../configBackend";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function toLogin() {
    navigate("/");
  }

  function handleSignup() {
    // Email validation
    if (email.trim() === "") {
      setEmailError("Please add an email address");
      return;
    } else if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please add a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    // Password validation
    if (password.trim() === "") {
      setPasswordError("Please add a password");
      return;
    } else if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
      return;
    } else {
      setPasswordError("");
    }

    // If both email and password are valid, proceed with signup
    axios
      .post(`${backendUrl}/user/signup`, { email, password })
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/blogs");
        } else {
          alert(data.msg);
        }
      });
  }

  return (
    <div className="signup-login-container app-layout">
      <h1 className="app-title ">Welcome to BlogBridges</h1>
      <p className="headline-text mt-4">
        Whether you're an aspiring writer, seasoned blogger, or someone with a
        story to tell, BlogBridges is your gateway to a vibrant
        community of bloggers all around the world! Signup to learn more!
      </p>
      <div className="input-button-container">
        <input
          type="email"
          placeholder="email"
          className="signup-login-inputs"
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
          }}
        />
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        <input
          type="password"
          placeholder="password"
          className="signup-login-inputs"
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
        />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        <button
          className="btn btn-primary"
          onClick={() => {
            handleSignup();
          }}
        >
          Signup
        </button>
      </div>
      <p className="info-text">
        If you have an account{" "}
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            toLogin();
          }}
        >
          {" "}
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;
