import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import Shoes from "./pages/Shoes.jsx";
import Cart from "./pages/cart.jsx";
import "./style.css";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear session storage or authentication tokens
        localStorage.removeItem("userToken"); // If you're using localStorage
        alert("You have been logged out.");
        navigate("/");
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <LogoutButton /> {/* Add Logout button at the top */}
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/shoes" element={<Shoes />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;