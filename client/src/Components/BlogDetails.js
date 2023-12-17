

<div key={blog._id} className="blog-item">
          <h2>{blog.title}</h2>
          {blog.image && <img src={blog.image} alt="Blog" />}
          <p>{blog.text}</p>
          <p>By: {blog.author.email}</p>
          <p>Created at: {new Date(blog.createdAt).toLocaleString()}</p>
        </div>