const {Router} = require('express');
const foodController = require('../controllers/foodController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/sandwich-val/:sandwichId', requireAuth, foodController.valSandwich);

router.get('/customizations/:sandwichId', requireAuth, foodController.customize_get);

router.get('/breakfast', requireAuth, foodController.breakfast_get);
router.get('/hamburger', requireAuth, foodController.hamburger_get);
router.get('/chicken', requireAuth, foodController.chicken_get);
router.get('/hotsub', requireAuth, foodController.hotsub_get);
router.get('/salad&wrap', requireAuth, foodController.salad_wrap_get);
router.get('/coldsub', requireAuth, foodController.coldsub_get);







module.exports = router;