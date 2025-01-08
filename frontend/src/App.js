import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import Shoes from "./pages/Shoes.jsx";
import Cart from "./pages/cart.jsx"; // Import Cart component
import "./style.css";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <nav>
                    <Link to="/">Login</Link> | <Link to="/register">Register</Link> | <Link to="/shoes">Shoes</Link> | <Link to="/cart">Cart</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/shoes" element={<Shoes />} />
                    <Route path="/cart" element={<Cart />} /> {/* Add route for Cart */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
