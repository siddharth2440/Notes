require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 5004;
const layouts=require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const note = require('./server/models/NotesSchema')
const override = require('method-override')
//bodyParser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//cors
app.use(cors('*'));

//method override
app.use(override('_method'));

//session
const sessionSecret = process.env.sessionSECRET;
app.use(session({
    secret:sessionSecret,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:true},    
    cookie:{maxAge:3600000}
}));

//passportSession
app.use(passport.initialize());
app.use(passport.session());

// static files
app.use(express.static('public'));

//templating engine
app.use(layouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

//dataBase connection
const config = require('./server/config/dataBaseConfig');
config();

//routes
const mainRoute = require('./server/routes/index');
const authRoute = require('./server/routes/auth');
const dashboard = require('./server/routes/dashboard');
app.use('/',mainRoute);
app.use('/',authRoute);
app.use('/',dashboard);

//Error Page
app.get('*',(req,res)=>{
    res.json({message:"Page not Found"});
})
    
// listen
app.listen(PORT,()=>console.log(`Server is listening in the PORT : ${PORT}`));
