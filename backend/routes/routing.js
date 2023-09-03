const express = require('express')
const router = express.Router();
const  logic=require('../controllers/logic')

router.post("/checkout",logic.checkout)
// STEP 3: Callback URL
router.post("/subscription-portal",logic.customer)

/* router.post("/customer-token",logic.customerl) */


module.exports = router
