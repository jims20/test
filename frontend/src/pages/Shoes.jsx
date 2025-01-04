import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Shoes = () => {
  const [shoes, setShoes] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchAllShoes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/shoes");
        setShoes(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to load shoes.");
      }
    };
    fetchAllShoes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/shoes/" + id);
      setShoes(shoes.filter(shoe => shoe.id !== id));
      setSuccess(true);
    } catch (err) {
      setError("Failed to delete the shoe.");
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Marketplace</h1>
      <div className="shoes">
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Item deleted successfully!</p>}
        {shoes.map((shoe) => (
          <div className="shoe" key={shoe.id}>
            {shoe.image && <img src={shoe.image} alt={shoe.prod_name} />}
            <h2>{shoe.prod_name}</h2>
            <p>{shoe.prod_description}</p>
            <span>{shoe.price}</span>
            <button className="delete" onClick={() => handleDelete(shoe.id)}>Delete</button>
            <Link to={`/update/${shoe.id}`} className="update">
              <button>Update</button>
            </Link>
          </div>
        ))}
      </div>

      <Link to="/add" className="add-new">
        <button>Add new item</button>
      </Link>
    </div>
  );
};

export default Shoes;