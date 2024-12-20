const express = require('express');
const router = express.Router();
const user = require('../controller/usercontroller.js'); 


router.post('/Login', user.Login);
router.post('/register', user.regi);

module.exports = router; 
 