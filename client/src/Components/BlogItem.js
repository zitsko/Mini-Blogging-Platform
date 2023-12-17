import React from 'react';

const BlogItem = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-item">
          <h2>{blog.title}</h2>
          <p>{blog.text}</p>
          <p>By: {blog.author.email}</p>
          <p>Created at: {new Date(blog.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogItem;
