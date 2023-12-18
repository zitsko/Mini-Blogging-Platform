import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backendUrl from "../configBackend";

function BlogForm() {
  //-------- Use Effect-----------
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post(`${backendUrl}/user/verify`, {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data.userData._id) {
            setUser(data.userData);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error verifying user:", error);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, []);

  //-------- State Variables-----------
  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id: "",
    email: "",
  });
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  //Create Blog
  const handleCreateBlog = async () => {
    try {
      const newBlog = {
        title,
        text,
        image,
        author: user._id,
      };

      // Show a confirmation dialog
      const confirmed = window.confirm("Do you want to publish this blog?");

      if (confirmed) {
        const response = await axios.post(`${backendUrl}/blogs`, newBlog);
        navigate("/blogs");
      } else {
        return;
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className = "app-layout">
      <Navbar />
      <div className="blog-form-container">
        <h2 className="text-center mt-2">Create a New Blog</h2>
        
        <input
          type="text"
          value={title}
          placeholder="Enter Blog Title"
          className="blog-form-input"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={text}
          placeholder="Enter Blog Content"
          className="blog-form-input"
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="text"
          value={image}
          placeholder="Enter Image URL"
          className="blog-form-input"
          onChange={(e) => setImage(e.target.value)}
        />

        <button onClick={handleCreateBlog} className="btn btn-primary">
          Create Blog
        </button>
      </div>
    </div>
  );
}

export default BlogForm;
