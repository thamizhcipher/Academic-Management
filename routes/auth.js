const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");

// const express= require('express');
const authController=require('../controllers/auth')
const adminLoginController=require('../controllers/adminLogin')
const loginController=require('../controllers/login')
const queryController=require('../controllers/query')
const router = express.Router()

router.post('/register',authController.register)
router.post('/login',loginController.login )
router.post('/adminLogin',adminLoginController.adminLogin )
router.post('/query',queryController.query )
router.get('/getAllQueries',queryController.getAllQueries )
router.post('/deleteQuery',queryController.deleteQuery )


module.exports=router;