const cartController = require('../controllers/cartController');

const cartRoutes = (req, res) => {
    if (req.method === 'POST') {
        return cartController.addToCart(req, res);
    }
};

module.exports = cartRoutes;