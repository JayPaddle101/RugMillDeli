const {Router} = require('express');
const foodController = require('../controllers/foodController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();


router.get('/breakfast', requireAuth, foodController.breakfast_get);


module.exports = router;