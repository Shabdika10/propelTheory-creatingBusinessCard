const express = require('express');
const router = express.Router();


const businessCardController = require('../controller/businessCardController.js');


router.post('/createBusinessCard', businessCardController.createBusinessCard);

router.get('/getBusinessCard/:cardId', businessCardController.getBusinessCardById);


module.exports = router;
