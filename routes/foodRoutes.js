const {Router} = require('express');
const foodController = require('../controllers/foodController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/sandwich-val/:sandwichId', requireAuth, foodController.valSandwich);

router.get('/breakfast', requireAuth, foodController.breakfast_get);


module.exports = router;