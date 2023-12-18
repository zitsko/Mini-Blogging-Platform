import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import backendUrl from "../configBackend";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toLogin() {
    navigate("/");
  }
  function signup() {
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
        community of bloggers all around the world!Signup to learn more!
      </p>
      <div className="input-button-container">
        <input
          type="email"
          placeholder="email"
          className="signup-login-inputs"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          className="signup-login-inputs"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            signup();
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
