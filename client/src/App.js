import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import BlogForm from "./Components/BlogForm";
import BlogList from "./Components/BlogList";
import BlogItem from "./Components/BlogItem";



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
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
