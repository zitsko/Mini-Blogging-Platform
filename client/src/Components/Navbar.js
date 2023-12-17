import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  function logout() {
    const shouldLogout = window.confirm(
      "You are about to leave ,are you sure?"
    );
    if (shouldLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <nav>
      <ul className="main-navbar-container">
        <li>
          <button
            onClick={() => navigate("/blogs")}
            className="btn primary-btn"
          >Blogs</button>
        </li>

        <li>
          <button
            onClick={() => navigate("/form")}
            className="btn primary-btn"
          >Create Blog</button>
        </li>

        <li>
          <button
            className="btn intense-btn "
            onClick={() => {
              logout();
            }}
          >Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
