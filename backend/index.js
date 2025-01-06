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
app.use(cors());

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

app.post("/shoes", (req, res) => {
    const q = "INSERT INTO shoes (prod_name, prod_description, image, price) VALUES (?)";
    const values = [req.body.prod_name, req.body.prod_description, req.body.image, req.body.price];

    db.query(q, [values], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json("Successfully added a new shoe.");
    });
});
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const q = "INSERT INTO users (name, email, password, address, phoneNumber, role) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [name, email, hashedPassword, address || "", phoneNumber || "", role || "user"];

    db.query(q, values, (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: "User registered successfully" });
    });
});

// Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], async (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length > 0) {
            const user = data[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return res.status(200).json({ message: "Login successful!", user });
            }
        }
        return res.status(401).json({ message: "Invalid email or password" });
    });
});

app.listen(8800, () => {
    console.log("Connected to backend");
});