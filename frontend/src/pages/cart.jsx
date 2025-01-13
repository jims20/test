import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        fetch("http://localhost:8800/cart")
            .then((response) => response.json())
            .then((data) => setCartItems(data))
            .catch((error) => console.error("Error fetching cart:", error));
    }, []);

    const handleRemoveFromCart = (id) => {
        fetch(`http://localhost:8800/cart/${id}`, { method: "DELETE" })
            .then((response) => response.json())
            .then((message) => {
                alert(message);
                setCartItems((prev) => prev.filter((item) => item.id !== id));
            })
            .catch((error) => console.error("Error removing item from cart:", error));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Function to navigate to the User page (Main Shop)
    const goToUserPage = () => {
        navigate("/user"); // Navigates to the User page
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image || "https://via.placeholder.com/200"} alt={item.prod_name} />
                            <h3>{item.prod_name}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <h2>Cart Summary</h2>
                    <p>Total: ${calculateTotal()}</p>
                    <button className="checkout-button">Proceed to Checkout</button>
                </div>
            )}

            {/* Button to navigate to the User (Main Shop) page */}
            <button onClick={goToUserPage} className="main-shop-button">Go to Main Shop</button>
        </div>
    );
}

export default Cart;
