const {Router} = require('express');
const cartController = require('../controllers/cartController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.post('/addToCart', requireAuth, cartController.addToCart);
router.post('/processPayment', requireAuth, cartController.processPayment);
router.get('/getCart/:cartID', requireAuth, cartController.getCart);
router.get('/confirmedPayment/:cartID', requireAuth, cartController.confirmedPayment);
router.get('/toCart', requireAuth, cartController.toCart);




module.exports = router;