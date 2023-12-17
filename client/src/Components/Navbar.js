import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function CustomNavbar() {
  const navigate = useNavigate();
  const boldStyle = {
    fontWeight: "bold",
    letterSpacing: "1.5px", 
  };
  
  function logout() {
    const shouldLogout = window.confirm(
      "You are about to leave, are you sure?"
    );
    if (shouldLogout) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <Navbar bg="light" variant="light">
      <Nav.Link style={boldStyle} onClick={() => navigate("/blogs")}>Blogs</Nav.Link>
      <Nav className="mx-auto">
        <Nav.Link style={boldStyle}onClick={() => navigate("/form")}>Create Blog</Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Link style={boldStyle}onClick={() => logout()}>Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default CustomNavbar;

