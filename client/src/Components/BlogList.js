import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import backendUrl from "../configBackend";
import { Button } from "react-bootstrap";

function BlogList() {
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
            getAllBlogs();
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
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id: "",
    email: "",
  });

  //get all blogs
  const getAllBlogs = () => {
    try {
      axios
        .get(`${backendUrl}/blogs`)
        .then((res) => {
          setBlogs(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  //Delete Blog
  const handleDelete = async (blogId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (shouldDelete) {
      try {
        await axios.delete(`${backendUrl}/blogs/${blogId}`);
        setBlogs((prevBlogs) =>
          prevBlogs.filter((blog) => blog._id !== blogId)
        );
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  //Edit Blog
  const handleEdit = (blogId) => {
    const shouldEdit = window.confirm('Are you sure you want to edit this blog?');
  
    if (shouldEdit) {
      navigate(`/edit-blog/${blogId}`);
    }
  };
  


  return (
    <div className="app-layout">
      <Navbar />
      <h1>Welcome, {user.email}! Your Blogs:</h1>
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-item">
          <h2>
            <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
          </h2>
          {blog.image && <img src={blog.image} alt="Blog" />}
          <p>{blog.text}</p>
          <p>By: {blog.author.email}</p>
          <p>Created at: {new Date(blog.createdAt).toLocaleString()}</p>

          {user._id === blog.author._id && (
            <div className="d-flex gap-2"> {/* Bootstrap class to add space between buttons */}
            <Button variant="primary" onClick={() => handleEdit(blog._id)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => handleDelete(blog._id)}>
              Delete
            </Button>
          </div>
          )}
        </div>
        
      ))}
    </div>
  );
}

export default BlogList;
