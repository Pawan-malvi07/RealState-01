const express = require('express');
const router = express.Router();
const user = require('../controller/PropertyController.js');
const multer = require('multer');
const path = require('path'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  const upload = multer({ storage });
  


router.post('/', upload.single('image'),user.create);
router.delete('/:id', user.delet); 
router.get('/',user.all);
router.get('/:id',user.id);
router.put('/:id',user.update);

module.exports = router; 
