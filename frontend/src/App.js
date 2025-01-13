import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/register.jsx";
import Shoes from "./pages/Shoes.jsx";
import Cart from "./pages/cart.jsx";
import Add from "./pages/Add.jsx";
import Update from "./pages/Update.jsx";
import User from "./pages/user.jsx"; // Import User page
import Orders from "./pages/orders.jsx"; // Import Orders page
import "./style.css";

function App() {
    const Navbar = () => {
        const location = useLocation();
        const isLoginPage = location.pathname === "/";
        const isOrdersPage = location.pathname === "/orders"; // Check if on the Orders page

        return (
            <nav className="navbar">
                <h1>E-Commerce</h1>
                <div>
                    {/* Navbar buttons shown if not on login page */}
                    {!isLoginPage && (
                        <>
                            {/* Hide Shop link if on the Orders page */}
                            {!isOrdersPage && location.pathname !== "/user" && location.pathname !== "/cart" && (
                                <a href="/shoes">Shop</a>
                            )}
                            <a href="/cart">Cart</a>
                            <a href="/user">Main Page</a> {/* Link to the user page */}
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
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/shoes" element={<Shoes />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/update/:id" element={<Update />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
