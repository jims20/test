
const db = require('../db/connection');

const addToCart = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        const { userId, productId, quantity } = JSON.parse(body);

        const query = `
            INSERT INTO carts (user_id, product_id, quantity)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE quantity = quantity + ?;
        `;

        db.query(query, [userId, productId, quantity, quantity], (err) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Error adding to cart' }));
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Item added to cart' }));
        });
    });
};

module.exports = { addToCart }; // Only export once
