const http = require('http');
const db = require('./db/connection');
const cartRoutes = require('./routes/cart');

app.use('/cart', cartRoutes)
const server = http.createServer((req, res) => {
    if (req.url.startsWith('/api/cart')) {
        return cartRoutes(req, res); // Delegate to cart routes
    }
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
});

// Start server
server.listen(3000, () => {
    console.log('Backend server is running on port 3000');
});