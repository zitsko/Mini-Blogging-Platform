// EditBlogForm.js
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import backendUrl from "../configBackend";

const EditBlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    _id: "",
    email: "",
  });
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

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
            console.log('Blog ID:', id);
            axios.get(`${backendUrl}/blogs/blog/${id}`)
              .then((response) => {
                const existingBlogData = response.data;
                console.log('Existing Blog Data:', existingBlogData);

                // Ensure that the following logs show the expected values
                console.log('Title:', existingBlogData.title);
                console.log('Text:', existingBlogData.text);
                console.log('Image:', existingBlogData.image);

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

      const response = await axios.put(`${backendUrl}/blogs/${id}`, updatedBlog);
      navigate('/blogs');
      console.log('Blog updated:', response.data);
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <h1>Hello, EditBlogForm!</h1>
      <div className="blog-form-container">
        <h2>Edit Blog</h2>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Text:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />

        <label>Image URL:</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

        <button onClick={handleEditBlog}>Save Changes</button>
      </div>
    </div>
  );
};

export default EditBlogForm;
