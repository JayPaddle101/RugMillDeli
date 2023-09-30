const {Router} = require('express');
const userfoodController = require('../controllers/userfoodController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.post('/sandwichIng_val', requireAuth, userfoodController.valIngSandwich);
router.post('/updateQuantity', requireAuth, userfoodController.updateQuantity);
router.delete('/deleteUserSandwich', requireAuth, userfoodController.deleteSandwich);




module.exports = router;