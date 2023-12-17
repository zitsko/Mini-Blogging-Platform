import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import backendUrl from "../configBackend";

const BlogItem = () => {
  const { id } = useParams();
  console.log(id);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function getBlog() {
      try {
        const res = await axios.get(`${backendUrl}/blogs/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getBlog();
  }, [id]);
  if (!blog) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      {blog.image && <img src={blog.image} alt="Blog" />}
      <p>{blog.text}</p>
      <p>By: {blog.author.email}</p>
      <p>Created at: {new Date(blog.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default BlogItem;
