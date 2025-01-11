import React, { useState, useEffect } from "react";

function Cart() {
    const [cartItems, setCartItems] = useState([]);

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

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image || "https://via.placeholder.com/200"} alt={item.prod_name} />
                        <h3>{item.prod_name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>${item.price * item.quantity}</p>
                        <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}

export default Cart;