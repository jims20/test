import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom'; 
import axios from 'axios';

const Update = () => {
    const [shoe, setShoe] = useState({
        prod_name: "",
        prod_description: "",
        price: null,
        image: "",
    });

    const navigate = useNavigate();
    const location = useLocation();
    const shoeId = location.pathname.split("/")[2];

    useEffect(() => {
        // Fetch the current shoe details on page load
        axios.get(`http://localhost:8800/shoes/${shoeId}`)
            .then(response => {
                setShoe({
                    prod_name: response.data.prod_name,
                    prod_description: response.data.prod_description,
                    price: response.data.price,
                    image: response.data.image,
                });
            })
            .catch(err => console.error("Error fetching shoe:", err));
    }, [shoeId]);

    const handleChange = (e) => {
        setShoe((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/shoes/${shoeId}`, shoe);
            navigate("/shoes");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="form">
            <h1>Update Item</h1>
            <input 
                type="text"
                placeholder="Product Name"
                name="prod_name"
                value={shoe.prod_name}
                onChange={handleChange}
            />
            <input 
                type="text"
                placeholder="Description"
                name="prod_description"
                value={shoe.prod_description}
                onChange={handleChange}
            />
            <input 
                type="number"
                placeholder="Price"
                name="price"
                value={shoe.price}
                onChange={handleChange}
            />
            <input 
                type="text"
                placeholder="Image URL"
                name="image"
                value={shoe.image}
                onChange={handleChange}
            />
            <button onClick={handleClick}>Update</button>
        </div>
    );
};

export default Update;
