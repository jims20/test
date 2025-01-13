import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import Shoes from "./pages/Shoes.jsx";
import Cart from "./pages/cart.jsx";
import Add from "./pages/Add.jsx";
import Update from "./pages/Update.jsx";
import User from "./pages/user.jsx"; // Import User page
import "./style.css";

function App() {
    // Helper component to conditionally render the Navbar
    const Navbar = () => {
        const location = useLocation();
        
        // Determine if the current path is the Login page
        const isLoginPage = location.pathname === "/";

        return (
            <nav className="navbar">
                <h1>E-Commerce</h1>
                <div>
                    {/* Conditionally render buttons if not on the Login page */}
                    {!isLoginPage && (
                        <>
                            {location.pathname !== "/user" && location.pathname !== "/cart" && <a href="/shoes">Shop</a>}
                            <a href="/cart">Cart</a>
                            <a href="/">Logout</a>
                        </>
                    )}
                </div>
            </nav>
        );
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar /> {/* Conditional Navbar */}
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/shoes" element={<Shoes />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/update/:id" element={<Update />} />
                    <Route path="/user" element={<User />} /> {/* New User Route */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
