const express = require('express');
const mongoose = require('mongoose');
const cors =  require('cors');
const passport = require('passport');
const passportLocal = require('passport-local');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
var request = require('request');
const Cars = require('./data')
//import Cars from './data.js';
const User = require('./user');


const app = express();
mongoose.connect(
    "mongodb+srv://itachi1720:Aayush@123@cluster0.zdsmc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
       useNewUrlParser:true,
       useUnifiedTopology:true 
    }, ()=>{
        console.log("mongoose is connected");
    }
)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors({
    origin: "http://localhost:3000", // location of my clinet app
    credentials:true
}))

app.use(session({
    secret : "MySecretCode",
    resave : true,
    saveUninitialized : true
}));


app.use(cookieParser("MySecretCode"))

app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// Routes
app.post("/login" , (req,res) => {
    console.log(req.body);
})
app.post("/register" , (req,res) => {
    console.log(req.body);
    User.findOne({ 
        username : req.body.username,
        password : req.body.password
    }, async (err,doc) =>{
        if(err)
        throw err;
        if(doc)res.send("user already exists");
        else{
            const hasedPassword = await bcrypt.hash(req.body.password,10)
            const newUser = new User({
                username : req.body.username,
                password : hasedPassword,
            });
            await newUser.save();
            res.send("user created");
        }

    }
    )
})
app.get("/user" , (req,res) => {

})

app.listen(3010, () => {
    console.log("server runing on port 3010");
});

app.get("/getSite", (req,res) =>{
    res.send(Cars);
} )