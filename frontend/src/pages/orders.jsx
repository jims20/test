import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Orders = () => {
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const { userId } = location.state || {}; // Get userId passed from the User component

    // Fetch the orders when the component mounts
    useEffect(() => {
        if (userId) {
            fetch(`http://localhost:8800/orders?userId=${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data);
                })
                .catch((error) => console.error("Error fetching orders:", error));
        }
    }, [userId]);

    return (
        <div className="orders-container">
            <h1>Your Orders</h1>
            {orders.length > 0 ? (
                <div className="order-details">
                    {orders.map((order) => (
                        <div key={order.order_id} className="order">
                            <h2>Order ID: {order.order_id}</h2>
                            <p>Status: {order.status || "Pending"}</p>
                            <p>Address: {order.address}</p>
                            <p>Delivery Date: {order.delivery_date}</p>
                            <p>Order Date: {order.created_at}</p>

                            <h3>Items:</h3>
                            <ul>
                                {order.items.map((item) => (
                                    <li key={item.item_id}>
                                        <img
                                            src={item.image || "https://via.placeholder.com/150"}
                                            alt={item.prod_name}
                                        />
                                        <p>{item.prod_name}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No orders available.</p>
            )}
        </div>
    );
};

export default Orders;
