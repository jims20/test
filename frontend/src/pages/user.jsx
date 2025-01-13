import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
    const [shoes, setShoes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [filteredShoes, setFilteredShoes] = useState([]);
    const navigate = useNavigate();

    // Assume you have a way to get the userId (from login state, context, etc.)
    const userId = "example_user_id"; // Replace with actual user ID from context or state

    // Fetch available shoes
    useEffect(() => {
        fetch("http://localhost:8800/shoes")
            .then((response) => response.json())
            .then((data) => {
                setShoes(data);
                setFilteredShoes(data);
            })
            .catch((error) => console.error("Error fetching shoes:", error));
    }, []);

    // Filter shoes based on search and price range
    useEffect(() => {
        let results = shoes;

        // Filter by search term
        if (searchTerm) {
            results = results.filter(shoe =>
                shoe.prod_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                shoe.prod_description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by price range
        if (priceRange.min !== "") {
            results = results.filter(shoe => shoe.price >= Number(priceRange.min));
        }
        if (priceRange.max !== "") {
            results = results.filter(shoe => shoe.price <= Number(priceRange.max));
        }

        setFilteredShoes(results);
    }, [searchTerm, priceRange, shoes]);

    // Add a shoe to the cart
    const handleAddToCart = (id) => {
        fetch("http://localhost:8800/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ shoe_id: id, quantity: 1 }),
        })
            .then((response) => response.json())
            .then((message) => alert(message))
            .catch((error) => console.error("Error adding to cart:", error));
    };

    // Navigate to Orders page and pass userId
    const goToOrdersPage = () => {
        navigate("/orders", { state: { userId } }); // Pass userId to Orders page
    };

    return (
        <div className="container user-page">
            <h1>Available Shoes</h1>

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search shoes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <div className="price-filter">
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                </div>
            </div>

            <div className="shoes">
                {filteredShoes.map((shoe) => (
                    <div key={shoe.id} className="shoe">
                        <img
                            src={shoe.image || "https://via.placeholder.com/200"}
                            alt={shoe.prod_name}
                        />
                        <h3>{shoe.prod_name}</h3>
                        <p>{shoe.prod_description}</p>
                        <p>${shoe.price}</p>
                        <button onClick={() => handleAddToCart(shoe.id)} className="button">
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* New Orders Button */}
            <button onClick={goToOrdersPage} className="orders-button">
                View My Orders
            </button>
        </div>
    );
};

export default User;
