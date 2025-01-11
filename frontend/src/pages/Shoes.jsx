import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added useNavigate

function Shoes() {
    const [shoes, setShoes] = useState([]);
    const [editingShoe, setEditingShoe] = useState(null); // Tracks which shoe is being edited
    const [editForm, setEditForm] = useState({
        prod_name: "",
        prod_description: "",
        image: "",
        price: "",
    });

    const navigate = useNavigate(); // Hook to navigate pages

    // Fetch the list of shoes
    useEffect(() => {
        fetch("http://localhost:8800/shoes")
            .then((response) => response.json())
            .then((data) => setShoes(data))
            .catch((error) => console.error("Error fetching shoes:", error));
    }, []);

    // Delete a shoe
    const handleDeleteShoe = (id) => {
        fetch(`http://localhost:8800/shoes/${id}`, { method: "DELETE" })
            .then((response) => response.json())
            .then((message) => {
                alert(message);
                setShoes((prev) => prev.filter((shoe) => shoe.id !== id));
            })
            .catch((error) => console.error("Error deleting shoe:", error));
    };

    // Show the update form for a specific shoe
    const handleUpdateShoe = (shoe) => {
        setEditingShoe(shoe.id);
        setEditForm({
            prod_name: shoe.prod_name,
            prod_description: shoe.prod_description,
            image: shoe.image,
            price: shoe.price,
        });
    };

    // Handle form changes
    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    // Submit the updated shoe
    const handleSubmitUpdate = () => {
        fetch(`http://localhost:8800/shoes/${editingShoe}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editForm),
        })
            .then((response) => response.json())
            .then((message) => {
                alert(message);
                setShoes((prev) =>
                    prev.map((shoe) =>
                        shoe.id === editingShoe ? { ...shoe, ...editForm } : shoe
                    )
                );
                setEditingShoe(null); // Close the form
            })
            .catch((error) => console.error("Error updating shoe:", error));
    };

    // Add to Cart functionality
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

    // Navigate to Cart Page
    const goToCart = () => {
        navigate("/cart");
    };

    return (
        <div className="App">
            {/* Cart Button in Upper Right */}
            <button className="cart-button" onClick={goToCart}>
                Cart
            </button>

            
            <div className="shoes">
                {shoes.map((shoe) => (
                    <div key={shoe.id} className="shoe">
                        <img src={shoe.image || "https://via.placeholder.com/200"} alt={shoe.prod_name} />
                        <h3>{shoe.prod_name}</h3>
                        <p>{shoe.prod_description}</p>
                        <p>${shoe.price}</p>
                        <button onClick={() => handleUpdateShoe(shoe)}>Update</button>
                        <button onClick={() => handleDeleteShoe(shoe.id)}>Delete</button>
                        {/* Add to Cart button */}
                        <button onClick={() => handleAddToCart(shoe.id)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            {editingShoe && (
                <div className="edit-form">
                    <h2>Update Shoe</h2>
                    <input
                        type="text"
                        name="prod_name"
                        placeholder="Product Name"
                        value={editForm.prod_name}
                        onChange={handleEditFormChange}
                    />
                    <input
                        type="text"
                        name="prod_description"
                        placeholder="Description"
                        value={editForm.prod_description}
                        onChange={handleEditFormChange}
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={editForm.image}
                        onChange={handleEditFormChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={editForm.price}
                        onChange={handleEditFormChange}
                    />
                    <button onClick={handleSubmitUpdate}>Submit Update</button>
                    <button onClick={() => setEditingShoe(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Shoes;


