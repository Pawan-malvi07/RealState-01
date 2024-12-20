const express = require('express');
const router = express.Router();
const user = require('../controller/Admin'); 


router.post('/create', user.create);
router.get('/', user.getAllOrder); 

module.exports = router;
