const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");

const app = express()
// Create a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PD,
    database:process.env.DATABASE
    });


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cookieParser());



// Handle user login requests
exports.login=(req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Query the database for the user with the given email address
  db.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fields) => {
    if (error) throw error;

    // If no user is found with the given email, send an error response
    if (results.length === 0) {
      res.status(401).send('Invalid email or password');
      req.body={};
      return;
    }

    // If a user is found, compare the hashed password with the provided password
    const user = results[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      
      // If the passwords match, create a session and send a success response
      if (result === true) {
        res.render('user',{Name:user.name});
      } else {
        // If the passwords don't match, send an error response
        req.body={}
        res.status(401).send('Incorrect Login credentials');
        
      }
    });
  });
};
