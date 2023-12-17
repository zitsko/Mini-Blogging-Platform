import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import BlogForm from "./Components/BlogForm";
import BlogList from "./Components/BlogList";
import BlogItem from "./Components/BlogItem";
import EditBlogForm from "./Components/EditBlogForm";



function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/form" element={<BlogForm />} />
            <Route path="/blogs" element={<BlogList />} />    
            <Route path="/blog/:id" element={<BlogItem />} />  
            <Route path="/edit-blog/:id" element={<EditBlogForm />} />  
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
