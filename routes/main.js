const express = require('express');
const router = express.Router();
const mainController = require("../controllers/mainController");

// router.get('/',(req,res)=>{
//     res.send('This is from main route.');
// });

router.get('/',mainController.getMainPage);

module.exports = router;