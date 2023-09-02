const express = require('express')
const router = express.Router();
const  logic=require('../controllers/logic')

router.post("/checkout",logic.checkout)
// STEP 3: Callback URL
router.post("/subscription-portal",logic.portal)

router.post("/customer-token",logic.l)


module.exports = router
