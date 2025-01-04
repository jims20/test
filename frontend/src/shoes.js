import React, { useState, useEffect } from "react";

function Shoes() {
  const [shoes, setShoes] = useState([]);

  // Fetch the list of shoes
  useEffect(() => {
    fetch("http://localhost:5000/shoes") // Adjust the endpoint to your backend API
      .then((response) => response.json())
      .then((data) => setShoes(data))
      .catch((error) => console.error("Error fetching shoes:", error));
  }, []);

  // Add to cart function
  const addToCart = (productId) => {
    const userId = 1; // Replace with dynamic user ID if needed
    const quantity = 1; // You can make this dynamic (e.g., from user input)

    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
        quantity,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Added to cart successfully!");
        } else {
          alert("Failed to add to cart.");
        }
      })
      .catch((error) => console.error("Error adding to cart:", error));
  };

  return (
    <div>
      <h1>Shoes</h1>
      <div className="shoes-container">
        {shoes.map((shoe) => (
          <div key={shoe.id} className="shoe-item">
            <h2>{shoe.name}</h2>
            <p>{shoe.price}</p>
            <button onClick={() => addToCart(shoe.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shoes;
