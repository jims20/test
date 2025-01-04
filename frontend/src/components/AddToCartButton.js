import React from 'react';

const AddToCartButton = ({ userId, productId, quantity = 1 }) => {
    const handleAddToCart = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, productId, quantity }),
            });

            const data = await res.json();
            if (res.ok) {
                alert('Item successfully added to cart!');
            } else {
                alert(data.message || 'Failed to add item to cart');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return <button onClick={handleAddToCart}>Add to Cart</button>;
};

export default AddToCartButton;
