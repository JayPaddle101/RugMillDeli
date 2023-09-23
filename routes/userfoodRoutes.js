const {Router} = require('express');
const userfoodController = require('../controllers/userfoodController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.post('/sandwichIng_val', requireAuth, userfoodController.valIngSandwich);



module.exports = router;