const express= require('express');
const app=express()
const query=require('../controllers/query.js')
const router = express.Router()

router.get('/',(req,res)=>
{
    res.render('index');
})
router.get('/register',(req,res)=>
{
    res.render('register');
})
router.get('/adminIndex',(req,res)=>
{
    res.render('adminIndex');
})
router.get('/admin',(req,res)=>
{
    res.render('admin');
})

router.get('/test',(req,res)=>
{
    console.log("running test");
})


module.exports=router;