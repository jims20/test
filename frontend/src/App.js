import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import Shoes from "./pages/Shoes.jsx";
import "./style.css";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <nav>
                    <Link to="/">Login</Link> | <Link to="/register">Register</Link> | <Link to="/shoes">Shoes</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/shoes" element={<Shoes />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
