const express  = require('express');
var session = require('express-session');
const bodyParser = require('body-parser');
const mongodbConfig = require("./configs/mongodb");

const app = express();


//import route
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');
const courseRoutes = require('./routes/course');

//middleware
app.set('view engine', 'pug');
app.set('views', 'views');

//mongoDB connection
mongodbConfig.connect(()=>{
    console.log("connected to mongo db in express");
})

//bodyparser
app.use(bodyParser.urlencoded());

//session management
app.use(session({secret:'XASDASDA'}));

//using routes
app.use('/user',userRoutes);
app.use('/course',courseRoutes);

// app.use('/', (req, res)=>{
// res.send("<h1>Hello from express Nikhil.</h1>");
// });

app.use('/', (req, res,next)=>{
   // res.status(404).send('<h1>Page not found !!</h1>');
   res.render('login-user', {validationerror:""});
    });



app.listen(3300);
console.log("Server is listening at port 3300...");