const mysql=require('mysql')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PD,
    database:process.env.DATABASE
    });
// var message=document.getElementById('message');


exports.register=(req,res)=>
{
    // console.log(req.body);
    const {name,id,email,password,passwordConfirm}=req.body;
    db.query('SELECT email FROM users WHERE email=? ',[email],async(error,results)=>
    {
        
        if(error)
            console.log(error);
        if(results.length>0)
        {
            res.status(401).send('Email already in use');
            req.body={}
        }
        else if (password!==passwordConfirm)
        {
            
            res.status(401).send('Passwords do not match');
            req.body={}
        }
        
        let hashedPassword = await bcrypt.hash(password,8);
              
        
        db.query('INSERT into users SET ?',{name:name,email:email,password:hashedPassword,id:id},(error,results)=>
        {
            if(error)
            {
                console.log(error);
            }
            else
            {
                res.render('admin')
            }
        })

    })
    
    
    
}