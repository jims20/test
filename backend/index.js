import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "james",
    database: "marketplacee",
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Test route
app.get("/", (req, res) => {
    res.json("Hello, this is the backend");
});

// Fetch all shoes
app.get("/shoes", (req, res) => {
    const q = "SELECT * FROM shoes";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Add a shoe
app.post("/shoes", (req, res) => {
    const q = "INSERT INTO shoes (prod_name, prod_description, image, price) VALUES (?)";
    const values = [req.body.prod_name, req.body.prod_description, req.body.image, req.body.price];

    db.query(q, [values], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json("Successfully added a new shoe.");
    });
});

// Update a shoe
app.put("/shoes/:id", (req, res) => {
    const shoeID = req.params.id;
    const q =
        "UPDATE shoes SET prod_name = ?, prod_description = ?, image = ?, price = ? WHERE id = ?";
    const values = [req.body.prod_name, req.body.prod_description, req.body.image, req.body.price];

    db.query(q, [...values, shoeID], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json("Shoe updated successfully.");
    });
});

// Delete a shoe
app.delete("/shoes/:id", (req, res) => {
    const shoeID = req.params.id;
    const q = "DELETE FROM shoes WHERE id = ?";

    db.query(q, [shoeID], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json("Shoe deleted successfully.");
    });
});

// Register route
app.post("/register", async (req, res) => {
    const { name, email, password, address, phoneNumber, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const q =
            "INSERT INTO users (name, email, password, address, phoneNumber, role) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [
            name,
            email,
            hashedPassword,
            address || "",
            phoneNumber || "",
            role || "user",
        ];

        db.query(q, values, (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ message: "Email already exists" });
                }
                return res.status(500).json({ message: "Database error", error: err });
            }
            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// Updated Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], async (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length > 0) {
            const user = data[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const { role } = user;
                return res.status(200).json({ message: "Login successful!", role });
            }
        }
        return res.status(401).json({ message: "Invalid email or password" });
    });
});


// Cart routes
app.get("/cart", (req, res) => {
    const q = "SELECT cart.*, shoes.prod_name, shoes.image, shoes.price FROM cart JOIN shoes ON cart.shoe_id = shoes.id";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/cart", (req, res) => {
    const { shoe_id, quantity } = req.body;
    const q = "INSERT INTO cart (shoe_id, quantity) VALUES (?, ?)";
    const values = [shoe_id, quantity];

    db.query(q, values, (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json("Item added to cart.");
    });
});

app.delete("/cart/:id", (req, res) => {
    const cartID = req.params.id;
    const q = "DELETE FROM cart WHERE id = ?";

    db.query(q, [cartID], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json("Item removed from cart.");
    });
});

app.listen(8800, () => {
    console.log("Connected to backend");
});

// Fetch products by category (optional)
app.get("/products", (req, res) => {
    const category = req.query.category;
    const q = category ? "SELECT * FROM shoes WHERE category = ?" : "SELECT * FROM shoes";
    db.query(q, [category], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Add a product with category
app.post("/products", (req, res) => {
    const q = "INSERT INTO shoes (prod_name, prod_description, image, price, category) VALUES (?)";
    const values = [
        req.body.prod_name,
        req.body.prod_description,
        req.body.image,
        req.body.price,
        req.body.category,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json("Successfully added a new product.");
    });
});
