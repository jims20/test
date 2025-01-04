import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Shoes from "./pages/Shoes";
import Add from "./pages/Add";
import Update from "./pages/Update";
import "./style.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation Links */}
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/add">Add New Item</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Shoes />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
