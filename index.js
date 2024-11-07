const express=require('express')
const mysql = require('mysql')
const dotenv = require('dotenv')
const  path  = require('path')
const exp = require('constants')
 

dotenv.config({ path: './.env' })
   
const publicDir=path.join(__dirname,'public')
const app=express()
    
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.static(publicDir))

app.use(express.urlencoded({extended:false}))
app.use(express.json());
const db = mysql.createConnection({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PD,
    database:process.env.DATABASE
    }); 
  
db.connect((err)=> 
{
    if(err)  
        console.log(err); 
    else
        console.log("My sql running successfully");
})
     
// Define routes 

app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

app.listen('3000',(req,res)=>
{
    console.log("port runnning successfully at 3000");
})
