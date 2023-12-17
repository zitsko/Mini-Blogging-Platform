import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import BlogForm from "./Components/BlogForm";
import BlogList from "./Components/BlogList";



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
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
