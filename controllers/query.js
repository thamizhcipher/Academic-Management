const express =require('express')
const bodyParser = require('body-parser')
const mysql=require('mysql')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const router = express.Router();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PD,
    database:process.env.DATABASE
    });

const app=express();
bodyParser.json()
bodyParser.urlencoded({ extended: false })
exports.query=(req,res)=>
{
   const msg= req.body.message;
   const id= req.body.id;
   db.query('select request from users where id=? ',[id],(error,result)=>
   {
    if(error)
        throw error
    if(result[0].request!=null)
    {
        res.status(401).send('You have already Submitted a query,so please wait for it to be solved !!');
        req.body={}
    }
    else
    {
        db.query('UPDATE users SET request=? where id=? ',[msg,id],(error,result)=>
   {
    if(error)
        throw error
    else
    {
        return res.render('index')
    }

   })
    }
   })


}

exports.getAllQueries=(req,res)=>{
    const query = `SELECT id "ID", request "Queries" FROM users `;
    console.log('query executing');
    db.query(query, (err, result) => {
        if (err) throw err;
        users=result
        console.log(users[0]);
        if(result.length>0)
        {
            console.log(result);
            res.send({result:result})
        }
    });
}

exports.deleteQuery=(req,res)=>{
    const idDel=req.body.idDel;
    const query = 'DELETE from users WHERE ID=? ';
    db.query(query,[idDel],(err, result) => {
        if (err) throw err;
        else
        {
            res.render('admin')
        }
    });
}

