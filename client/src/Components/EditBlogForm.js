// EditBlogForm.js
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import backendUrl from "../configBackend";

const EditBlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    _id: "",
    email: "",
  });
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  // Use useEffect to fetch existing blog data based on the blog ID
  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .post(`${backendUrl}/user/verify`, {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          if (data.userData._id) {
            setUser(data.userData);
            // Fetch existing blog data based on the ID
            console.log("Blog ID:", id);
            axios
              .get(`${backendUrl}/blogs/blog/${id}`)
              .then((response) => {
                const existingBlogData = response.data;
                setTitle(existingBlogData.title);
                setText(existingBlogData.text);
                setImage(existingBlogData.image);
              })
              .catch((error) => {
                console.error("Error fetching blog data:", error);
                navigate("/blogs"); // Navigate to the blogs list on error
              });
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
  }, [id]);

  // Create Blog
  const handleEditBlog = async () => {
    try {
      const updatedBlog = {
        title,
        text,
        image,
        author: user._id,
      };

      const response = await axios.put(
        `${backendUrl}/blogs/${id}`,
        updatedBlog
      );
      navigate("/blogs");
      console.log("Blog updated:", response.data);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <div className="blog-form-container">
        <h2 className="text-center mt-2" >Edit Blog</h2>
        <label className="text-center">Title</label>
        <input
          type="text"
          value={title}
          className="blog-form-input"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="text-center">Text</label>
        <textarea
          value={text}
          className="blog-form-input"
          onChange={(e) => setText(e.target.value)}
        />

        <label className="text-center">Image URL</label>
        <input
          type="text"
          value={image}
          className="blog-form-input"
          onChange={(e) => setImage(e.target.value)}
        />

        <button onClick={handleEditBlog} className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditBlogForm;
