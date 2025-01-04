import React from 'react';
import AddToCartButton from '../components/AddToCartButton';

const ProductPage = () => {
    const userId = 1; // Replace with logged-in user's ID
    const productId = 101; // Replace with product's ID

    return (
        <div>
            <h1>Product Name</h1>
            <p>Product Description</p>
            <AddToCartButton userId={userId} productId={productId} />
        </div>
    );
};

export default ProductPage;
